const apiKey = "4edfe651";
const movieTitle = document.getElementById("movie-input");
const form = document.getElementById("form");
const movieContainer = document.getElementById("movie-container");
const watchlistContainer = document.getElementById("watchlist-container");
// Watchlist
let watchList = JSON.parse(localStorage.getItem("watchlist")) || [];

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
        <button class="add-button"><i class="fa-solid fa-plus"></i>Watchlist</button>
         </span>
        <p class="plot">${data.Plot}</p>
      </div>
      </div>
      `;

      console.log(data);
      movieContainer.innerHTML = renderHtml;

      // Add to watch list
      // const addToWatchlist = document.getElementById("add-button");
      const addToWatchlist = document.querySelectorAll(".add-button");

      if (addToWatchlist) {
        addToWatchlist.forEach((button) => {
          button.addEventListener("click", () => {
            // To check if movie has been already added
            const alreadyAdded = watchList.some(
              (movie) => movie.imdbID === data.imdbID
            );

            if (!alreadyAdded) {
              watchList.push(data);
              localStorage.setItem("watchlist", JSON.stringify(watchList));
              // Sweet2Alert
              Swal.fire({
                toast: true,
                position: "top-end",
                icon: "success",
                title: "Movie added to your watchlist!",
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
              });
            } else {
              // Sweet2Alert
              Swal.fire({
                toast: true,
                position: "top-end",
                icon: "info",
                title: "Already in watchlist",
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
              });
            }
          });
        });
      }
    })
    .catch((error) => console.error(`The error: ${error}`));
}

if (form) {
  form.addEventListener("submit", renderMovie);
}

// Watchlist Render
if (watchlistContainer) {
  renderWatchlist();
}

function renderWatchlist() {
  if (watchlistContainer) {
    console.log(watchList);

    if (watchList.length === 0) {
      watchlistContainer.innerHTML = `
        <p>Your watchlist is looking a little empty...</p>
        <a href="index.html">
          <i class="fa-solid fa-plus"></i>Let’s add some movies!
        </a>
      `;
    } else {
      const watchContainer = watchList
        .map(
          (movie, index) => `
            <div class="movie-box"> 
              <img src="${movie.Poster}" alt="A poster of ${movie.Title}"/>
              <div class="movie-content">
                <div class="movie-heading">
                  <h1>${movie.Title}</h1>
                  <i class="fa-solid fa-star"></i>
                  <span>${
                    movie.Ratings?.[0]?.Value || "No rating available"
                  }</span>
                </div>
                <span class="movie-genre">
                  <p>${movie.Runtime}</p>
                  <p>${movie.Genre}</p>
                  <button class="remove-btn" data-index="${index}">
                    <i class="fa-solid fa-minus"></i>Remove
                  </button>
                </span>
                <p class="plot">${movie.Plot}</p>
              </div>
            </div>
          `
        )
        .join("");

      watchlistContainer.innerHTML = watchContainer;

      // Add event listener to each remove button
      const removeBtns = document.querySelectorAll(".remove-btn");

      removeBtns.forEach((button) => {
        button.addEventListener("click", () => {
          const index = button.dataset.index;
          watchList.splice(index, 1);
          localStorage.setItem("watchlist", JSON.stringify(watchList));

          // Show alert
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "warning",
            title: "Removed from watchlist",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
          });

          // Re-render the updated list
          renderWatchlist();
        });
      });
    }
  }
}
