import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerWithEmailAndPassword } from '../FirebaseAuth';
import './Register.css'; 

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegisterClick = async () => {
    try {
      await registerWithEmailAndPassword(email, password);
      // Registration successful, redirect to home page 
      navigate('/'); // Redirect to the home page 
    } catch (error) {
      setError(error.message); // Handle registration error
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <div>
        <input
          className="input-field"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input-field"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button" onClick={handleRegisterClick}>
          Register
        </button>
        {error && <p className="error-message">{error}</p>}
      </div>
      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
};

export default Register;
