import React, { useState } from "react";
// import { auth } from "./firebase";
// import { signInWithEmailAndPassword } from "firebase/auth";

import "./style/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="text-success mb-4">Welcome Back</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control bg-white text-dark"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control bg-white text-dark"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="d-flex justify-content-between mb-3">
            <div>
              <input type="checkbox" /> Remember me
            </div>
            <a href="#" className="text-success">Forgot your password?</a>
          </div>

          <button type="submit" className="btn btn-gradient w-100">LOG IN</button>

          <div className="text-center mt-4">
            <p>Or sign in with</p>
            <div>
              <button type="button" className="btn btn-outline-green mx-1">G</button>
              <button type="button" className="btn btn-outline-green mx-1">F</button>
              <button type="button" className="btn btn-outline-green mx-1">T</button>
            </div>
          </div>
        </form>
      </div>

      <div className="fern-bg">
        <button className="top-sign-in">SIGN IN</button>
      </div>
    </div>
  );
}

export default Login;

