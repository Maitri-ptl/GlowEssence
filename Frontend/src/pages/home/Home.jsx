import React from "react";
import { Link } from "react-router-dom";
import hero from "../../assets/hero.png";
import "./Home.css";
import Products from "../../components/layout/products/Products";
import Categories from "../../components/layout/categories/Categories";

const Home = () => {
  return (
    <>
      <section className="ge-hero">
        <div className="ge-hero-text">
          <span className="ge-eyebrow">
            Clean Beauty, Naturally You
          </span>

          <h1>Let your glow speak for itself.</h1>

          <p>
            Discover skincare and makeup crafted with botanical
            ingredients — gentle on your skin, kind to the planet.
          </p>

          <div className="ge-hero-actions">
            <Link to="/register" className="ge-btn-gold">
              Shop the Collection
            </Link>

            <Link to="/login" className="ge-btn-outline">
              Sign In
            </Link>
          </div>
        </div>

        {/* <div className="ge-hero-image">
          <img
            src={hero}
            alt="GlowEssence hero product"
          />
        </div> */}
      </section>

      {/* Categories Section */}
      <Categories />
      {/* Products Section */}
      <Products />
    </>
  );
};

export default Home;