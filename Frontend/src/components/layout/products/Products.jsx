import { useState } from "react";
import ProductCard from "./ProductCard";
import "./Products.css";
import productsData from "../../../data/products";

const Products = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 4;

  // Copy Products
  let filteredProducts = [...productsData];

  // Search
  filteredProducts = filteredProducts.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  // Filter
  if (category !== "All") {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === category
    );
  }

  // Sort
  if (sort === "low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sort === "high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  if (sort === "rating") {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  // Pagination
  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  const currentProducts = filteredProducts.slice(
    startIndex,
    endIndex
  );

  return (
    <section className="ge-products">
      <div className="ge-container">

        <div className="ge-section-heading">
          <span>Best Sellers</span>
          <h2>Featured Products</h2>
        </div>

        {/* Search Filter Sort */}

        <div className="ge-controls">
          <input
            type="text"
            placeholder="Search Products..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />

          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option>All</option>
            <option>Skincare</option>
            <option>Makeup</option>
            <option>Hair Care</option>
            <option>Fragrance</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="low">Price Low → High</option>
            <option value="high">Price High → Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        {/* Products */}

        <div className="products-grid">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))
          ) : (
            <h3 style={{ textAlign: "center", width: "100%" }}>
              No Products Found
            </h3>
          )}
        </div>

        {/* Pagination */}

        {totalPages > 1 && (
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((prev) => prev - 1)
              }
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={
                  currentPage === index + 1 ? "active" : ""
                }
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => prev + 1)
              }
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;