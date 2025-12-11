# Portfolio Admin Dashboard & Backend Setup

## Quick Start Guide

### 1. Backend Setup
```bash
cd server
npm install
npm run setup-admin
npm run dev
```

### 2. Frontend Setup
```bash
cd dashboard
npm install
npm run dev
```

### 3. Access Admin Dashboard
- Backend: http://localhost:5000
- Dashboard: http://localhost:3000
- Admin Login: Username: admin, Password: admin123

## Features Implemented

### ✅ Authentication System
- 30-minute session expiry
- JWT token-based authentication
- Password change functionality
- Auto-logout on session expiry

### ✅ Admin Dashboard
- Protected routes with authentication
- Real-time session management
- Password management for admin users
- Secure API endpoints

### ✅ Portfolio Integration
- Connected admin dashboard with portfolio
- Seamless navigation between portfolio and admin
- Responsive design for all devices

## Usage Instructions

### Admin Login
1. Navigate to `/login`
2. Use credentials: admin / admin123
3. Session expires after 30 minutes

### Password Management
1. Go to Admin Settings
2. Change password as needed
3. Logout when done

### Dashboard Navigation
- Dashboard: Overview of all data
- Messages: Manage portfolio messages
- Commandes: Handle orders
- Offres: Manage offers
- Settings: Admin configuration

## Security Features
- Password hashing with bcrypt
- JWT token authentication
- Session management
- Input validation
- Rate limiting (recommended for production)

## Production Deployment
1. Set environment variables
2. Use HTTPS
3. Configure rate limiting
4. Set up monitoring
5. Regular security updates
