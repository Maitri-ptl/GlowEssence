import React from "react";
import { Link } from "react-router-dom";
import "./Wishlist.css";

const WISHLIST_ITEMS = [
  {
    id: 3,
    name: "Matte Lipstick",
    category: "Makeup",
    price: "₹ 599",
    oldPrice: "₹ 799",
    image:
      "https://europegirl.com/cdn/shop/files/Untitled_design_2_986d86a8-032f-4188-a339-bd797613e709.png?v=1741347703&width=1000",
  },
  {
    id: 4,
    name: "Luxury Perfume",
    category: "Fragrance",
    price: "₹ 1,999",
    oldPrice: "₹ 2,499",
    image:
      "https://embarouge.in/cdn/shop/files/Embarouge_Luxeria_Luxury_perfume_for_women_Eau_De_parfum_100_ml_product_image.webp?v=1772189118&width=416",
  },
  {
    id: 5,
    name: "Hair Repair Oil",
    category: "Hair Care",
    price: "₹ 749",
    oldPrice: "₹ 999",
    image:
      "https://siyaayurveda.com/cdn/shop/files/siya-ayurveda-hair-growth-serumhair-growth-serum-with-redensyl-javakusum-264123.png?v=1743511432&width=800",
  },
  {
    id: 8,
    name: "Rose Glow Toner",
    category: "Skincare",
    price: "₹ 649",
    oldPrice: "₹ 849",
    image:
      "https://deyga.in/cdn/shop/files/2_207c961b-82df-4d4f-b86d-f2fbc903752b.webp",
  },
];

const Wishlist = () => {
  return (
    <section className="ge-wishlist-page">
      <div className="ge-wishlist-card">
        <div className="ge-wishlist-header">
          <h1 className="ge-wishlist-title">My Wishlist</h1>
          <span className="ge-wishlist-count">
            {WISHLIST_ITEMS.length} items
          </span>
        </div>

        <div className="ge-wishlist-grid">
          {WISHLIST_ITEMS.map((item) => (
            <div className="ge-wishlist-item" key={item.id}>
              <div className="ge-wishlist-item-media">
                <img src={item.image} alt={item.name} />
                <button
                  type="button"
                  className="ge-wishlist-remove"
                  aria-label="Remove from wishlist"
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>

              <div className="ge-wishlist-item-info">
                <span className="ge-wishlist-item-category">
                  {item.category}
                </span>
                <h3>{item.name}</h3>

                <div className="ge-wishlist-item-price">
                  <span className="ge-price-new">{item.price}</span>
                  <span className="ge-price-old">{item.oldPrice}</span>
                </div>

                <button type="button" className="ge-btn-gold ge-wishlist-add-btn">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        <Link to="/" className="ge-back-link">
          Continue Shopping
        </Link>
      </div>
    </section>
  );
};

export default Wishlist;
