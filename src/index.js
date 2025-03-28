document.addEventListener("DOMContentLoaded", () => {
  //DOM Tree initialized...
  //variables declaration for input elements
  const searchButton = document.getElementById("findBtn");
  const userEntry = document.getElementById("userEntry");
  const resultDiv = document.getElementById("results");
  const favoritesDiv = document.getElementById("favorites");

  //set empty array for favorites
  let favoriteAnime = [];
  const localServer = "http://localhost:3000";

  //console.log("working 1"):Displays in console...
  //add event listener for search button
  searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    fetchAnime();
  });
  //add event listener for search input area
  userEntry.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      fetchAnime();
    }
  });
  //set an async/await function to fetch data from JIKEN API
  async function fetchAnime() {
    try {
      const userInput = document
        .getElementById("userEntry")
        .value.toLowerCase();
      const response = await fetch(
        `https://api.jikan.moe/v4/anime?q=${userInput}`
      );
      //this calls a search from the link
      if (!response.ok) {
        throw new Error("Anime not found"); //to display the error
      }
      //the response from the server will be declared as variable called data and converted to JSON format
      const data = await response.json();

      //call data into a function;
      const animelist = data.data; //anime data is in the data object so is chained
      displayAnime(data.data);
    } catch (error) {
      console.error(error);
      resultDiv.innerHTML = `<p>Failed to fetch anime. Try again later</p>`;
    }
    //console.log('working 2'):No display in console/browser
  }
  //declaring async/await functions to append db.json
  async function saveFavesToDb(anime) {
    try {
      const response = await fetch(`${localServer}/favorites`, {
          method: "POST",
          headers:{"Content-Type":"application/json",},
        body: JSON.stringify(anime),
      });
      if (response.ok) {
        displayFavorites();
      } else {
        console.log("Failed to load!");
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function loadFavesFromDb() {
    try {
      const response = await fetch(`${localStorage}/favorites`);
      if (response.ok) {
          const data = await response.json();
          favoriteAnime = data;
        displayFavorites();
      } else {
        console.error("Failed to load local favorited");
      }
    } catch (error) {}
  }
  async function deleteAnimeFromDb(animeId) {
    try {
      const response = await fetch(`${localStorage}/favorites/${animeId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        favoriteAnime = favoriteAnime.filter((fav) => fav.mal_id !== animeId);
        displayFavorites();
      } else {
        console.error("Failed to delete local favorite");
      }
    } catch (error) {
      console.error(error);
    }
  }

  //Render fetched anime into search resuly div
  function displayAnime(animelist) {
    resultDiv.innerHTML = `<h2>Search Results</h2>`; //replaces previous results with the heading when refreshed

    //Add Error catchpoint using conditional statements
    if (!animelist || animelist.length === 0) {
      resultDiv.innerHTML = `No anime found matching your search!`;
      return;
    }

    animelist.forEach((anime) => {
      //create tile constants
      const animeCard = document.createElement("div"); //creates container div
      animeCard.classList.add("anime-card");

      const title = document.createElement("h3"); //shows heading display
      title.textContent = anime.title;

      const image = document.createElement("img"); //creates image tag
      image.src = anime.images?.jpg?.image_url || "placeholder_image_url.png"; //sets placeholder if image is not found
      image.alt = anime.title;

      const addButton = document.createElement("button"); //button to add to favorites
      addButton.textContent = "Add to Favorites";
      addButton.addEventListener("click", (e) => {
        e.preventDefault();
        addToFavorites(anime);
      });

      //to append different elements together
      animeCard.appendChild(image);
      animeCard.appendChild(title);
      animeCard.appendChild(addButton);
      resultDiv.appendChild(animeCard); //combined elements into a single div
    });
  }

  function addToFavorites(anime) {
    //this function must not add repeated entries hence an if/else statement is in order
    if (!favoriteAnime.some((fav) => fav.mal_id === anime.mal_id)) {
      favoriteAnime.push(anime); //adds to the array
      displayFavorites();
      //saveFavoritesToLocalStorage();
    } else {
      alert(`${anime.title} is already in your favorites`);
    }
  }
  function displayFavorites() {
    favoritesDiv.innerHTML = "<h2>Favorites</h2>"; //this clears existing text

    //Div content should not be empty
    if (favoriteAnime.length === 0) {
      favoritesDiv.innerHTML = "<p>No favories added...yet (┬┬﹏┬┬)</p>";
      return;
    }
    //This part is similar to the above function to populate the results div, mostly only the variables change but the logic remains similar
    favoriteAnime.forEach((anime) => {
      const favoriteCard = document.createElement("div");
      favoriteCard.classList.add("favorite-card");

      const title = document.createElement("h3"); //shows heading display
      title.textContent = anime.title;

      const image = document.createElement("img"); //creates image tag
      image.src = anime.images?.jpg?.image_url || "placeholder_image_url.png"; //sets placeholder if image is not found
      image.alt = anime.title;

      //delete from faves button added
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Remove";
      deleteButton.addEventListener("click", (e) => {
        e.preventDefault();
        removeFromFavorites(anime.mal_id);
      });

      //patch all parts together
      favoriteCard.appendChild(image);
      favoriteCard.appendChild(title);
      favoriteCard.appendChild(deleteButton);
      favoritesDiv.appendChild(favoriteCard);
    });
  }

  //function to remove listing from favorites
  function removeFromFavorites(animeId) {
    favoriteAnime = favoriteAnime.filter((anime) => anime.mal_id !== animeId);
    displayFavorites();
    deleteAnimeFromDb(animeId);
    console.log("removed", animeId);
  }
    
    loadFavesFromDb();
});
