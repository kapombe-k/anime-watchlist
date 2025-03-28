# Anime Watchlist Application

## Overview

This project is a simple web application that allows users to search for information about anime and maintain a list of their favorite titles. It leverages the Jikan API to fetch anime data and uses a local JSON server to persist the user's favorite anime.

## Key Functionality

In its most basic form, this application enables users to:

* **Search for Anime:** Users can input keywords into a search bar to find anime titles from the Jikan API.
* **View Search Results:** The application displays a list of anime matching the search query, including their title and an image.
* **Add to Favorites:** Users can add anime from the search results to their personal favorites list by clicking a "Favorite❤️" button.
* **View Favorites:** A dedicated section displays all the anime that the user has added to their favorites.
* **Remove from Favorites:** Users can remove anime from their favorites list by clicking a "REMOVE🗑️" button next to each favorite item.
* **Local Data Persistence:** The application uses a local `db.json` file (served by a JSON server) to store and retrieve the user's favorite anime, ensuring that the list persists across sessions.

## Technologies Used

* HTML
* CSS (with some styling potentially from Bootstrap)
* JavaScript
* [Jikan API](https://jikan.moe/) for fetching anime data.
* [json-server](https://github.com/typicode/json-server) for a simple local backend to store favorites.

## Setup Instructions

To run this project locally, follow these steps:

1.  **Clone the Repository:**
    ```bash
    git clone git@github.com:kapombe-k/anime-watchlist.git
    cd anime-watchlist
    ```
    *(Replace `[repository URL]` with the actual URL of your GitHub repository and `[repository name]` with the name of your project folder.)*

2.  **Install JSON Server (if you haven't already):**
    This project uses `json-server` to simulate a backend for storing favorites. If you don't have it installed globally, you can install it using npm:
    ```bash
    npm install -g json-server
    ```

3.  **Run the Backend:**
    Navigate to the root directory of your project in the terminal and start the JSON server, pointing it to the `db.json` file:
    Run
    `json-server --watch db.json --port 3000` or `npx json-server db.json --port 3000`


4.  **Open `index.html` in Your Browser:**
    Simply open the `index.html` file located in your project directory using your web browser.

## How to Use

1.  **Search for Anime:** Enter the name of an anime you are looking for in the search input field located on the page.
2.  **Initiate Search:** Click the "Search" button next to the input field or press the Enter key.
3.  **View Results:** The search results will be displayed in the "Results" section, showing the anime title and image.
4.  **Add to Favorites:** To add an anime to your favorites list, click the "Favorite❤️" button located on the anime card in the search results.
5.  **View Favorites:** Your added favorites will appear in the "Favorites" section on the page.
6.  **Remove from Favorites:** To remove an anime from your favorites list, click the "REMOVE🗑️" button next to the anime in the "Favorites" section.

## Potential Future Enhancements

* Implement user accounts for persistent favorite lists across different devices.
* Add more details to the anime cards (e.g., genre, year).
* Implement pagination or infinite scrolling for search results.
* Allow users to create and manage multiple watchlists.
* Improve the styling and user interface.

## Author

[Eugene Kapombe / kapombe-k]