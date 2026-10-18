
import "./DestinationCard.css";

function DestinationCard({
  destination,
  onViewDetails,
  onAddToTrip,
  isSaved,
}) {
  return (
    <article className="destination-card">
      <div className="destination-image-wrap">
        {destination.image ? (
          <img
            className="destination-image"
            src={destination.image}
            alt={destination.title}
            loading="lazy"
          />
        ) : (
          <div className="destination-image-fallback">
            <span aria-hidden="true">✳</span>
            <p>Discover this place</p>
          </div>
        )}

        <span className="destination-category">
          {destination.category}
        </span>
      </div>

      <div className="destination-card-body">
        <h3>{destination.title}</h3>

        <p className="destination-description">
          {destination.description}
        </p>

        <div className="destination-card-footer">
          <button
            className="view-details-button"
            type="button"
            onClick={() => onViewDetails(destination)}
          >
            View details ↗
          </button>

          <button
            className="save-destination-button"
            type="button"
            onClick={() => onAddToTrip(destination)}
            disabled={isSaved}
          >
            {isSaved ? "✓ Added" : "+ My Trip"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default DestinationCard;
