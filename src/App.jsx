
import { useEffect, useMemo, useState } from "react";

import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import DestinationCard from "./components/DestinationCard";
import DestinationDetails from "./components/DestinationDetails";
import LoadingState from "./components/LoadingState";
import ErrorState from "./components/ErrorState";
import TravelAssistant from "./components/TravelAssistant";

import { fetchDestinations } from "./services/destinationApi";

import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name-asc");

  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  const [selectedDestination, setSelectedDestination] = useState(null);

  const [itinerary, setItinerary] = useState(() => {
    try {
      const saved = localStorage.getItem("tripwise-itinerary");
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  // Fetch destination information from Wikipedia.
  useEffect(() => {
    const controller = new AbortController();

    const timer = setTimeout(async () => {
      setLoading(true);
      setError("");

      try {
        const results = await fetchDestinations(
          search,
          controller.signal
        );

        setDestinations(results);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(
            err.message ||
              "We couldn't load destinations. Please try again."
          );
          setDestinations([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, 450);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [search, retryCount]);

  // Persist saved destinations between page refreshes.
  useEffect(() => {
    try {
      localStorage.setItem(
        "tripwise-itinerary",
        JSON.stringify(itinerary)
      );
    } catch {
      console.error("Unable to save the itinerary in this browser.");
    }
  }, [itinerary]);

  // Filter and sort the results.
  const filteredDestinations = useMemo(() => {
    const results = destinations.filter((destination) => {
      return (
        category === "All" ||
        destination.category === category
      );
    });

    return [...results].sort((a, b) => {
      if (sortBy === "name-asc") {
        return a.title.localeCompare(b.title);
      }

      if (sortBy === "name-desc") {
        return b.title.localeCompare(a.title);
      }

      if (sortBy === "category") {
        return (
          a.category.localeCompare(b.category) ||
          a.title.localeCompare(b.title)
        );
      }

      return 0;
    });
  }, [destinations, category, sortBy]);

  // Add a destination without creating duplicates.
  function addToTrip(destination) {
    setItinerary((current) => {
      const alreadySaved = current.some(
        (item) => item.id === destination.id
      );

      if (alreadySaved) {
        return current;
      }

      return [...current, destination];
    });
  }

  // Remove a destination from the itinerary.
  function removeFromTrip(id) {
    setItinerary((current) =>
      current.filter((item) => item.id !== id)
    );
  }

  // Check whether a destination is already saved.
  function isSaved(id) {
    return itinerary.some((item) => item.id === id);
  }

  function clearFilters() {
    setSearch("");
    setCategory("All");
    setSortBy("name-asc");
  }

  return (
    <div className="app" id="top">
      <Navbar />

      <main>
        {/* Homepage and search */}
        <section className="hero">
          <div className="hero-label">
            <span className="hero-dot"></span>
            YOUR NEXT ADVENTURE STARTS HERE
          </div>

          <h1>
            Find your next
            <br />
            <span>favourite place.</span>
          </h1>

          <p className="hero-description">
            Discover places worth exploring, find your kind
            of adventure, and save the ones you love.
          </p>

          <SearchBar
            search={search}
            setSearch={setSearch}
          />

          <p className="hero-note">
            <span>✦</span> Search. Discover. Add to your trip.
          </p>
        </section>

        {/* AI Travel Assistant powered by Gemini */}
        <TravelAssistant />

        {/* Destination explorer */}
        <section id="explore" className="explore-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">THE WORLD IS WAITING</p>
              <h2>Explore places</h2>
              <p className="section-description">
                Find somewhere new to fall in love with.
              </p>
            </div>
          </div>

          <FilterBar
            category={category}
            setCategory={setCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          {!loading && !error && (
            <p className="results-count" aria-live="polite">
              Showing {filteredDestinations.length}{" "}
              {filteredDestinations.length === 1
                ? "destination"
                : "destinations"}
            </p>
          )}

          {loading && <LoadingState />}

          {!loading && error && (
            <ErrorState
              message={error}
              onRetry={() => setRetryCount((count) => count + 1)}
            />
          )}

          {!loading &&
            !error &&
            filteredDestinations.length > 0 && (
              <div className="destination-grid">
                {filteredDestinations.map((destination) => (
                  <DestinationCard
                    key={destination.id}
                    destination={destination}
                    onViewDetails={setSelectedDestination}
                    onAddToTrip={addToTrip}
                    isSaved={isSaved(destination.id)}
                  />
                ))}
              </div>
            )}

          {!loading &&
            !error &&
            filteredDestinations.length === 0 && (
              <div className="results-message">
                <div className="results-icon">⌕</div>

                <h3>No matching places found</h3>

                <p>
                  Try another search or select a different category.
                </p>

                <button
                  className="retry-button"
                  type="button"
                  onClick={clearFilters}
                >
                  Clear search and filters
                </button>
              </div>
            )}
        </section>

        {/* Saved itinerary */}
        <section id="my-trip" className="trip-placeholder">
          <p className="eyebrow">YOUR PERSONAL COLLECTION</p>
          <h2>My Trip</h2>

          <p>
            Keep all your favourite destinations together.
          </p>

          {itinerary.length === 0 ? (
            <div className="itinerary-empty">
              <span aria-hidden="true">✳</span>

              <h3>Your trip starts with a place</h3>

              <p>
                Explore destinations and add the ones you would
                love to visit. They will be saved here.
              </p>

              <a
                href="#explore"
                className="itinerary-explore-link"
              >
                Explore destinations ↗
              </a>
            </div>
          ) : (
            <div className="itinerary-list">
              {itinerary.map((destination) => (
                <article
                  className="itinerary-item"
                  key={destination.id}
                >
                  {destination.image ? (
                    <img
                      src={destination.image}
                      alt={destination.title}
                      className="itinerary-thumbnail"
                      loading="lazy"
                    />
                  ) : (
                    <div className="itinerary-thumbnail itinerary-thumbnail-empty">
                      ✳
                    </div>
                  )}

                  <div className="itinerary-item-info">
                    <h3>{destination.title}</h3>
                    <span>{destination.category}</span>
                  </div>

                  <button
                    className="remove-trip-button"
                    type="button"
                    onClick={() => removeFromTrip(destination.id)}
                    aria-label={`Remove ${destination.title} from My Trip`}
                  >
                    Remove
                  </button>
                </article>
              ))}
            </div>
          )}

          {itinerary.length > 0 && (
            <p className="itinerary-count">
              {itinerary.length}{" "}
              {itinerary.length === 1 ? "place" : "places"} saved
            </p>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <span className="footer-brand">
          <span className="brand-symbol">✳</span>
          TripWise
        </span>

        <span>
          Destination information via{" "}
          <a
            href="https://www.wikipedia.org/"
            target="_blank"
            rel="noreferrer"
          >
            Wikipedia
          </a>
          .
        </span>
      </footer>

      {/* Destination details dialog */}
      <DestinationDetails
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
        onAddToTrip={addToTrip}
        isSaved={
          selectedDestination
            ? isSaved(selectedDestination.id)
            : false
        }
      />
    </div>
  );
}

export default App;
