import React from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

const ForgotPassword = () => {
  return (
    <div className="ge-auth-page">
      <div className="ge-auth-visual">
        <div className="ge-auth-visual-content">
          <span className="ge-eyebrow">No Worries</span>
          <h2>It happens to the best of us.</h2>
          <p>
            Enter the email linked to your account and we'll send a link to
            reset your password.
          </p>
        </div>
      </div>

      <div className="ge-auth-form-side">
        <div className="ge-auth-card">
          <Link to="/login" className="ge-back-link">
            <i className="bi bi-arrow-left"></i> Back to Sign In
          </Link>

          <div className="ge-icon-circle">
            <i className="bi bi-key"></i>
          </div>

          <h1 className="ge-auth-title">Forgot Password?</h1>
          <p className="ge-auth-subtitle">
            No problem. Enter your email address below and we'll send you a
            link to reset it.
          </p>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="ge-form-group">
              <label className="ge-label" htmlFor="forgot-email">
                Email Address
              </label>
              <input
                id="forgot-email"
                type="email"
                className="ge-form-control"
                placeholder="you@example.com"
              />
            </div>

            <div className="ge-auth-submit" style={{ marginTop: "1.6rem" }}>
              <button type="submit" className="ge-btn-gold" style={{ width: "100%" }}>
                Send Reset Link
              </button>
            </div>
          </form>

          <p className="ge-auth-footer-text">
            Remembered your password?{" "}
            <Link to="/login" className="ge-link-gold">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
