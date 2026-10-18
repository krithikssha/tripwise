
import "./TravelAssistant.css";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

function TravelAssistant() {
  const [preferences, setPreferences] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function getRecommendations(event) {
    event.preventDefault();

    if (!preferences.trim()) {
      setError("Tell us what kind of trip you're looking for.");
      return;
    }

    setLoading(true);
    setError("");
    setRecommendation("");
    setCopied(false);

    try {
      const response = await fetch(
        "/.netlify/functions/travel-assistant",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            preferences: preferences.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to get recommendations."
        );
      }

      if (!data.recommendation) {
        throw new Error(
          "No recommendations were returned. Please try again."
        );
      }

      setRecommendation(data.recommendation);
    } catch (err) {
      setError(
        err.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  async function copyRecommendation() {
    try {
      await navigator.clipboard.writeText(recommendation);
      setCopied(true);
    } catch {
      setError(
        "Unable to copy automatically. Please select and copy the text."
      );
    }
  }

  return (
    <section className="ai-travel-section" id="ai-planner">
      <div className="ai-travel-heading">
        <span className="ai-travel-label">
          ✦ YOUR PERSONAL AI TRAVEL ASSISTANT
        </span>

        <h2>Tell us your kind of adventure.</h2>

        <p>
          Describe your ideal trip and let AI help you discover
          possibilities.
        </p>
      </div>

      <form
        onSubmit={getRecommendations}
        className="ai-travel-form"
      >
        <label htmlFor="trip-preferences">
          What would you love from your trip?
        </label>

        <textarea
          id="trip-preferences"
          value={preferences}
          onChange={(event) => {
            setPreferences(event.target.value);
            setError("");
          }}
          placeholder="Example: A peaceful 3-day nature trip, beautiful views, local culture and a student-friendly budget..."
          maxLength={1200}
          rows={4}
          required
          disabled={loading}
        />

        <div className="ai-travel-form-footer">
          <span>{preferences.length}/1200</span>

          <button type="submit" disabled={loading}>
            {loading
              ? "Finding ideas..."
              : "✦ Find my adventure"}
          </button>
        </div>
      </form>

      {loading && (
        <p className="ai-travel-status" role="status">
          Gemini is finding ideas for your next adventure...
        </p>
      )}

      {error && (
        <p className="ai-travel-error" role="alert">
          {error}
        </p>
      )}

      {recommendation && (
        <article className="ai-travel-result">
          <div className="ai-travel-result-header">
            <div>
              <span className="ai-travel-label">
                ✦ MADE FOR YOUR NEXT ADVENTURE
              </span>

              <h3>Your personalised travel ideas</h3>
            </div>

            <button
              type="button"
              className="ai-travel-copy-button"
              onClick={copyRecommendation}
            >
              {copied ? "✓ Copied!" : "Copy ideas"}
            </button>
          </div>

          <div className="ai-travel-answer">
            <ReactMarkdown
              components={{
                h1: ({ children }) => <h2>{children}</h2>,
                h2: ({ children }) => <h3>{children}</h3>,
                h3: ({ children }) => <h4>{children}</h4>,
                a: ({ children, href }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {recommendation}
            </ReactMarkdown>
          </div>

          <p className="ai-travel-disclaimer">
            AI-generated ideas may need verification. Check
            current travel details before making plans.
          </p>
        </article>
      )}
    </section>
  );
}

export default TravelAssistant;
