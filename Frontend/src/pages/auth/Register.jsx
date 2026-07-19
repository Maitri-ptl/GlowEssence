import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="ge-auth-page">
      <div className="ge-auth-visual">
        <div className="ge-auth-visual-content">
          <span className="ge-eyebrow">Join GlowEssence</span>
          <h2>Beauty rituals, made for you.</h2>
          <p>
            Create an account to unlock personalized recommendations, faster
            checkout, and member-only rewards.
          </p>
        </div>
      </div>

      <div className="ge-auth-form-side">
        <div className="ge-auth-card">
          <h1 className="ge-auth-title">Create Account</h1>
          <p className="ge-auth-subtitle">
            Sign up in seconds and start your glow journey today.
          </p>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="ge-form-group">
              <label className="ge-label" htmlFor="reg-name">
                Full Name
              </label>
              <input
                id="reg-name"
                type="text"
                className="ge-form-control"
                placeholder="Jane Doe"
              />
            </div>

            <div className="ge-form-group">
              <label className="ge-label" htmlFor="reg-email">
                Email Address
              </label>
              <input
                id="reg-email"
                type="email"
                className="ge-form-control"
                placeholder="you@example.com"
              />
            </div>

            <div className="ge-form-group">
              <label className="ge-label" htmlFor="reg-password">
                Password
              </label>
              <div className="ge-password-field">
                <input
                  id="reg-password"
                  type={showPassword ? "text" : "password"}
                  className="ge-form-control"
                  placeholder="Create a password"
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

            <div className="ge-form-group">
              <label className="ge-label" htmlFor="reg-confirm">
                Confirm Password
              </label>
              <div className="ge-password-field">
                <input
                  id="reg-confirm"
                  type={showConfirm ? "text" : "password"}
                  className="ge-form-control"
                  placeholder="Re-enter your password"
                />
                <button
                  type="button"
                  className="ge-password-toggle"
                  aria-label="Toggle confirm password visibility"
                  onClick={() => setShowConfirm((prev) => !prev)}
                >
                  <i className={`bi ${showConfirm ? "bi-eye-slash" : "bi-eye"}`}></i>
                </button>
              </div>
            </div>

            <div className="ge-form-row-between" style={{ marginBottom: "1.6rem" }}>
              <label className="ge-checkbox-label">
                <input type="checkbox" />
                I agree to the <Link to="/" className="ge-link-gold">Terms</Link> &amp;{" "}
                <Link to="/" className="ge-link-gold">Privacy Policy</Link>
              </label>
            </div>

            <div className="ge-auth-submit">
              <button type="submit" className="ge-btn-gold" style={{ width: "100%" }}>
                Create Account
              </button>
            </div>
          </form>

          <p className="ge-auth-footer-text">
            Already have an account?{" "}
            <Link to="/login" className="ge-link-gold">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
