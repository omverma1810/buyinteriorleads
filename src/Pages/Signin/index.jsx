import React, { useState } from "react";
import "./index.css";
import axios from "axios";

import { CiUser } from "react-icons/ci";
import { Link, useNavigate , useLocation } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const from = location.state?.from || "/Profile";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://buyinteriorapp-d0adf77e7c33.herokuapp.com/api/signin/",
        credentials,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Check if the response is successful
      if (response.status === 200) {
        const { access, refresh , user_id } = response.data;
        localStorage.setItem("userId", user_id);
        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);

        console.log("Response:", response.data);
        console.log("Login success");

        // navigate("/Profile");
        navigate(from, { replace: true }); 
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="container">
      <div className="left-side">
        <img src="/Images/sigin.jpg" alt="Background" />
      </div>

      <div className="right-side">
        <div className="right-side-sub">
          <h1>Buy Interior leads</h1>
          <div className="header-signIn">
            <h2>Welcome Back</h2>
            <p>Access your interior design leads</p>
          </div>
          <form className="login-form" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={credentials.username}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-btn">
              <button type="submit">Sign In</button>
            </div>
          </form>
          <h4>
            Dont have an account?{" "}
            <span>
              <Link
                className="name"
                to="/Signup"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                SignUp
              </Link>
            </span>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Login;
