import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import axios from 'axios';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/users/login', formData);
      alert('Login successful!');
      console.log(response.data);
      if (response.data.token) {
       
        localStorage.setItem('token', response.data.token);  // Store the token 
        
        // Redirect to employee list after successful login
        <Route path="/create-employee" element={<CreateEmployee />} /> 
        navigate('/CreateEmployee');  // Redirects to the employee list page
      }

    } catch (err) {
      console.error(err);
      alert('Invalid credentials!');
    }
  };

  const handleRegisterClick = () => {
    navigate('/signup'); // Redirect to the signup page
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-light">
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-secondary rounded shadow"
        style={{ width: '300px' }}
      >
        <h3 className="text-center mb-3">Login</h3>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100 mb-2">
          Login
        </button>
        <button
          type="button"
          className="btn btn-light w-100"
          onClick={handleRegisterClick}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
