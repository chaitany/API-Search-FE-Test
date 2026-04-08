# iTunes Search Web Client

The frontend user interface for the iTunes Search application. Built for extreme speed and smooth UX using React 19, Vite, and Redux Toolkit.

## Core Features

* **Instant Search Layout:** Employs transient styled-component props to smoothly transition the layout from a centered landing state to a locked, frosted-glass header state upon searching.
* **Client-Side Slicing:** Instead of relying on slow API pagination, the app fetches 200 records into memory and uses a custom, strictly-typed `useIntersectionObserver` hook (using the Callback Ref pattern) to instantly paint 10 new DOM nodes as the user scrolls.
* **Strict Redux Typing:** The entire state tree is strongly typed, ensuring no anomalous data can break the UI layer.

## Getting Started

### Prerequisites
* Node.js (v18 or higher)
* The backend proxy server must be running on port `8080`.

### Installation
```bash
npm install
```

### Available Scripts

**Start Development Server:**
Starts the Vite dev server with Hot Module Replacement (HMR).
```bash
npm run dev
```

**Run Tests:**
Executes the Vitest suite. Tests include custom hook isolation testing, React Testing Library UI assertions, and mocked Redux stores using `Partial<RootState>`.
```bash
npm test
```

**Production Build:**
Compiles the application via TypeScript and bundles it with Vite.
```bash
npm run build
```

## Testing Architecture

This project uses **Vitest** as a modern, high-speed replacement for Jest. 

* **UI Components:** Tested with `@testing-library/react`.
* **State Management:** Tests instantiate real RTK stores using `configureStore` and inject strictly-typed `preloadedState` rather than relying on legacy mock-store libraries. 
* **DOM APIs:** Global browser APIs (like `IntersectionObserver`) are mocked directly in the test setup files using `vi.fn()`.
