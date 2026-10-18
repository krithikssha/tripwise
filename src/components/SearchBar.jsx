
import "./SearchBar.css";

function SearchBar({ search, setSearch }) {
  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <form
      className="search-bar"
      onSubmit={handleSubmit}
    >
      <span className="search-icon" aria-hidden="true">
        ⌕
      </span>

      <input
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search destinations or places..."
        aria-label="Search destinations or places"
      />

      {search && (
        <button
          className="clear-search"
          type="button"
          onClick={() => setSearch("")}
          aria-label="Clear search"
        >
          ×
        </button>
      )}

      <button className="search-button" type="submit">
        Search <span aria-hidden="true">↗</span>
      </button>
    </form>
  );
}

export default SearchBar;
