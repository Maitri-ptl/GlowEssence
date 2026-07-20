import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "../../components/layout/checkout/CheckoutSteps";
import "./Checkout.css";

const ORDER_ITEMS = [
  {
    id: 1,
    name: "Vitamin C Face Serum",
    variant: "30 ml",
    qty: 1,
    price: "₹ 899",
    image: "https://proskire.in/cdn/shop/files/Untitled-3.jpg?v=1770361489",
  },
  {
    id: 2,
    name: "Aloe Vera Face Wash",
    variant: "150 ml",
    qty: 1,
    price: "₹ 549",
    image:
      "https://m.media-amazon.com/images/I/71RjwtQtYSL._AC_UF1000,1000_QL80_.jpg",
  },
];

const INITIAL_FORM = {
  nameOnCard: "",
  cardNumber: "",
  expiryDate: "",
  cvc: "",
};

const Payment = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (paymentMethod !== "card") {
      setErrors({});
      return true;
    }

    const newErrors = {};

    if (!form.nameOnCard.trim()) {
      newErrors.nameOnCard = "Name on card is required";
    }

    const digitsOnly = form.cardNumber.replace(/\s/g, "");
    if (!digitsOnly) {
      newErrors.cardNumber = "Card number is required";
    } else if (!/^\d{13,19}$/.test(digitsOnly)) {
      newErrors.cardNumber = "Enter a valid card number";
    }

    if (!form.expiryDate.trim()) {
      newErrors.expiryDate = "Expiry date is required";
    } else if (!/^(0[1-9]|1[0-2])\s*\/\s*\d{2}$/.test(form.expiryDate.trim())) {
      newErrors.expiryDate = "Use MM / YY format";
    }

    if (!form.cvc.trim()) {
      newErrors.cvc = "CVC is required";
    } else if (!/^\d{3,4}$/.test(form.cvc.trim())) {
      newErrors.cvc = "Enter a valid CVC";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate("/");
    }
  };

  return (
    <section className="ge-checkout-page">
      <div className="ge-checkout-card">
        <CheckoutSteps active="payment" />

        <div className="ge-checkout-grid">
          <form className="ge-checkout-form" onSubmit={handleSubmit} noValidate>
            <h1 className="ge-checkout-title">Payment Method</h1>

            <div className="ge-payment-methods">
              <label
                className={`ge-payment-option ${
                  paymentMethod === "card" ? "is-selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="payment-method"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                />
                Card
              </label>

              <label
                className={`ge-payment-option ${
                  paymentMethod === "paypal" ? "is-selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="payment-method"
                  checked={paymentMethod === "paypal"}
                  onChange={() => setPaymentMethod("paypal")}
                />
                PayPal
              </label>
            </div>

            {paymentMethod === "card" && (
              <div className="ge-card-fields">
                <div className="ge-form-row">
                  <div className="ge-field">
                    <label className="ge-label">Name on card</label>
                    <input
                      type="text"
                      name="nameOnCard"
                      className={`ge-form-control ${
                        errors.nameOnCard ? "is-invalid" : ""
                      }`}
                      placeholder="Name on card"
                      value={form.nameOnCard}
                      onChange={handleChange}
                    />
                    {errors.nameOnCard && (
                      <span className="ge-field-error">{errors.nameOnCard}</span>
                    )}
                  </div>
                  <div className="ge-field">
                    <label className="ge-label">Card number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      className={`ge-form-control ${
                        errors.cardNumber ? "is-invalid" : ""
                      }`}
                      placeholder="Card number"
                      value={form.cardNumber}
                      onChange={handleChange}
                    />
                    {errors.cardNumber && (
                      <span className="ge-field-error">{errors.cardNumber}</span>
                    )}
                  </div>
                </div>

                <div className="ge-form-row">
                  <div className="ge-field">
                    <label className="ge-label">Expiry date</label>
                    <input
                      type="text"
                      name="expiryDate"
                      className={`ge-form-control ${
                        errors.expiryDate ? "is-invalid" : ""
                      }`}
                      placeholder="MM / YY"
                      value={form.expiryDate}
                      onChange={handleChange}
                    />
                    {errors.expiryDate && (
                      <span className="ge-field-error">{errors.expiryDate}</span>
                    )}
                  </div>
                  <div className="ge-field">
                    <label className="ge-label">CVC</label>
                    <input
                      type="text"
                      name="cvc"
                      className={`ge-form-control ${
                        errors.cvc ? "is-invalid" : ""
                      }`}
                      placeholder="CVC"
                      value={form.cvc}
                      onChange={handleChange}
                    />
                    {errors.cvc && (
                      <span className="ge-field-error">{errors.cvc}</span>
                    )}
                  </div>
                </div>
              </div>
            )}

            <button type="submit" className="ge-btn-gold ge-checkout-btn">
              Complete Purchase
            </button>

            <Link to="/checkout/shipping" className="ge-back-link">
              Back to Shipping
            </Link>
          </form>

          <aside className="ge-order-summary">
            <div className="ge-order-summary-head">
              <h2>Your Order</h2>
              <Link to="/cart" className="ge-link-gold">
                Edit Cart
              </Link>
            </div>

            <ul className="ge-order-items">
              {ORDER_ITEMS.map((item) => (
                <li key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div className="ge-order-item-info">
                    <h4>{item.name}</h4>
                    <span>{item.variant}</span>
                    <span>Quantity {item.qty}</span>
                  </div>
                  <span className="ge-order-item-price">{item.price}</span>
                </li>
              ))}
            </ul>

            <div className="ge-order-divider"></div>

            <div className="ge-order-row">
              <span>Subtotal</span>
              <span>₹ 1,448</span>
            </div>
            <div className="ge-order-row">
              <span>Shipping</span>
              <span>₹ 150</span>
            </div>

            <div className="ge-order-divider"></div>

            <div className="ge-order-row ge-order-total">
              <span>Total</span>
              <span>₹ 1,598</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Payment;
