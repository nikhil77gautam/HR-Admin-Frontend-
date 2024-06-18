import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./HR-Dashboard.css";

export default function HRDashboard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        throw new Error("No authentication token found. Please log in.");
      }

      const response = await axios.get(
        "https://hr-admin-backend-gi2w.onrender.com/pending",
        {
          headers: { Authorization: `${token}` },
        }
      );

      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess("");
    await addUser();
  };

  const addUser = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        throw new Error("No authentication token found. Please log in.");
      }

      const response = await axios.post(
        "https://hr-admin-backend-gi2w.onrender.com/adduser",
        { name, email, role, experience },
        { headers: { Authorization: `${token}` } }
      );

      console.log("User added successfully:", response.data);
      alert("User added successfully");
      setName("");
      setEmail("");
      setRole("");
      setExperience("");
      await fetchUsers();
    } catch (error) {
      console.error("Error adding user:", error);
      setError(error.message || "Failed to add user");
      setSuccess("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <div className="hr-dashboard">
      <header className="dashboard-header">
        <h2>HR- Dashboard</h2>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Name:</label>
          <input
            type="text"
            value={name}
            placeholder="Enter Your Name"
            onChange={(e) => setName(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Email:</label>
          <input
            type="email"
            value={email}
            placeholder="Enter Your Email"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Role:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="form-select"
          >
            <option value="" disabled>
              Select Technology
            </option>
            <option value="HTML">HTML</option>
            <option value="CSS">CSS</option>
            <option value="JavaScript">JavaScript</option>
            <option value="React">React.js</option>
            <option value="Node.js">Node.js</option>
            <option value="MongoDB">MongoDB</option>
            <option value="MERN/MEAN Developer">MERN/MEAN Developer</option>
            <option value="Python">Python</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Experience:</label>
          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            required
            className="form-select"
          >
            <option value="" disabled>
              Select Experience
            </option>
            <option value="Fresher">Fresher</option>
            <option value="Experienced">Experienced</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Add User
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <h3 className="mt-4">Existing Users</h3>
      <div className="table-responsive mt-3">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Experience</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.experience}</td>
                <td>{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
