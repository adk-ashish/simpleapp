import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateEmployee = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    position: "",
    salary: "",
  });

  const [employeeList, setEmployeeList] = useState([]);

  // Fetch employees from the backend when the component loads
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/employees");
        setEmployeeList(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
        alert("Failed to load employees. Please try again.");
      }
    };

    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send employee data to the backend
      const response = await axios.post("http://localhost:3001/api/employees", employee);
      // Update local state with the new employee
      setEmployeeList([...employeeList, response.data]);

      // Clear the form
      setEmployee({
        name: "",
        email: "",
        position: "",
        salary: "",
      });

      alert("Employee added successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to add employee. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken"); 
    navigate("/login"); 
  };

  return (
    <div className="d-flex bg-dark text-light min-vh-100">
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="flex-grow-1 text-center">
            <h2>Create Employee</h2>
          </div>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div className="d-flex flex-column align-items-center justify-content-center">
          {/* Employee Form */}
          <form
            onSubmit={handleSubmit}
            className="mb-4 p-4 rounded shadow"
            style={{ width: "100%", maxWidth: "500px", backgroundColor: "#343a40" }}
          >
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control bg-dark text-light"
                id="name"
                name="name"
                value={employee.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control bg-dark text-light"
                id="email"
                name="email"
                value={employee.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="position" className="form-label">
                Position
              </label>
              <input
                type="text"
                className="form-control bg-dark text-light"
                id="position"
                name="position"
                value={employee.position}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="salary" className="form-label">
                Salary
              </label>
              <input
                type="text"
                className="form-control bg-dark text-light"
                id="salary"
                name="salary"
                value={employee.salary}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Add Employee
            </button>
          </form>

          {/* Employee Table */}
          <h3 className="mb-3">Employee List</h3>
          <table className="table table-bordered table-dark">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Position</th>
                <th>Salary</th>
              </tr>
            </thead>
            <tbody>
              {employeeList.length > 0 ? (
                employeeList.map((emp, index) => (
                  <tr key={index}>
                    <td>{emp.name}</td>
                    <td>{emp.email}</td>
                    <td>{emp.position}</td>
                    <td>{emp.salary}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No employees added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreateEmployee;
