const apiKey = "4edfe651";

document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();

  console.log("Hello");

  const movieTitleInput = document.getElementById("movie-input").value;
  console.log(movieTitleInput);

  fetch(`https://www.omdbapi.com/?t=${movieTitleInput}&apikey=${apiKey}`)
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(`The error: ${error}`));
});
 