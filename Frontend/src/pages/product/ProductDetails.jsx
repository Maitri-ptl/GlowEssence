import { useParams } from "react-router-dom";
import products from "../../data/products";
import RelatedProducts from "../../components/layout/products/RelatedProducts";
import NotFound from "../error/NotFound";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <NotFound
        title="Product Not Found"
        text="Sorry, this product doesn't exist or is no longer available."
      />
    );
  }

  return (
    <>
      <section className="product-details">

        <div className="product-image">
          <img
            src={product.image}
            alt={product.name}
          />
        </div>

        <div className="product-info">

          <span className="category">
            {product.category}
          </span>

          <h1>{product.name}</h1>

          <div className="rating">
            ★★★★⯪ {product.rating}
          </div>

          <h2 className="price">
            ₹ {product.price}
          </h2>

          <p>{product.description}</p>

          <button className="ge-btn-gold">
            Add To Cart
          </button>

        </div>

      </section>

      <RelatedProducts
        category={product.category}
        currentId={product.id}
      />
    </>
  );
};

export default ProductDetails;