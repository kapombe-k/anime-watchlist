document.addEventListener("DOMContentLoaded", () => {
    //DOM Tree initialized...
    //variables declaration for input elements
    const searchButton = document.getElementById('findBtn');
    const userEntry = document.getElementById('userEntry');
    const resultDiv = document.getElementById('results');
    const favoritesDiv = document.getElementById('favorites');
    //set empty array for favorites
    let favoriteAnime = [];

    //console.log("working 1"):Displays in console...

    //set an async/await function to fetch data from JIKEN API
    async function fetchAnime() {
        try {
            const userInput = document.getElementById('userEntry').value.toLowerCase();
            const response = await fetch(`https://api.jikan.moe/v4/anime?q=${userInput}`);
            //this calls a search from the link
            if (!response.ok) {
                throw new Error("Anime not found");//to display the error
            }
            //the response from the server will be declared as variable called data and converted to JSON format
            const data = await response.json();
            //call data into a function;
            displayAnime(data.data)//anime data is in the data object so is chained

        } catch (error) {
            console.error(error);
            resultDiv.innerHTML=`<p>Failed to fetch ${userInput}. Try again later</p>`
        }
        //console.log('working 2'):No display in console/browser
    }
    //Render fetched anime into section divs
    function displayAnime() {
        resultDiv.innerHTML = `<h2>Search Results</h2>`//replaces previous results with the heading when refreshed
      
        //Add Error catchpoint using conditional statements
        if (!animelist||animelist.length===0) {
            resultDiv.innerHTML = `No anime found matching your search!`;
            return;
        }
        
        animelist.forEach(anime => {
            //create tile constants
            const animeCard = document.createElement('div');//creates container div
            animeCard.classList.add('anime-card');

            const title = document.createElement('h3');//shows heading display
            title.textContent = anime.title;

            const image = document.createElement('img');//creates image tag
            image.src = anime.images?.jpg?.image_url || 'placeholder_image_url.png';//sets placeholder if image is not found
            image.alt = anime.title;

            const addButton = document.createElement('button');//button to add to favorites
            addButton.textContent = 'Add to Favorites';
            addButton.addEventListener('click', (e) => {
                e.preventDefault();
                addToFavorites(anime);
             });
        });

    };
});