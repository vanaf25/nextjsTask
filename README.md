# Posts Table Assignment

A simple Next.js application that fetches posts from JSONPlaceholder and displays them in a filterable, paginated table.

## Features

- Fetches posts from `https://jsonplaceholder.typicode.com/posts`
- Displays post ID, user ID, title, and body in a responsive table
- Supports filtering by user ID, post ID, title, and body
- Applies filters on submit and resets pagination to the first page
- Includes loading, empty, and error states
- Uses TailwindCSS with DaisyUI components for styling
- Includes focused tests for API query and pagination utilities

## Tech Stack

- Next.js App Router with React and TypeScript
- TailwindCSS as the primary styling framework
- DaisyUI for reusable UI primitives such as buttons, inputs, selects, tables, alerts, and skeleton states
- React Hook Form for filter form state and submission handling
- Zustand for posts, loading, error, and total count state
- Next.js routing APIs for URL query parameters
- Node.js test runner for focused utility tests

## Project Structure

```text
app/
  page.tsx          Main client page, data loading, URL query state
  globals.css       TailwindCSS and DaisyUI setup
components/
  FilterForm.tsx    Filter controls
  Pagination.tsx    Page navigation
  PostsTable.tsx    Posts table and loading/error/empty states
  ui/               Small reusable UI wrappers
stores/
  posts-store.ts    Zustand store for fetched posts state
types/
  posts.ts          Shared TypeScript types
utils/
  posts.ts          API URL, URL params, pagination, and parsing helpers
__tests__/
  posts-utils.test.mjs
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm test
```

## Notes And Assumptions

- Filtering is performed through JSONPlaceholder query parameters.
- Pagination is performed through `_page` and `_limit` query parameters with 10 posts per page.
- The filter form applies changes after the user submits it with the `Filter` button.
- The user filter maps to `userId`; the post ID filter maps to `id`.
- Title and body filters use `title_like` and `body_like` for partial matching.
- Filters and pagination are stored in the URL so the current view can be refreshed or shared.
- React Hook Form manages the filter draft values, while URL query parameters remain the source of truth for active filters and pagination.
- Zustand is used as a lightweight state layer for fetched posts and request status.
- Page numbers are rendered because the dataset is small and easy to navigate directly.

## Tests

Tests are focused on pure utility logic because these functions contain the main edge cases and are stable to test without extra browser tooling.
