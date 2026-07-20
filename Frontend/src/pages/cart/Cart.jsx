import React from "react";
import { Link } from "react-router-dom";
import CheckoutSteps from "../../components/layout/checkout/CheckoutSteps";
import "./Cart.css";

const CART_ITEMS = [
  {
    id: 1,
    name: "Vitamin C Face Serum",
    variant: "30 ml",
    price: "₹ 899",
    qty: 1,
    image: "https://proskire.in/cdn/shop/files/Untitled-3.jpg?v=1770361489",
  },
  {
    id: 2,
    name: "Aloe Vera Face Wash",
    variant: "150 ml",
    price: "₹ 549",
    qty: 1,
    image:
      "https://m.media-amazon.com/images/I/71RjwtQtYSL._AC_UF1000,1000_QL80_.jpg",
  },
];

const Cart = () => {
  return (
    <section className="ge-checkout-page">
      <div className="ge-checkout-card">
        <CheckoutSteps active="cart" />

        <div className="ge-cart-grid">
          <div className="ge-cart-main">
            <h1 className="ge-checkout-title">Shopping Cart</h1>

            <ul className="ge-cart-list">
              {CART_ITEMS.map((item) => (
                <li className="ge-cart-item" key={item.id}>
                  <div className="ge-cart-item-media">
                    <img src={item.image} alt={item.name} />
                  </div>

                  <div className="ge-cart-item-details">
                    <div className="ge-cart-item-top">
                      <div>
                        <h3>{item.name}</h3>
                        <span className="ge-cart-item-variant">
                          {item.variant}
                        </span>
                      </div>

                      <button type="button" className="ge-cart-remove">
                        Remove
                      </button>
                    </div>

                    <div className="ge-cart-item-bottom">
                      <div className="ge-qty-select">
                        <span>Quantity {item.qty}</span>
                        <i className="bi bi-chevron-down"></i>
                      </div>

                      <span className="ge-cart-item-price">
                        {item.price}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <aside className="ge-order-summary">
            <h2>Total</h2>

            <div className="ge-order-row">
              <span>Subtotal</span>
              <span>₹ 1,448</span>
            </div>

            <div className="ge-order-row">
              <span>Shipping</span>
              <span className="ge-order-row-note">Calculated on checkout</span>
            </div>

            <div className="ge-order-divider"></div>

            <div className="ge-order-row ge-order-total">
              <span>Total</span>
              <span>₹ 1,448</span>
            </div>

            <div className="ge-discount">
              <label className="ge-label">Discount code</label>
              <div className="ge-discount-input">
                <input
                  type="text"
                  className="ge-form-control"
                  placeholder="Enter code"
                />
                <button
                  type="button"
                  className="ge-discount-btn"
                  aria-label="Apply discount code"
                >
                  <i className="bi bi-arrow-right"></i>
                </button>
              </div>
            </div>

            <Link to="/checkout/shipping" className="ge-btn-gold ge-checkout-btn">
              Checkout Now
            </Link>

            <Link to="/" className="ge-back-link">
              Continue Shopping
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Cart;
