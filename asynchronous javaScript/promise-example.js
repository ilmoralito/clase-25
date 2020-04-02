const root = document.querySelector("#root");
const baseurl = "https://ghibliapi.herokuapp.com";

function fetchFilms() {
  root.textContent = "Loading...";

  fetch(`${baseurl}/films`)
    .then(response => response.json())
    .then(films => {
      root.textContent = "";

      onComplete(films);
    })
    .catch(error => console.error(error.message));
}

function onComplete(films) {
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");
  const title = document.createElement("th");
  const director = document.createElement("th");
  const producer = document.createElement("th");
  const releaseDate = document.createElement("th");
  const score = document.createElement("th");
  const description = document.createElement("th");

  title.textContent = "Title";
  director.textContent = "Director";
  producer.textContent = "Producer";
  releaseDate.textContent = "Release date";
  score.textContent = "Score";
  description.textContent = "Description";

  // append th
  thead.append(title);
  thead.append(director);
  thead.append(producer);
  thead.append(releaseDate);
  thead.append(score);
  thead.append(description);

  // append rows
  for (const film of films) {
    const tr = document.createElement("tr");

    const tdTitle = document.createElement("td");
    const tdDirector = document.createElement("td");
    const tdProducer = document.createElement("td");
    const tdReleaseDate = document.createElement("td");
    const tdScore = document.createElement("td");
    const tdDescription = document.createElement("td");

    tdTitle.textContent = film.title;
    tdDirector.textContent = film.director;
    tdProducer.textContent = film.producer;
    tdReleaseDate.textContent = film.release_date;
    tdScore.textContent = film.rt_score;
    tdDescription.textContent = film.description;

    tr.append(tdTitle);
    tr.append(tdDirector);
    tr.append(tdProducer);
    tr.append(tdReleaseDate);
    tr.append(tdScore);
    tr.append(tdDescription);

    tbody.append(tr);
  }

  // append table
  table.append(thead);
  table.append(tbody);

  // append table to root
  root.append(table);
}

fetchFilms();
