
import "./FilterBar.css";

function FilterBar({ category, setCategory, sortBy, setSortBy }) {
  const categories = [
    "All",
    "Nature",
    "Culture",
    "Attractions",
    "Architecture",
  ];

  return (
    <div className="filter-bar">
      <div
        className="category-filters"
        aria-label="Filter destinations by category"
      >
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            className={`filter-chip ${
              category === item ? "selected" : ""
            }`}
            onClick={() => setCategory(item)}
            aria-pressed={category === item}
          >
            {item}
          </button>
        ))}
      </div>

      <label className="sort-control">
        <span>Sort by:</span>

        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
          aria-label="Sort destinations"
        >
          <option value="name-asc">Name (A–Z)</option>
          <option value="name-desc">Name (Z–A)</option>
          <option value="category">Category</option>
        </select>
      </label>
    </div>
  );
}

export default FilterBar;
