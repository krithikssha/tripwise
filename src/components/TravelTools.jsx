
import { useEffect, useState } from "react";
import "./TravelTools.css";

const tools = [
  { id: "planner", number: "01", icon: "✳", title: "Trip Builder", description: "Bring your saved destinations together." },
  { id: "journal", number: "02", icon: "✎", title: "Travel Journal", description: "Keep notes and memories from your travels." },
  { id: "season", number: "03", icon: "☼", title: "Best Time to Visit", description: "Explore general seasonal planning tips." },
  { id: "budget", number: "04", icon: "₹", title: "Budget Planner", description: "Plan your spending before you go." },
  { id: "compare", number: "05", icon: "⇄", title: "Compare Places", description: "Compare two destinations side by side." },
  { id: "packing", number: "06", icon: "⌑", title: "Packing Checklist", description: "Prepare your essentials for the journey." },
];

const defaultPacking = [
  "Travel documents and identification",
  "Phone and charger",
  "Weather-appropriate clothing",
  "Toiletries and personal essentials",
  "Reusable water bottle",
];

function readSaved(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

function TravelTools({
  destinations = [],
  itinerary = [],
  onAddToTrip,
  onRemoveFromTrip,
}) {
  const [active, setActive] = useState("planner");
  const [journal, setJournal] = useState(() =>
    readSaved("tripwise-journal", [])
  );
  const [packing, setPacking] = useState(() =>
    readSaved(
      "tripwise-packing",
      defaultPacking.map((text, index) => ({
        id: `packing-${index}`,
        text,
        checked: false,
      }))
    )
  );
  const [budget, setBudget] = useState(() =>
    readSaved("tripwise-budget", {
      limit: "10000",
      expenses: [],
    })
  );
  const [newPacking, setNewPacking] = useState("");
  const [journalTitle, setJournalTitle] = useState("");
  const [journalText, setJournalText] = useState("");
  const [journalPlace, setJournalPlace] = useState("");
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [firstPlace, setFirstPlace] = useState("");
  const [secondPlace, setSecondPlace] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");

  useEffect(() => {
    localStorage.setItem("tripwise-journal", JSON.stringify(journal));
  }, [journal]);

  useEffect(() => {
    localStorage.setItem("tripwise-packing", JSON.stringify(packing));
  }, [packing]);

  useEffect(() => {
    localStorage.setItem("tripwise-budget", JSON.stringify(budget));
  }, [budget]);

  const allPlaces = [
    ...itinerary,
    ...destinations.filter(
      (place) => !itinerary.some((saved) => saved.id === place.id)
    ),
  ];

  const chosenPlace = allPlaces.find(
    (place) => String(place.id) === selectedPlace
  );

  const comparisonA = allPlaces.find(
    (place) => String(place.id) === firstPlace
  );
  const comparisonB = allPlaces.find(
    (place) => String(place.id) === secondPlace
  );

  const totalSpent = budget.expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  function addJournalEntry(event) {
    event.preventDefault();

    if (!journalTitle.trim() || !journalText.trim()) return;

    setJournal((current) => [
      {
        id: `${Date.now()}`,
        title: journalTitle.trim(),
        text: journalText.trim(),
        place: journalPlace,
        date: new Date().toLocaleDateString(),
      },
      ...current,
    ]);

    setJournalTitle("");
    setJournalText("");
    setJournalPlace("");
  }

  function addExpense(event) {
    event.preventDefault();

    const amount = Number(expenseAmount);

    if (!expenseName.trim() || !Number.isFinite(amount) || amount <= 0) {
      return;
    }

    setBudget((current) => ({
      ...current,
      expenses: [
        ...current.expenses,
        {
          id: `${Date.now()}`,
          name: expenseName.trim(),
          amount,
        },
      ],
    }));

    setExpenseName("");
    setExpenseAmount("");
  }

  function addPackingItem(event) {
    event.preventDefault();
    if (!newPacking.trim()) return;

    setPacking((current) => [
      ...current,
      {
        id: `${Date.now()}`,
        text: newPacking.trim(),
        checked: false,
      },
    ]);

    setNewPacking("");
  }

  return (
    <section className="travel-tools" id="trip-planner">
      <div className="travel-tools-heading">
        <p className="eyebrow">YOUR TRAVEL JOURNAL</p>
        <h2>A little space for every adventure.</h2>
        <p>
          Plan the details, collect your thoughts, and get ready
          for somewhere new.
        </p>
      </div>

      <div className="travel-tools-grid">
        {tools.map((tool) => (
          <button
            key={tool.id}
            type="button"
            className={`travel-tool-card ${
              active === tool.id ? "is-active" : ""
            }`}
            onClick={() => setActive(tool.id)}
            aria-pressed={active === tool.id}
          >
            <span className="travel-tool-icon">{tool.icon}</span>
            <span className="travel-tool-number">{tool.number}</span>
            <strong>{tool.title}</strong>
            <span className="travel-tool-description">
              {tool.description}
            </span>
            <span className="travel-tool-open">
              Open tool ↗
            </span>
          </button>
        ))}
      </div>

      <div className="travel-tool-workspace">
        {active === "planner" && (
          <div>
            <p className="eyebrow">YOUR ITINERARY</p>
            <h3>Build your trip</h3>
            <p className="travel-tool-help">
              Add places from Explore, then organise your saved
              destinations here.
            </p>

            {allPlaces.length > 0 ? (
              <div className="travel-tool-list">
                {itinerary.map((place, index) => (
                  <article className="travel-tool-row" key={place.id}>
                    <span className="travel-tool-row-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="travel-tool-row-content">
                      <strong>{place.title}</strong>
                      <span>{place.category}</span>
                    </div>
                    <button
                      type="button"
                      className="travel-tool-text-button"
                      onClick={() => onRemoveFromTrip(place.id)}
                    >
                      Remove
                    </button>
                  </article>
                ))}

                {itinerary.length === 0 && (
                  <p>You haven't saved any places yet.</p>
                )}

                <label className="travel-tool-label" htmlFor="add-trip-place">
                  Add a destination
                </label>
                <select
                  id="add-trip-place"
                  value={selectedPlace}
                  onChange={(event) => setSelectedPlace(event.target.value)}
                >
                  <option value="">Choose a destination</option>
                  {allPlaces
                    .filter(
                      (place) =>
                        !itinerary.some((saved) => saved.id === place.id)
                    )
                    .map((place) => (
                      <option key={place.id} value={String(place.id)}>
                        {place.title}
                      </option>
                    ))}
                </select>

                <button
                  type="button"
                  className="travel-tool-primary"
                  disabled={!chosenPlace}
                  onClick={() => {
                    if (chosenPlace) onAddToTrip(chosenPlace);
                    setSelectedPlace("");
                  }}
                >
                  + Add to itinerary
                </button>
              </div>
            ) : (
              <p>
                Search for destinations above and add your favourites
                to My Trip to begin planning.
              </p>
            )}
          </div>
        )}

        {active === "journal" && (
          <div>
            <p className="eyebrow">MEMORIES & MOMENTS</p>
            <h3>Your travel journal</h3>

            <form className="travel-tool-form" onSubmit={addJournalEntry}>
              <label className="travel-tool-label" htmlFor="journal-title">
                Entry title
              </label>
              <input
                id="journal-title"
                value={journalTitle}
                onChange={(event) => setJournalTitle(event.target.value)}
                placeholder="A day worth remembering"
                required
              />

              <label className="travel-tool-label" htmlFor="journal-place">
                Destination (optional)
              </label>
              <select
                id="journal-place"
                value={journalPlace}
                onChange={(event) => setJournalPlace(event.target.value)}
              >
                <option value="">No destination selected</option>
                {allPlaces.map((place) => (
                  <option key={place.id} value={place.title}>
                    {place.title}
                  </option>
                ))}
              </select>

              <label className="travel-tool-label" htmlFor="journal-text">
                Your notes
              </label>
              <textarea
                id="journal-text"
                rows={4}
                value={journalText}
                onChange={(event) => setJournalText(event.target.value)}
                placeholder="Write down the little things you want to remember..."
                required
              />

              <button className="travel-tool-primary" type="submit">
                Save journal entry
              </button>
            </form>

            <div className="travel-tool-list">
              {journal.map((entry) => (
                <article className="travel-journal-entry" key={entry.id}>
                  <div className="travel-journal-meta">
                    {entry.place || "Personal note"} · {entry.date}
                  </div>
                  <h4>{entry.title}</h4>
                  <p>{entry.text}</p>
                  <button
                    className="travel-tool-text-button"
                    type="button"
                    onClick={() =>
                      setJournal((current) =>
                        current.filter((item) => item.id !== entry.id)
                      )
                    }
                  >
                    Delete entry
                  </button>
                </article>
              ))}
              {journal.length === 0 && (
                <p>Your first journal entry can start right here.</p>
              )}
            </div>
          </div>
        )}

        {active === "season" && (
          <div>
            <p className="eyebrow">A LITTLE SEASONAL INSPIRATION</p>
            <h3>When should you go?</h3>
            <p className="travel-tool-help">
              Choose a saved or discovered destination for general
              planning guidance. Ideal months depend on the exact location.
            </p>

            <label className="travel-tool-label" htmlFor="season-place">
              Choose a destination
            </label>
            <select
              id="season-place"
              value={selectedPlace}
              onChange={(event) => setSelectedPlace(event.target.value)}
            >
              <option value="">Choose a destination</option>
              {allPlaces.map((place) => (
                <option key={place.id} value={String(place.id)}>
                  {place.title}
                </option>
              ))}
            </select>

            {chosenPlace ? (
              <div className="travel-season-note">
                <span className="travel-tool-icon">☼</span>
                <h4>Planning a visit to {chosenPlace.title}</h4>
                <p>
                  Before choosing dates, check the destination's local
                  climate, rainy season, public holidays, and any seasonal
                  closures. Weather patterns can vary significantly within
                  the same country.
                </p>
                <a href={chosenPlace.url} target="_blank" rel="noreferrer">
                  Read destination information ↗
                </a>
              </div>
            ) : (
              <p>
                Select a destination to see your planning notes.
              </p>
            )}
          </div>
        )}

        {active === "budget" && (
          <div>
            <p className="eyebrow">YOUR TRIP, YOUR BUDGET</p>
            <h3>Plan your spending</h3>

            <label className="travel-tool-label" htmlFor="budget-limit">
              Total planned budget (₹)
            </label>
            <input
              id="budget-limit"
              type="number"
              min="0"
              value={budget.limit}
              onChange={(event) =>
                setBudget((current) => ({
                  ...current,
                  limit: event.target.value,
                }))
              }
            />

            <div className="travel-budget-summary">
              <div>
                <span>Estimated expenses</span>
                <strong>₹{totalSpent.toLocaleString("en-IN")}</strong>
              </div>
              <div>
                <span>Budget remaining</span>
                <strong>
                  ₹{(
                    Number(budget.limit || 0) - totalSpent
                  ).toLocaleString("en-IN")}
                </strong>
              </div>
            </div>

            <div className="travel-budget-track">
              <span
                style={{
                  width: `${
                    Number(budget.limit) > 0
                      ? Math.min(
                          100,
                          (totalSpent / Number(budget.limit)) * 100
                        )
                      : totalSpent > 0
                        ? 100
                        : 0
                  }%`,
                }}
              />
            </div>

            <form className="travel-tool-form" onSubmit={addExpense}>
              <label className="travel-tool-label" htmlFor="expense-name">
                Expense name
              </label>
              <input
                id="expense-name"
                value={expenseName}
                onChange={(event) => setExpenseName(event.target.value)}
                placeholder="Transport, food, activities..."
                required
              />

              <label className="travel-tool-label" htmlFor="expense-amount">
                Estimated amount (₹)
              </label>
              <input
                id="expense-amount"
                type="number"
                min="1"
                value={expenseAmount}
                onChange={(event) => setExpenseAmount(event.target.value)}
                placeholder="500"
                required
              />

              <button className="travel-tool-primary" type="submit">
                + Add expense
              </button>
            </form>

            <div className="travel-tool-list">
              {budget.expenses.map((expense) => (
                <article className="travel-tool-row" key={expense.id}>
                  <div className="travel-tool-row-content">
                    <strong>{expense.name}</strong>
                  </div>
                  <strong>
                    ₹{expense.amount.toLocaleString("en-IN")}
                  </strong>
                  <button
                    className="travel-tool-text-button"
                    type="button"
                    onClick={() =>
                      setBudget((current) => ({
                        ...current,
                        expenses: current.expenses.filter(
                          (item) => item.id !== expense.id
                        ),
                      }))
                    }
                  >
                    Remove
                  </button>
                </article>
              ))}
            </div>
            <p className="travel-tool-help">
              These are your own estimates, not live travel prices.
            </p>
          </div>
        )}

        {active === "compare" && (
          <div>
            <p className="eyebrow">TWO PLACES, ONE DECISION</p>
            <h3>Compare destinations</h3>

            <div className="travel-compare-selects">
              <div>
                <label className="travel-tool-label" htmlFor="compare-one">
                  First destination
                </label>
                <select
                  id="compare-one"
                  value={firstPlace}
                  onChange={(event) => setFirstPlace(event.target.value)}
                >
                  <option value="">Choose a place</option>
                  {allPlaces.map((place) => (
                    <option key={place.id} value={String(place.id)}>
                      {place.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="travel-tool-label" htmlFor="compare-two">
                  Second destination
                </label>
                <select
                  id="compare-two"
                  value={secondPlace}
                  onChange={(event) => setSecondPlace(event.target.value)}
                >
                  <option value="">Choose a place</option>
                  {allPlaces.map((place) => (
                    <option key={place.id} value={String(place.id)}>
                      {place.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {comparisonA && comparisonB && comparisonA.id !== comparisonB.id ? (
              <div className="travel-comparison-grid">
                {[comparisonA, comparisonB].map((place) => (
                  <article className="travel-comparison-card" key={place.id}>
                    {place.image && (
                      <img src={place.image} alt={place.title} loading="lazy" />
                    )}
                    <p className="eyebrow">{place.category}</p>
                    <h4>{place.title}</h4>
                    <p>{place.description}</p>
                    <a href={place.url} target="_blank" rel="noreferrer">
                      Read more ↗
                    </a>
                  </article>
                ))}
              </div>
            ) : (
              <p className="travel-tool-help">
                Choose two different destinations to compare their
                available information.
              </p>
            )}
          </div>
        )}

        {active === "packing" && (
          <div>
            <p className="eyebrow">DON'T FORGET THE LITTLE THINGS</p>
            <h3>Your packing checklist</h3>

            <div className="travel-packing-progress">
              {packing.filter((item) => item.checked).length} of{" "}
              {packing.length} items packed
            </div>

            <div className="travel-packing-list">
              {packing.map((item) => (
                <label className="travel-packing-item" key={item.id}>
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() =>
                      setPacking((current) =>
                        current.map((entry) =>
                          entry.id === item.id
                            ? { ...entry, checked: !entry.checked }
                            : entry
                        )
                      )
                    }
                  />
                  <span className={item.checked ? "is-checked" : ""}>
                    {item.text}
                  </span>
                  <button
                    type="button"
                    className="travel-tool-text-button"
                    onClick={(event) => {
                      event.preventDefault();
                      setPacking((current) =>
                        current.filter((entry) => entry.id !== item.id)
                      );
                    }}
                  >
                    Remove
                  </button>
                </label>
              ))}
            </div>

            <form className="travel-tool-form" onSubmit={addPackingItem}>
              <label className="travel-tool-label" htmlFor="new-packing">
                Add your own item
              </label>
              <input
                id="new-packing"
                value={newPacking}
                onChange={(event) => setNewPacking(event.target.value)}
                placeholder="Something you don't want to forget"
                required
              />
              <button className="travel-tool-primary" type="submit">
                + Add to checklist
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}

export default TravelTools;
