import React, { useState } from 'react';
import style from './ContactUs.module.css';
import axios from 'axios';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3333/contacts', formData);
      setSuccessMessage('Your message has been sent successfully!');
      setErrorMessage('');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setErrorMessage('There was an error sending your message. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className={style.container}>
      <header className={style.header}>
        <h1>Contact Us</h1>
        <p>We'd love to hear from you. Please fill out the form below to get in touch.</p>
      </header>

      <section className={style.contactForm}>
        <form onSubmit={handleSubmit}>
          <div className={style.formGroup}>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              rows="4"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit" className={style.submitButton}>Send Message</button>
        </form>
        {successMessage && <p className={style.successMessage}>{successMessage}</p>}
        {errorMessage && <p className={style.errorMessage}>{errorMessage}</p>}
      </section>

      <footer className={style.footer}>
        <p>&copy; {new Date().getFullYear()} Online Exam System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default ContactUs;
