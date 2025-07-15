const apiKey = "4edfe651";
const movieTitle = document.getElementById("movie-input");
const form = document.getElementById("form");
const movieContainer = document.getElementById("movie-container");
const watchListContainer = document.getElementById("watchlist-container");

function renderMovie(e) {
  e.preventDefault();
  let titleInput = movieTitle.value.trim();

  fetch(`https://www.omdbapi.com/?t=${titleInput}&plot=full&apikey=${apiKey}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.Response === "False") {
        movieContainer.innerHTML = `<p>${data.Error}</p>`;
        return;
      }
      let renderHtml = `
      <div class="movie-box"> 
      <img src="${data.Poster}" alt="A poster of ${data.Title}"/>
      <div class="movie-content">
        <div class="movie-heading">
         <h1>${data.Title}</h1>
         <i class="fa-solid fa-star"></i>
         <span>${data.Ratings?.[0]?.Value || "No rating available"}</span>
        </div >
         <span class="movie-genre">
          <p>${data.Runtime}</p>
          <p>${data.Genre}</p>
        <button id="add-button"><i class="fa-solid fa-plus"></i>Watchlist</button>
         </span>
        <p class="plot">${data.Plot}</p>
      </div>
      </div>
      `;

      console.log(data);
      movieContainer.innerHTML = renderHtml;

      // Add to watch list
      const addToWatchlist = document.getElementById("add-button");

      if (addToWatchlist) {
        addToWatchlist.addEventListener("click", () => {
          // Watchlist Array
          let watchList = JSON.parse(localStorage.getItem("watchList")) || [];
          // To check if movie has been already added
          const alreadyAdded = watchList.some(
            (movie) => movie.imdbID === data.imdbID
          );

          if (!alreadyAdded) {
            watchList.push(data);
            localStorage.setItem("watchlist", JSON.stringify(watchList));
            console.log("Movie has been added to watchlist!");
          } else {
            console.log("Don't bother, movie already in watchlist!");
          }
        });
      }
    })
    .catch((error) => console.error(`The error: ${error}`));
}

form.addEventListener("submit", renderMovie);

document.getElementById("add-button").addEventListener("click", () => {
  console.log("added to watchlist");
});
