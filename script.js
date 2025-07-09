const apiKey = "4edfe651";

document.getElementById("check-api").addEventListener("click", function () {
  console.log("Hello");

  fetch(`https://www.omdbapi.com/?t=Inception&apikey=${apiKey}&type=movie`)
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(`The error: ${error}`));
});
