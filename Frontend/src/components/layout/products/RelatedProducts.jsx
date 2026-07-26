import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../../features/products/productSlicer";
import ProductCard from "./ProductCard";
import "./RelatedProducts.css";

const RelatedProducts = ({ category, currentId }) => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  // make sure the full product list is loaded (it might already be, if the
  // user came here from the Home or Shop page - this just refreshes it)
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const relatedProducts = products
    .filter(
      (product) =>
        product.category?.name === category &&
        product._id !== currentId
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
              key={product._id}
              product={product}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default RelatedProducts;
