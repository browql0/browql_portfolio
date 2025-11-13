require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();

// ✅ CORS config (autorise React sur localhost:5173)
app.use(
  cors({
    origin: "http://localhost:5173", // ⚠️ change en prod : "https://tonsite.com"
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;
const DEFAULT_SESSION_DURATION = process.env.DEFAULT_SESSION_DURATION || "30m";
const ALLOWED_DURATIONS = ["30m", "1h", "3h"];

// 🔑 Credentials admin (dev/prod)
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || null;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || null; // fallback dev only

// 📁 Blacklist storage
const blacklistPath = path.join(__dirname, "backup", "tokenBlacklist.json");
if (!fs.existsSync(path.dirname(blacklistPath))) {
  fs.mkdirSync(path.dirname(blacklistPath), { recursive: true });
}
if (!fs.existsSync(blacklistPath)) fs.writeFileSync(blacklistPath, JSON.stringify([]));
let tokenBlacklist = JSON.parse(fs.readFileSync(blacklistPath, "utf8"));

function persistBlacklist() {
  fs.writeFileSync(blacklistPath, JSON.stringify(tokenBlacklist, null, 2));
}
function isBlacklisted(token) {
  return tokenBlacklist.includes(token);
}
function addToBlacklist(token) {
  if (!tokenBlacklist.includes(token)) {
    tokenBlacklist.push(token);
    persistBlacklist();
  }
}
// ⏳ Nettoyage auto de la blacklist toutes les heures
setInterval(() => {
  tokenBlacklist = tokenBlacklist.filter((t) => {
    try {
      const d = jwt.decode(t);
      return d && d.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  });
  persistBlacklist();
}, 1000 * 60 * 60);

/* ---------------------------
   Middleware : adminAuth
   --------------------------- */
function adminAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Non autorisé" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token manquant" });

  if (isBlacklisted(token)) return res.status(401).json({ message: "Session invalide (logout)" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token invalide ou expiré" });
    if (decoded.role !== "admin") return res.status(403).json({ message: "Accès refusé" });
    req.admin = decoded;
    next();
  });
}

/* ---------------------------
   Route : login
   --------------------------- */
app.post("/login", (req, res) => {
  const { username, password, duration } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: "username & password requis" });
  if (username !== ADMIN_USERNAME)
    return res.status(401).json({ message: "Identifiants invalides" });

  let valid = false;
  if (ADMIN_PASSWORD_HASH) {
    valid = bcrypt.compareSync(password, ADMIN_PASSWORD_HASH);
  } else if (ADMIN_PASSWORD) {
    valid = password === ADMIN_PASSWORD;
  } else {
    return res
      .status(500)
      .json({ message: "Admin pas configuré (SET ADMIN_PASSWORD_HASH or ADMIN_PASSWORD)" });
  }

  if (!valid) return res.status(401).json({ message: "Identifiants invalides" });

  const sessionDuration = ALLOWED_DURATIONS.includes(duration)
    ? duration
    : DEFAULT_SESSION_DURATION;
  const token = jwt.sign({ role: "admin", username }, JWT_SECRET, {
    expiresIn: sessionDuration,
  });
  const decoded = jwt.decode(token);

  return res.json({
    token,
    expiresAt: decoded.exp * 1000,
    expiresIn: sessionDuration,
  });
});

/* ---------------------------
   Route : me (check token valide)
   --------------------------- */
app.get("/me", adminAuth, (req, res) => {
  res.json({
    username: req.admin.username,
    role: req.admin.role,
    message: "Token valide",
  });
});

/* ---------------------------
   Route : logout
   --------------------------- */
app.post("/logout", adminAuth, (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (token) addToBlacklist(token);
  return res.json({ message: "Déconnecté" });
});

/* ---------------------------
   Exemple route protégée
   --------------------------- */
app.get("/api/orders", adminAuth, (req, res) => {
  const sampleOrders = [
    { id: 1, clientName: "Ali", service: "Portfolio", status: "En cours", date: "2025-09-15", amount: 250 },
    { id: 2, clientName: "Sarah", service: "E-commerce", status: "Terminé", date: "2025-09-10", amount: 450 },
  ];
  res.json(sampleOrders);
});

/* ---------------------------
   Start server
   --------------------------- */
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
