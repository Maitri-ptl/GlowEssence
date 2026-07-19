import products from "../../../data/products";
import ProductCard from "./ProductCard";
import "./RelatedProducts.css";

const RelatedProducts = ({ category, currentId }) => {
  const relatedProducts = products
    .filter(
      (product) =>
        product.category === category &&
        product.id !== currentId
    )
    .slice(0, 4);

  if (relatedProducts.length === 0) return null;

  return (
    <section className="related-products">

      <div className="ge-container">

        <div className="ge-section-heading">
          <span>You May Also Like</span>
          <h2>Related Products</h2>
        </div>

        <div className="products-grid">
          {relatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default RelatedProducts;