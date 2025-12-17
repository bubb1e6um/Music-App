# Music App (Frontend)

## Description

This project is a frontend-only web application for listening to music directly in the browser.
The application uses the iTunes Search API as a source of audio content and metadata.
No backend services are involved; all logic is implemented on the client side.

The project is deployed using **GitHub Pages** and is intended as a demonstration of working with external APIs, browser audio playback, and core frontend technologies.

## Technologies Used

* HTML5
* CSS3
* JavaScript (Vanilla JS)
* iTunes Search API
* GitHub Pages (deployment)

## Features

* Search for music tracks using the iTunes API
* Display track information (title, artist, album artwork)
* Play audio previews directly in the browser
* Fully client-side implementation
* Responsive layout suitable for desktop and mobile browsers

## Project Structure

The project consists of static frontend files:

* `index.html` — main HTML entry point
* `css/` — stylesheets
* `js/` — JavaScript logic (API requests, playback control, UI interaction)
* `assets/` (if present) — static assets such as images or icons

No build tools or frameworks are required.

## How It Works

1. The user enters a search query.
2. The application sends a request to the iTunes Search API.
3. The API response is processed on the client side.
4. The results are rendered dynamically in the browser.
5. The user can play audio previews using the HTML5 Audio API.

## Deployment

The project is deployed via **GitHub Pages**.

To deploy manually:

1. Push the project to a GitHub repository.
2. Open repository settings.
3. Enable GitHub Pages and select the main branch as the source.
4. Access the site via the generated GitHub Pages URL.

## Running Locally

No installation is required.

To run the project locally:

1. Clone the repository.
2. Open `index.html` in any modern web browser.

Alternatively, you may use a local development server for better API behavior:

```bash
npx serve
```

## Limitations

* Uses iTunes preview URLs (not full tracks)
* Requires an active internet connection
* Depends on availability and limits of the iTunes Search API

## License

This project is provided for educational and demonstration purposes.

скажи — доработаю.
