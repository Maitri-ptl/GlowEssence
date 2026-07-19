import { useParams } from "react-router-dom";
import products from "../../data/products";
import RelatedProducts from "../../components/layout/products/RelatedProducts";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <h2 style={{ textAlign: "center", margin: "80px" }}>
        Product Not Found
      </h2>
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