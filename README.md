# TripWise — Travel Discovery Website

TripWise is a responsive travel discovery website built to help users explore destinations, search for places, filter and sort results, view destination details, and save places to a personal trip list.

The project was developed as part of the AWS Student Builder Group recruitment task at VIT Chennai.

## Features

- **Destination discovery:** Browse destination information retrieved from an external API.
- **Search:** Search for places by name or keyword.
- **Category filters:** Filter destinations by Nature, Culture, Attractions, and Architecture.
- **Sorting:** Sort destinations alphabetically or by category.
- **Destination details:** View descriptions, images when available, and links to further information.
- **Personal itinerary:** Add destinations to My Trip and remove them when needed.
- **Persistent storage:** Saved destinations remain available after refreshing the browser.
- **Responsive interface:** Designed to work across desktop and mobile screen sizes.
- **User feedback:** Loading indicators, error messages, and empty search states help users understand what is happening.

## Technology Stack

- React
- JavaScript (JSX)
- Vite
- CSS
- Browser Local Storage
- Wikipedia API

## API Integration

TripWise currently uses the Wikipedia API to retrieve destination-related article information, descriptions, and available thumbnail images.

The application uses the retrieved information to display destination cards and provide additional details.

**Note:** Wikipedia is a general information source rather than a dedicated travel places API. Destination categories are assigned using keyword-based classification. The integration may be refined in a future version to use a specialised points-of-interest API.

## Run Locally

### Prerequisites

- Node.js
- npm
- Git (optional, for version control)

### Installation

1. Clone or download the project repository.
2. Open a terminal in the project folder.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL printed in the terminal, usually `http://localhost:5173`.

## Project Structure

```text
tripwise-build/
├── public/
├── src/
│   ├── components/
│   │   ├── DestinationCard.jsx
│   │   ├── DestinationDetails.jsx
│   │   ├── ErrorState.jsx
│   │   ├── FilterBar.jsx
│   │   ├── LoadingState.jsx
│   │   ├── Navbar.jsx
│   │   └── SearchBar.jsx
│   ├── services/
│   │   └── destinationApi.js
│   ├── styles/
│   │   └── global.css
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── index.html
├── package.json
└── README.md
```

## Testing

The following functionality has been manually checked in the development environment:

- Destination search
- Category filtering
- Sorting
- Adding destinations to My Trip
- Saving the itinerary across page refreshes
- Removing saved destinations
- Empty search results
- API error handling

Responsive layouts and the deployed application should also be checked before final submission.

## Future Improvements

- Integrate a dedicated travel points-of-interest API.
- Improve destination categorisation and location-based discovery.
- Add richer destination information where supported by the data provider.
- Continue refining accessibility and mobile usability.

## Credits

Destination information and available article thumbnails are retrieved through the Wikipedia API.
done