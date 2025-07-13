const apiKey = "4edfe651";
const movieTitle = document.getElementById("movie-input");
const form = document.getElementById("form");
const movieContainer = document.getElementById("movie-container");

function renderMovie(e) {
  e.preventDefault();
  let titleInput = movieTitle.value.trim();

  fetch(`https://www.omdbapi.com/?t=${titleInput}&apikey=${apiKey}`)
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
        <div>
         <h1>${data.Title}</h1>
         <span>${data.Ratings[0].Value || "No rating available"}</span>
        </div>
         <span>
          <p>${data.Runtime}</p>
          <p>${data.Genre}</p>
        <button><i class="fa-solid fa-plus"></i>Watchlist</button>
         </span>
        <p>${data.Plot}</p>mo
      </div>
      </div>
      `;

      console.log(data);
      movieContainer.innerHTML = renderHtml;
    })
    .catch((error) => console.error(`The error: ${error}`));
}

form.addEventListener("submit", renderMovie);
