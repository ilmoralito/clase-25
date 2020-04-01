// CALLBACK
function task(name, age, callback) {
  setTimeout(() => {
    callback({ id: 1, name: name, age: age });
  }, 3000);

  console.log("Other tasks");
}

function callback(data) {
  const id = Date.now;
  const name = data.name;
  const age = data.age;

  const message = `${name} ${age} with id ${id}`;

  console.log(message);
}

// task("Leia", 45, callback);

// PROMISE
// pseudo codigo ejemplo promise
// fetch("url")
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(error => console.error(error.message));

// ASYNC AWAIT
async function fetchPokemons() {
  const response = await fetch("url");
  const pokemons = await response.json();

  return pokemons;
}

// Consumir funcion asincrona
fetchPokemons().then(pokemons => console.log(pokemons));
