import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/forgot-password', { email });
      if (response.status === 200) {
        setMessage('Check your email for instructions to reset your password.');
      }
    } catch (error) {
      if (error.response) {
        setMessage('Error sending email. Please try again.');
      } else {
        setMessage('Network error. Please try again later.');
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Forgot Password</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.emailBox}>
          <label style={styles.label}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Send Reset Link</button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
      <button onClick={() => history.push('/Studentlogin')} style={styles.backButton}>
        Back to Login
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '500px',
    margin: '40px auto',
    padding: '20px',
    border: '1px solid #2e6da4',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
  },
  title: {
    textAlign: 'center',
    color: '#2e6da4',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  emailBox: {
    marginBottom: '20px',
  },
  label: {
    fontSize: '23px',
    color: '#2e6da4',
    marginBottom: '5px',
  },
  input: {
    fontSize: '16px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '80%',
    margin: '0 auto',
  },
  button: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    marginBottom: '10px',
  },
  backButton: {
    padding: '10px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    textAlign: 'center',
    display: 'block',
    margin: '0 auto',
  },
  message: {
    textAlign: 'center',
    color: 'green',
    marginTop: '10px',
  },
};

export default ForgotPassword;
