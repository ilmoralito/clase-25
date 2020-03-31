const pokemonsNode = document.querySelector("#pokemons");
const pokemonNode = document.querySelector("#pokemon");

pokemonsNode.addEventListener("click", clickHandler);

function getPokemons() {
  pokemonsNode.textContent = "Is loading...";

  fetch("https://pokeapi.co/api/v2/pokemon/")
    .then(response => response.json())
    .then(data => {
      pokemonsNode.textContent = "";

      renderPokemons(data.results);
    })
    .catch(error => alert(error.message));
}

function renderPokemons(pokemons) {
  for (const pokemon of pokemons) {
    const p = document.createElement("p");
    const a = document.createElement("a");

    a.setAttribute("href", pokemon.url);
    a.textContent = pokemon.name;

    p.append(a);

    pokemonsNode.append(p);
  }
}

function fetchPokemon(url) {
  fetch(url)
    .then(response => response.json())
    .then(pokemon => renderPokemon(pokemon));
}

function renderPokemon(pokemon) {
  const name = pokemon.name;
  const sprites = pokemon.sprites;

  const h1 = document.createElement("h1");

  // name
  h1.textContent = name;

  // clean pokemon node content
  pokemonNode.innerHTML = "";

  // append content
  pokemonNode.append(h1);

  // sprites
  for (const key in sprites) {
    const img = document.createElement("img");
    const sprite = sprites[key];

    if (sprite) {
      img.setAttribute("src", sprite);
      pokemonNode.append(img);
    }
  }

  // types
  const typesTitle = getFeaturesTitle("Tipos");
  const types = getTypes(pokemon.types);

  // abilities
  const abilitiesTitle = getFeaturesTitle("Habilidades");
  const abilities = getFeatures(pokemon.abilities, "ability");

  // moves
  const movesTitle = getFeaturesTitle("Movimientos");
  const moves = getFeatures(pokemon.moves, "move");

  //   append types
  pokemonNode.append(typesTitle);
  pokemonNode.append(types);

  // append abilities
  pokemonNode.append(abilitiesTitle);
  pokemonNode.append(abilities);

  // append moves
  pokemonNode.append(movesTitle);
  pokemonNode.append(moves);
}

function getTypes(typeList) {
  const ul = document.createElement("ul");

  typeList.forEach(type => {
    const li = document.createElement("li");
    const anchor = document.createElement("a");

    anchor.setAttribute("href", type.type.url);

    anchor.textContent = type.type.name;

    li.append(anchor);

    ul.append(li);
  });

  return ul;
}

function getFeaturesTitle(label) {
  const h2 = document.createElement("h2");

  h2.textContent = label;

  return h2;
}

function getFeatures(features, key, label) {
  const ul = document.createElement("ul");

  for (const feature of features) {
    const li = document.createElement("li");

    li.textContent = feature[key].name;

    ul.append(li);
  }

  return ul;
}

function clickHandler(event) {
  const target = event.target;

  if (target.nodeName !== "A") {
    return false;
  }

  event.preventDefault();

  fetchPokemon(target.getAttribute("href"));
}

// initial function
getPokemons();
