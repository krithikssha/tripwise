# ✈️ TripWise — Your Little Guide to the World

> Discover new places, collect travel inspiration, and turn your next adventure into a plan.

**Live Website:** https://tripwiseyours.netlify.app  
**GitHub Repository:** https://github.com/krithikssha/tripwise  
**Chosen Track:** Track 1 — Frontend Development

---

## 🌍 Project Overview

TripWise is a travel discovery and planning website designed to help users explore destinations, save places they want to visit, and organize their travel ideas in one place.

The website combines a destination explorer with practical planning tools in a clean, interactive interface inspired by travel journals and scrapbooks.

Users can search for destinations, filter and sort results, view destination details, save places to their trip, and use additional tools to organize their travel plans.

## ✨ Features

### 1. Destination Explorer
- Browse travel destinations and attractions.
- Search for destinations by name or keyword.
- Filter destinations by category.
- Sort destinations alphabetically or by category.
- View destination images, descriptions, and additional details.

### 2. Destination Details
- Open an individual destination to explore its information.
- View its image, category, and description.
- Access the corresponding Wikipedia article.
- Add destinations to the saved itinerary.

### 3. My Trip
- Save destinations to a personal itinerary.
- View all saved destinations in one place.
- Remove destinations from the itinerary.
- Retain saved destinations using browser local storage.

### 4. Interactive Trip Builder
- Add destinations to a trip plan.
- Review destinations selected for the trip.
- Remove destinations that are no longer needed.

### 5. My Travel Journal
- Create travel journal entries.
- Add a title, destination, and personal notes.
- Review and remove saved entries.
- Preserve entries using browser local storage.

### 6. Best Time to Visit
- Select a destination while planning a visit.
- View general seasonal planning guidance.
- Open destination information for further research.

*Note: Seasonal guidance is intended as general planning assistance, not a verified destination-specific weather forecast.*

### 7. Smart Trip Budget Planner
- Set a planned budget.
- Add and remove estimated expenses.
- View total recorded expenses and the remaining budget.
- Save budget information in the browser.

### 8. Compare Destinations
- Select two destinations.
- Compare their available images, categories, and descriptions.
- Open destination articles to learn more.

### 9. Personalised Packing Checklist
- View suggested packing items.
- Add custom checklist items.
- Mark items as completed.
- Save checklist changes in the browser.

### 10. AI Travel Assistant
- Enter travel preferences and planning requests.
- Receive AI-generated travel suggestions through the configured backend function.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| React | Building reusable UI components |
| JavaScript (ES6+) | Application logic and interactions |
| Vite | Development server and production build |
| HTML5 | Website structure |
| CSS3 | Styling, layouts, and responsive design |
| Wikipedia API | Retrieving destination information |
| Google Gemini API | AI-powered travel assistance |
| Netlify Functions | Server-side handling of AI requests |
| Browser Local Storage | Saving itinerary and planning data |
| Git and GitHub | Version control and source code hosting |
| Netlify | Website deployment |

## 🔌 API Details

### Wikipedia API

TripWise uses the Wikipedia API to retrieve destination information, including available descriptions, images, article links, and categories.

- **API endpoint:** `https://en.wikipedia.org/w/api.php`
- **Purpose:** Destination search and information retrieval.
- **Integration:** Implemented in `src/services/destinationApi.js`.

The application uses Wikipedia's search and page information to populate the destination explorer.

### Google Gemini API

The AI travel assistant sends user preferences to a Netlify serverless function.

- **Function endpoint:** `/.netlify/functions/travel-assistant`
- **Purpose:** Generate AI-powered travel suggestions.
- **Function source:** `netlify/functions/travel-assistant.mjs`
- **Model configured:** `gemini-3.8-flash`

The serverless function communicates with the Gemini API, keeping the API credential on the server side rather than exposing it in frontend JavaScript.

**Security:** Configure the required Gemini API credential through Netlify environment variables. Never commit API keys or other private credentials to GitHub.

## 💾 Data Storage

TripWise uses browser Local Storage for its locally saved planning data.

The stored information includes:
- Saved trip itinerary
- Travel journal entries
- Budget and expense information
- Packing checklist items

This approach allows saved information to persist across browser refreshes on the same browser and origin.

**Limitation:** Local Storage is browser-specific. The application does not currently provide cloud synchronization or a shared server-side database for these records.

## 🚀 Installation and Setup

### Prerequisites

Install the following before running the project:

- Node.js
- npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/krithikssha/tripwise.git
cd tripwise
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the frontend locally

```bash
npm run dev
```

Open the local URL printed in the terminal, usually:

```text
http://localhost:5173
```

### 4. Run the production build

```bash
npm run build
```

Vite generates the production build in the `dist` directory.

### 5. Preview the production build

```bash
npm run preview
```

Open the preview URL printed in the terminal.

## 🔐 Environment Configuration

The AI travel assistant requires a Gemini API key configured for the Netlify serverless function.

For local development, use the Netlify CLI so the frontend can call the serverless function:

```bash
npm install
npm install --save-dev netlify-cli
npx netlify dev
```

Configure the required environment variable in a local `.env` file or through the Netlify CLI's supported environment configuration.

Use the **exact variable name read by** `netlify/functions/travel-assistant.mjs`. Do not guess the name or commit the value.

For deployment, add the same variable name and its secret value in the Netlify site's environment variable settings.

Keep local environment files containing secrets out of Git using `.gitignore`.

## 📁 Project Structure

```text
tripwise/
├── netlify/
│   └── functions/
│       └── travel-assistant.mjs
├── public/
├── src/
│   ├── components/
│   │   ├── DestinationCard.jsx
│   │   ├── DestinationDetails.jsx
│   │   ├── ErrorState.jsx
│   │   ├── FilterBar.jsx
│   │   ├── LoadingState.jsx
│   │   ├── Navbar.jsx
│   │   ├── SearchBar.jsx
│   │   ├── TravelAssistant.jsx
│   │   └── TravelTools.jsx
│   ├── services/
│   │   └── destinationApi.js
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── index.html
├── package.json
├── netlify.toml
└── README.md
```

*The structure above highlights the main application files. Keep it aligned with the actual files in the final repository.*

## 📱 Responsive Design

TripWise is designed to provide an accessible travel-planning experience across desktop and smaller screens. The final submission includes desktop and mobile screenshots to demonstrate the interface and its key states.

## 🧪 Testing

The production build was checked using:

```bash
npm run build
```

The project compiled successfully with Vite.

Key areas to test before submission:
- Destination search and filtering
- Sorting and destination details
- Adding and removing itinerary items
- Journal entry persistence
- Budget calculations
- Destination comparison
- Packing checklist persistence
- AI assistant responses
- Layout on desktop and mobile screens

## 🔒 Security Considerations

- Do not store API keys in frontend source code.
- Do not commit `.env` files containing secrets.
- Use environment variables for server-side credentials.
- Do not include passwords or other private credentials in the public repository.

## 📸 Submission Screenshots

The submission PDF should include screenshots of the major views and key application states:

1. Homepage and destination explorer
2. Destination search and filter results
3. Destination Details view
4. My Trip with a populated itinerary
5. My Trip empty state
6. Interactive Trip Builder
7. My Travel Journal
8. Best Time to Visit
9. Budget Planner
10. Compare Destinations
11. Packing Checklist
12. AI Travel Assistant
13. Mobile homepage and destination explorer
14. Mobile destination details and My Trip views

Include additional screenshots where necessary to demonstrate important interactions.

**Required PDF filename:** `<REGISTER_NUMBER>_frontend.pdf`

Replace `<REGISTER_NUMBER>` with your actual registration number and use the filename format specified by the recruitment instructions.

## 🔮 Future Improvements

- Add destination-specific seasonal recommendations backed by reliable data.
- Introduce drag-and-drop itinerary ordering.
- Improve budget planning with destination-specific cost estimates.
- Add richer travel notes and itinerary organization.
- Improve accessibility and responsive interactions.

## 👩‍💻 Author

Developed as part of the AWS Student Builder Group recruitment task.

**Track:** Frontend Development

---

*TripWise — Discover. Plan. Wander.*
