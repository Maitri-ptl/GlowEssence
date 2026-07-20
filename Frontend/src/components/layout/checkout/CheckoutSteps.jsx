import React from "react";
import "./CheckoutSteps.css";

const STEPS = [
  { key: "cart", label: "Shopping Cart" },
  { key: "shipping", label: "Shipping" },
  { key: "payment", label: "Payment" },
];

const CheckoutSteps = ({ active = "cart" }) => {
  const activeIndex = STEPS.findIndex((step) => step.key === active);

  return (
    <div className="ge-checkout-steps">
      {STEPS.map((step, index) => (
        <React.Fragment key={step.key}>
          <span
            className={`ge-checkout-step ${
              index === activeIndex ? "is-active" : ""
            } ${index < activeIndex ? "is-done" : ""}`}
          >
            {step.label}
          </span>

          {index < STEPS.length - 1 && (
            <span className="ge-checkout-step-sep">
              <i className="bi bi-arrow-right"></i>
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CheckoutSteps;
