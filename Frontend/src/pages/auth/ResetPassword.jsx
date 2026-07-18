import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

const getStrength = (password) => {
  if (!password) return 0;
  if (password.length < 6) return 1;
  if (password.length < 10) return 2;
  return 3;
};

const STRENGTH_LABELS = ["", "Weak", "Medium", "Strong"];
const STRENGTH_CLASSES = ["", "active-weak", "active-medium", "active-strong"];

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const strength = getStrength(password);

  return (
    <div className="ge-auth-page">
      <div className="ge-auth-visual">
        <div className="ge-auth-visual-content">
          <span className="ge-eyebrow">Almost There</span>
          <h2>Set a fresh, strong password.</h2>
          <p>
            Choose a new password you haven't used before to keep your
            account secure.
          </p>
        </div>
      </div>

      <div className="ge-auth-form-side">
        <div className="ge-auth-card">
          <div className="ge-icon-circle">
            <i className="bi bi-shield-lock"></i>
          </div>

          <h1 className="ge-auth-title">Reset Password</h1>
          <p className="ge-auth-subtitle">
            Your new password must be different from previously used
            passwords.
          </p>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="ge-form-group">
              <label className="ge-label" htmlFor="reset-password">
                New Password
              </label>
              <div className="ge-password-field">
                <input
                  id="reset-password"
                  type={showPassword ? "text" : "password"}
                  className="ge-form-control"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

              {password && (
                <>
                  <div className="ge-strength-meter">
                    {[1, 2, 3].map((step) => (
                      <div
                        key={step}
                        className={`ge-strength-bar ${
                          step <= strength ? STRENGTH_CLASSES[strength] : ""
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ge-strength-label">
                    Password strength: {STRENGTH_LABELS[strength]}
                  </span>
                </>
              )}
            </div>

            <div className="ge-form-group">
              <label className="ge-label" htmlFor="reset-confirm">
                Confirm New Password
              </label>
              <div className="ge-password-field">
                <input
                  id="reset-confirm"
                  type={showConfirm ? "text" : "password"}
                  className="ge-form-control"
                  placeholder="Re-enter new password"
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

            <div className="ge-auth-submit" style={{ marginTop: "1.6rem" }}>
              <button type="submit" className="ge-btn-gold" style={{ width: "100%" }}>
                Reset Password
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

export default ResetPassword;
