
function DestinationDetails({
  destination,
  onClose,
  onAddToTrip,
  isSaved,
}) {
  if (!destination) {
    return null;
  }

  return (
    <div
      className="details-overlay"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className="details-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="details-title"
      >
        <button
          className="details-close"
          type="button"
          onClick={onClose}
          aria-label="Close destination details"
        >
          ×
        </button>

        {destination.image && (
          <img
            className="details-image"
            src={destination.image}
            alt={destination.title}
          />
        )}

        <div className="details-content">
          <span className="destination-category details-category">
            {destination.category}
          </span>

          <h2 id="details-title">{destination.title}</h2>

          <p className="details-description">
            {destination.description}
          </p>

          <p className="details-source">
            Destination information provided by Wikipedia.
          </p>

          <div className="details-actions">
            <button
              className="details-save-button"
              type="button"
              onClick={() => onAddToTrip(destination)}
              disabled={isSaved}
            >
              {isSaved ? "✓ Already in My Trip" : "+ Add to My Trip"}
            </button>

            <a
              className="details-source-link"
              href={destination.url}
              target="_blank"
              rel="noreferrer"
            >
              Read full article ↗
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DestinationDetails;
