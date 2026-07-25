import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWishlist,
  removeWishlistItem,
} from "../../features/wishlist/wishlistSlicer";
import "./Wishlist.css";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.users);
  const { items, isLoading, error } = useSelector((state) => state.wishlist);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchWishlist());
    }
  }, [dispatch, currentUser]);

  const handleRemove = (item) => {
    dispatch(removeWishlistItem(item._id));
  };

  return (
    <section className="ge-wishlist-page">
      <div className="ge-wishlist-card">
        <div className="ge-wishlist-header">
          <h1 className="ge-wishlist-title">My Wishlist</h1>
          <span className="ge-wishlist-count">{items.length} items</span>
        </div>

        {!currentUser && (
          <p>
            Please{" "}
            <Link to="/login" className="ge-link-gold">
              sign in
            </Link>{" "}
            to view your wishlist.
          </p>
        )}

        {currentUser && isLoading && <p>Loading your wishlist...</p>}

        {currentUser && error && (
          <p className="ge-wishlist-error">{error}</p>
        )}

        {currentUser && !isLoading && !error && items.length === 0 && (
          <p>Your wishlist is empty.</p>
        )}

        {currentUser && !isLoading && items.length > 0 && (
          <div className="ge-wishlist-grid">
            {items.map((item) => (
              <div className="ge-wishlist-item" key={item._id}>
                <div className="ge-wishlist-item-media">
                  <img src={item.product.image} alt={item.product.name} />
                  <button
                    type="button"
                    className="ge-wishlist-remove"
                    aria-label="Remove from wishlist"
                    onClick={() => handleRemove(item)}
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>

                <div className="ge-wishlist-item-info">
                  <h3>{item.product.name}</h3>

                  <div className="ge-wishlist-item-price">
                    <span className="ge-price-new">
                      ₹ {item.product.price}
                    </span>
                  </div>

                  <button type="button" className="ge-btn-gold ge-wishlist-add-btn">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <Link to="/" className="ge-back-link">
          Continue Shopping
        </Link>
      </div>
    </section>
  );
};

export default Wishlist;
