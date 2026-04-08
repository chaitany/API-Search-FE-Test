# iTunes Search Application

A high-performance, modern web application that interfaces with the legacy iTunes Search API for songs, albums or artists. Built with React 19, Vite, and a Node/Express BFF (Backend-For-Frontend) proxy.

## Architectural Highlights

This project demonstrates frontend patterns and architectural decisions:

* **BFF (Backend-For-Frontend) Pattern:** An Express.js proxy server sits between the client and the iTunes API. It handles CORS, constructs precise network requests, strictly filters legacy data for music media, and reduces the payload size before it ever reaches the browser.
* **Client-Side Slicing (Virtual Pagination):** To bypass the iTunes API's lack of offset pagination, the app fetches a maximum chunk of 200 records upfront into Redux memory, and uses a custom `IntersectionObserver` to synchronously slice and paint 10 items to the DOM at a time. This guarantees infinite scrolling without network latency.
* **Glassmorphism UI:** A fully responsive UI utilizing Material-UI and Styled-Components, featuring dynamic layout transitions, frosted glass headers, and strict CSS-in-JS architecture.
* **Strict TypeScript:** End-to-end type safety, entirely eliminating `any` types by strictly typing the API payloads and Redux state trees.

## Tech Stack

**Frontend (`/client`)**
* React 19 & Vite
* Redux Toolkit (State Management)
* Material-UI & Styled-Components
* Vitest & React Testing Library

**Backend (`/server`)**
* Node.js & Express
* Axios (Network Requests)
* CORS

## Project Structure

```
itunes-search-app/
├── client/                 # React 19 SPA (Vite)
│   ├── src/
│   │   ├── components/     # UI Components & Tests
│   │   ├── hooks/          # Custom Hooks (e.g., useIntersectionObserver)
│   │   ├── store/          # Redux Toolkit Slices
│   │   └── types/          # Strict TypeScript Interfaces
│   └── package.json
├── server/                 # Node/Express BFF Proxy
│   ├── index.ts            # Proxy logic and data filtering
│   └── package.json
└── README.md
```

## Global Quick Start

*(Note: To run both servers concurrently from the root, ensure you have `concurrently` installed, or run them in separate terminal tabs).*

1. **Install dependencies:**
   Navigate into both directories and install:
   ```bash
   cd server && npm install
   cd ../client && npm install
   ```

2. **Start the Development Servers:**
   Terminal 1 (Backend):
   ```bash
   cd server
   npm run dev
   ```
   Terminal 2 (Frontend):
   ```bash
   cd client
   npm run dev
   ```

3. Open `http://localhost:3000` in your browser.
