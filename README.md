# Posts Table Assignment

A simple Next.js application that fetches posts from JSONPlaceholder and displays them in a filterable, paginated table.

## Features

- Fetches posts from `https://jsonplaceholder.typicode.com/posts`
- Displays post ID, user ID, title, and body in a responsive table
- Supports filtering by user ID, post ID, title, and body
- Applies filters on submit and resets pagination to the first page
- Includes loading, empty, and error states
- Uses TailwindCSS for styling
- Includes focused tests for API query and pagination utilities

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
- Page numbers are rendered because the dataset is small and easy to navigate directly.
