# iTunes Search BFF Proxy

This is the Node.js / Express backend for the iTunes Search application. It serves as a **Backend-For-Frontend (BFF)** proxy.

## Purpose

Directly querying the legacy iTunes API from a browser presents several issues: CORS restrictions, unpredictable payload shapes, and wasted bandwidth from unneeded data types. This proxy solves these issues by:
1. **Routing:** Safely proxying requests to bypass browser CORS policies.
2. **Data Cleansing:** The iTunes API occasionally ignores the `entity=song` flag. This proxy intercepts the response, strictly filters out podcasts, albums, and videos, and recalculates the totals.
3. **Payload Reduction:** By filtering the data *before* sending it over the network, it reduces the memory footprint for the client application.

## Getting Started

### Prerequisites
* Node.js (v18 or higher)

### Installation
```bash
npm install
```

### Running the Server
```bash
# Development mode (with hot-reloading)
npm run dev

# Production build & start
npm run build
npm start
```
The server will run on `http://localhost:8080` by default.

## API Documentation

### `GET /api/search`

Fetches and filters music tracks from the iTunes Search API.

**Query Parameters:**
* `term` (string, required): The search keyword (e.g., "The Beatles").
* `limit` (number, optional): Max results to fetch from Apple (default: 200).
* `media` (string, required): The media type (must be `music`).
* `entity` (string, required): The entity type (must be `song`).

**Response Shape:**
```json
{
  "resultCount": 50,
  "results": [
    {
      "wrapperType": "track",
      "kind": "song",
      "trackId": 12345,
      "artistName": "Artist Name",
      "trackName": "Song Name",
      "artworkUrl100": "https://..."
    }
  ]
}
```
