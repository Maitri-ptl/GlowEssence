import React, { useState } from "react";
import "./Profile.css";

const TABS = [
  { key: "info", label: "Profile Info", icon: "bi-person" },
  { key: "orders", label: "Order History", icon: "bi-bag-check" },
  { key: "addresses", label: "Addresses", icon: "bi-geo-alt" },
  { key: "security", label: "Security", icon: "bi-shield-lock" },
];

const ORDERS = [
  { id: "#GE-10432", date: "July 2, 2026", status: "delivered", total: "$68.00" },
  { id: "#GE-10387", date: "June 18, 2026", status: "shipped", total: "$124.50" },
  { id: "#GE-10312", date: "May 29, 2026", status: "processing", total: "$42.00" },
];

const Profile = () => {
  const [activeTab, setActiveTab] = useState("info");

  return (
    <div className="ge-profile-page">
      <div className="ge-profile-header">
        <h1>My Account</h1>
        <p>Manage your profile, orders, and account settings.</p>
      </div>

      <div className="ge-profile-layout">
        <aside className="ge-profile-sidebar ge-card">
          <div className="ge-profile-avatar">JD</div>
          <h3>Jane Doe</h3>
          <div className="ge-profile-email">jane.doe@example.com</div>

          <ul className="ge-profile-nav">
            {TABS.map((tab) => (
              <li key={tab.key}>
                <button
                  className={activeTab === tab.key ? "active" : ""}
                  onClick={() => setActiveTab(tab.key)}
                >
                  <i className={`bi ${tab.icon}`}></i> {tab.label}
                </button>
              </li>
            ))}
            <li>
              <button className="logout">
                <i className="bi bi-box-arrow-right"></i> Log Out
              </button>
            </li>
          </ul>
        </aside>

        <section className="ge-profile-content ge-card">
          {activeTab === "info" && (
            <>
              <h2>Profile Information</h2>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="ge-profile-grid">
                  <div className="ge-form-group">
                    <label className="ge-label" htmlFor="p-first">First Name</label>
                    <input id="p-first" className="ge-form-control" defaultValue="Jane" />
                  </div>
                  <div className="ge-form-group">
                    <label className="ge-label" htmlFor="p-last">Last Name</label>
                    <input id="p-last" className="ge-form-control" defaultValue="Doe" />
                  </div>
                  <div className="ge-form-group">
                    <label className="ge-label" htmlFor="p-email">Email Address</label>
                    <input
                      id="p-email"
                      type="email"
                      className="ge-form-control"
                      defaultValue="jane.doe@example.com"
                    />
                  </div>
                  <div className="ge-form-group">
                    <label className="ge-label" htmlFor="p-phone">Phone Number</label>
                    <input id="p-phone" className="ge-form-control" defaultValue="+1 555 123 4567" />
                  </div>
                  <div className="ge-form-group full">
                    <label className="ge-label" htmlFor="p-bio">Skin Type / Notes</label>
                    <input
                      id="p-bio"
                      className="ge-form-control"
                      placeholder="e.g. Combination skin, fragrance-sensitive"
                    />
                  </div>
                </div>

                <div className="ge-profile-save">
                  <button type="submit" className="ge-btn-gold">Save Changes</button>
                  <button type="button" className="ge-btn-outline">Cancel</button>
                </div>
              </form>
            </>
          )}

          {activeTab === "orders" && (
            <>
              <h2>Order History</h2>
              {ORDERS.map((order) => (
                <div className="ge-order-item" key={order.id}>
                  <div className="ge-order-thumb">
                    <i className="bi bi-bag"></i>
                  </div>
                  <div className="ge-order-info">
                    <div className="ge-order-title">{order.id}</div>
                    <div className="ge-order-date">{order.date}</div>
                  </div>
                  <span className={`ge-order-status ${order.status}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                  <span className="ge-order-total">{order.total}</span>
                </div>
              ))}
            </>
          )}

          {activeTab === "addresses" && (
            <>
              <h2>Saved Addresses</h2>
              <div className="ge-address-card">
                <span className="ge-address-tag">Default</span>
                <p>
                  Jane Doe <br />
                  221B Bloom Street, Apt 4 <br />
                  New York, NY 10001, United States <br />
                  +1 555 123 4567
                </p>
                <div className="ge-address-actions">
                  <button><i className="bi bi-pencil"></i> Edit</button>
                  <button><i className="bi bi-trash"></i> Remove</button>
                </div>
              </div>
              <div className="ge-address-card">
                <span className="ge-address-tag">Work</span>
                <p>
                  Jane Doe <br />
                  88 Madison Avenue, Suite 210 <br />
                  New York, NY 10016, United States <br />
                  +1 555 987 6543
                </p>
                <div className="ge-address-actions">
                  <button><i className="bi bi-pencil"></i> Edit</button>
                  <button><i className="bi bi-trash"></i> Remove</button>
                </div>
              </div>
              <button type="button" className="ge-btn-outline">
                <i className="bi bi-plus-lg"></i> Add New Address
              </button>
            </>
          )}

          {activeTab === "security" && (
            <>
              <h2>Security</h2>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="ge-profile-grid">
                  <div className="ge-form-group full">
                    <label className="ge-label" htmlFor="p-current">Current Password</label>
                    <input id="p-current" type="password" className="ge-form-control" placeholder="••••••••" />
                  </div>
                  <div className="ge-form-group">
                    <label className="ge-label" htmlFor="p-new">New Password</label>
                    <input id="p-new" type="password" className="ge-form-control" placeholder="••••••••" />
                  </div>
                  <div className="ge-form-group">
                    <label className="ge-label" htmlFor="p-confirm">Confirm New Password</label>
                    <input id="p-confirm" type="password" className="ge-form-control" placeholder="••••••••" />
                  </div>
                </div>
                <div className="ge-profile-save">
                  <button type="submit" className="ge-btn-gold">Update Password</button>
                </div>
              </form>
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default Profile;
