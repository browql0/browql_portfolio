// src/components/Contact.jsx
import React, { useState } from "react";
import '../css/Contact.css';

import { FaUser, FaEnvelope, FaCommentDots } from "react-icons/fa";


function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      console.log("Message envoyé :", formData);
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } else {
      setStatus("error");
    }
  };

  return (
    <section className="contact-container">
      <h2 className="contact-title">Contact Me</h2>
      <p className="contact-subtitle">
        Have a question ? Fill out the form below!
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <FaUser className="icon" />
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <FaEnvelope className="icon" />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <FaCommentDots className="icon" />
           <input
            type="large"
            name="message"
            placeholder="Your message"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Send Message</button>
      </form>

      {status === "success" && <p className="form-message success">✅ Message sent successfully!</p>}
      {status === "error" && <p className="form-message error">❌ Please fill in all fields.</p>}
    </section>
  );
}

export default Contact;
