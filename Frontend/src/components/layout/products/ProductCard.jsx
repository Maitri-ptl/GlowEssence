import { Link } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className="product-link"
    >
      <div className="ge-product-card">

        <div className="ge-product-image">

          <img src={product.image} alt={product.name} />
+
          <span className="discount">
            Save ₹{product.oldPrice - product.price}
          </span>

          <button
            className="wishlist"
            onClick={(e) => e.preventDefault()}
          >
            ❤
          </button>

        </div>

        <div className="ge-product-info">

          <small>{product.category}</small>

          <h3>{product.name}</h3>

          <div className="rating">
            ★★★★⯪ {product.rating}
          </div>

          <div className="price">

            <span className="new">
              ₹{product.price}
            </span>

            <span className="old">
              ₹{product.oldPrice}
            </span>

          </div>

          <button
            className="cart-btn"
            onClick={(e) => e.preventDefault()}
          >
            Add to Cart
          </button>

        </div>

      </div>
    </Link>
  );
};

export default ProductCard;