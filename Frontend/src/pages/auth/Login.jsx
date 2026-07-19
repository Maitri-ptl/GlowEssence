import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="ge-auth-page">
      <div className="ge-auth-visual">
        <div className="ge-auth-visual-content">
          <span className="ge-eyebrow">Welcome Back</span>
          <h2>Your glow routine missed you.</h2>
          <p>
            Sign in to track orders, save your favorite products, and get
            early access to new beauty drops.
          </p>
        </div>
      </div>

      <div className="ge-auth-form-side">
        <div className="ge-auth-card">
          <h1 className="ge-auth-title">Sign In</h1>
          <p className="ge-auth-subtitle">
            Enter your details to access your GlowEssence account.
          </p>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="ge-form-group">
              <label className="ge-label" htmlFor="login-email">
                Email Address
              </label>
              <input
                id="login-email"
                type="email"
                className="ge-form-control"
                placeholder="you@example.com"
              />
            </div>

            <div className="ge-form-group">
              <label className="ge-label" htmlFor="login-password">
                Password
              </label>
              <div className="ge-password-field">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  className="ge-form-control"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="ge-password-toggle"
                  aria-label="Toggle password visibility"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                </button>
              </div>
            </div>

            <div className="ge-form-row-between">
              <label className="ge-checkbox-label">
                <input type="checkbox" />
                Remember me
              </label>
              <Link to="/forgot-password" className="ge-link-gold">
                Forgot password?
              </Link>
            </div>

            <div className="ge-auth-submit">
              <button type="submit" className="ge-btn-gold" style={{ width: "100%" }}>
                Sign In
              </button>
            </div>
          </form>

          <p className="ge-auth-footer-text">
            Don't have an account?{" "}
            <Link to="/register" className="ge-link-gold">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
