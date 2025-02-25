import React , {useState} from "react";
import "./index.css"; 
import axios from "axios";

import { CiUser } from "react-icons/ci";
import { Link } from "react-router-dom";

const SignUp = () => {


  const [credentials, setCredentials] = useState({
    email:"",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://buyinteriorapp-d0adf77e7c33.herokuapp.com/api/signup/",
        credentials,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response.data);
      console.log('sucess user')
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="container">
      <div className="left-side">
        <img src="/Images/sigin.jpg" alt="Background" />
      </div>

      <div className="right-side">
        <div className='right-side-sub'>
          <h1>Byinteriors</h1>
          <div className='header-signIn'>
            <h2>Sign Up!</h2>
            <p>Join Us today</p>
          </div>
          <form className="login-form" onSubmit={handleSubmit}>
            <div>
              <label>Enter Email:</label>
              <input
                type="text"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Enter Username:</label>
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Enter Password:</label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Renter Password:</label>
              <input
                type="password"
                // name="password"
                // value={credentials.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-btn">
              <button type='submit'>Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
