import React, { useState } from "react";
import axios from "axios";
import "./Signin.css";
import { Link, useNavigate } from "react-router-dom";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { email, password };
    try {
      const response = await axios.post(
        "https://hr-admin-backend-gi2w.onrender.com/auth/signin",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);

      const { token, role } = response.data;

      // Store token in local storage
      localStorage.setItem("authToken", token);

      console.log(role);

      if (role === "HR") {
        navigate("/hr-dashboard");
      } else if (role === "Admin") {
        navigate("/admin-dashboard");
      } else {
        // default dashboard navigation
        navigate("/default-dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="main-container-signin">
      <div className="container-2">
        <div className="header-2">
          <div className="text-2" style={{ fontFamily: "Serif" }}>
            Now Login Here!
          </div>
          <br />
          <div className="underline-2"></div>
        </div>
        <div>
          <input
            style={{ fontFamily: "Serif" }}
            onChange={(e) => setEmail(e.currentTarget.value)}
            placeholder="Enter Email"
            type="email"
            value={email}
          />
          <br />
          <input
            style={{ fontFamily: "Serif" }}
            onChange={(e) => setPassword(e.currentTarget.value)}
            placeholder="Enter Password"
            type="password"
            value={password}
          />
        </div>
        <br />
        <div>
          <button onClick={handleSubmit} style={{ fontFamily: "Serif" }}>
            Login
          </button>
        </div>
        <br />
        <div>
          <Link to="/signup">
            <b style={{ fontFamily: "Serif", color: "blue" }}>
              Don't have an account? Signup
            </b>
          </Link>
        </div>
      </div>
    </div>
  );
}
