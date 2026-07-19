import "./Categories.css";

const categories = [
  {
    id: 1,
    title: "Skincare",
    description: "Healthy & glowing skin",
    image:
      "https://radium-aesthetics.com/wp-content/uploads/2023/03/Skincare-Ingredients.jpg",
  },
  {
    id: 2,
    title: "Makeup",
    description: "Express your beauty",
    image:
      "https://delulucosmetics.in/cdn/shop/articles/Pasted-into-Makeup-Brands-To-Choose-From.png?v=1749456816",
  },
  {
    id: 3,
    title: "Haircare",
    description: "Shiny & healthy hair",
    image:
      "https://images.squarespace-cdn.com/content/v1/60af905e412c937275f9ddfb/1742217694617-GSTZZ1DH0RVAC699HAMY/4887D3BA-42DF-4DCE-9FAC-2E66D3FE4B8C.JPG",
  },
  {
    id: 4,
    title: "Bodycare",
    description: "Pamper your body",
    image:
      "https://images.fresha.com/lead-images/placeholders/spa-51.jpg?class=venue-gallery-large",
  },
  {
    id: 5,
    title: "Fragrance",
    description: "Luxury perfumes",
    image:
      "https://i.pinimg.com/736x/00/c0/69/00c069f79518fe60e8801322b20b00f9.jpg",
  },
  {
    id: 6,
    title: "Gift Sets",
    description: "Perfect beauty gifts",
    image:
      "https://www.wraparts.in/cdn/shop/files/Valentine_s_Romance_Gift_Hamper_4.png?v=1768990914&width=900",
  },
];

const Categories = () => {
  return (
    <section className="ge-categories">
      <div className="ge-categories-heading">
        <span className="ge-eyebrow">Shop By Category</span>

        <h2>Beauty Essentials For Every Routine</h2>

        <p>
          Discover premium beauty collections carefully crafted for every skin,
          hair and makeup need.
        </p>
      </div>

      <div className="ge-categories-grid">
        {categories.map((item) => (
          <div className="ge-category-card" key={item.id}>
            <img src={item.image} alt={item.title} />

            <div className="ge-category-overlay">
              <h3>{item.title}</h3>

              <p>{item.description}</p>

              <button className="ge-btn-outline">
                Explore
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;