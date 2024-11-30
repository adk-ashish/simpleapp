import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const CreateEmployee = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    salary: '',
  });

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
      const response = await axios.post('http://localhost:3001/api/employees', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming JWT stored in localStorage
        },
      });
      alert('Employee created successfully!');
      console.log(response.data);
    } catch (err) {
      console.error(err);
      alert('Error creating employee!');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-light">
      <form onSubmit={handleSubmit} className="p-4 bg-secondary rounded shadow" style={{ width: '300px' }}>
        <h3 className="text-center mb-3">Create Employee</h3>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" id="name" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" id="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="position" className="form-label">Position</label>
          <input type="text" id="position" name="position" className="form-control" value={formData.position} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="salary" className="form-label">Salary</label>
          <input type="number" id="salary" name="salary" className="form-control" value={formData.salary} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary w-100">Create Employee</button>
      </form>
    </div>
  );
};

export default CreateEmployee;
