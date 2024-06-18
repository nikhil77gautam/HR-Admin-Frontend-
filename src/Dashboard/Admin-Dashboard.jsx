import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin-Dashboard.css";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [approveUsers, setApproveUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("authToken");
      console.log(token);

      try {
        const response = await fetch("https://hr-admin-backend-gi2w.onrender.com/pendingusers", {
          headers: {
            Authorization: `${token}`,
          },
        });
        const data = await response.json();
        console.log("Pending users response data:", data);
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          setUsers([]);
        }
        setError(null);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users. Please try again.");
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchApproveUsers = async () => {
      const token = localStorage.getItem("authToken");

      try {
        const response = await fetch("https://hr-admin-backend-gi2w.onrender.com/approveusers", {
          headers: {
            Authorization: `${token}`,
          },
        });
        const data = await response.json();
        console.log("Approved users response data:", data);
        if (Array.isArray(data)) {
          setApproveUsers(data);
        } else {
          setApproveUsers([]);
        }
        setError(null);
      } catch (error) {
        console.error("Error fetching approved users:", error);
        setError("Failed to fetch approved users. Please try again.");
      }
    };

    fetchApproveUsers();
  }, []);

  const handleApproveUser = async (userId) => {
    const token = localStorage.getItem("authToken");
    try {
      await fetch(`https://hr-admin-backend-gi2w.onrender.com/approve/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `${token}`,
        },
      });
      alert("Are You Sure ?");
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error approving user:", error);
      setError("Failed to approve user. Please try again.");
    }
  };

  const handleRejectUser = async (userId) => {
    const token = localStorage.getItem("authToken");

    try {
      await fetch(`https://hr-admin-backend-gi2w.onrender.com/reject/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `${token}`,
        },
      });
      alert("Are You Sure ?");
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error rejecting user:", error);
      setError("Failed to reject user. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h2>Admin- Dashboard</h2>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>
      {error && <p className="error-message">{error}</p>}
      <h3>Pending Users</h3>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Experience</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.experience}</td>
              <td>{user.status}</td>
              <td>
                <button
                  className="approve-button"
                  onClick={() => handleApproveUser(user._id)}
                >
                  Approve
                </button>
                <button
                  className="reject-button"
                  onClick={() => handleRejectUser(user._id)}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
