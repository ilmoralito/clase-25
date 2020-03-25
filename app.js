const button = document.querySelector("button");

function hi() {
  alert("Hello");
}

button.addEventListener("click", hi);
button.addEventListener("click", () => alert("Hi!"));

// li example
// de aqui en adelante

const nodes = document.querySelectorAll("li");

for (const node of nodes) {
  node.addEventListener("click", event => {
    const target = event.target;
    const id = target.dataset.id;
    const title = target.dataset.title;
    const country = target.dataset.country;

    console.log(id, title, country);

    alert(`La pelicula ${title} es de ${country} y tiene id ${id}`);
  });
}
