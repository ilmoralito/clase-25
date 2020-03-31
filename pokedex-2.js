const pokemonsNode = document.querySelector("#pokemons");
const pokemonNode = document.querySelector("#pokemon");
const detailNode = document.querySelector("#detail");

pokemonsNode.addEventListener("click", clickHandler);

pokemonNode.addEventListener("click", pokemonHandler);

function fetchPokemons() {
  pokemonsNode.textContent = "Is loading...";

  fetch("https://pokeapi.co/api/v2/pokemon/")
    .then(response => response.json())
    .then(data => {
      pokemonsNode.textContent = "";

      renderPokemons(data.results);
    })
    .catch(error => alert(error.message));
}

function fetchPokemon(url) {
  fetch(url)
    .then(response => response.json())
    .then(pokemon => renderPokemon(pokemon));
}

function fetchPokemonDetail(url) {
  fetch(url)
    .then(response => response.json())
    .then(detail => renderDetail(detail))
    .catch(error => console.error(error.message));
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

function renderPokemon(pokemon) {
  const name = pokemon.name;
  const sprites = pokemon.sprites;

  const h1 = document.createElement("h1");

  // name
  h1.textContent = name;

  // clean pokemon node content
  pokemonNode.innerHTML = "";
  // clean pokemon detail node content
  detailNode.innerHTML = "";

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

function renderDetail(detail) {
  const {
    double_damage_from: doubleDamageFrom,
    double_damage_to: doubleDamageTo,
    half_damage_from: halfDamageFrom,
    half_damage_to: halfDamageTo,
    no_damage_from: noDamageFrom,
    no_damage_to: noDamageTo
  } = detail.damage_relations;

  // Clean node content
  detailNode.innerHTML = "";

  if (doubleDamageFrom.length) {
    // double damage from
    const doubleDamageFromTitle = getFeaturesTitle(
      "Recibe doble daño de tipos"
    );
    const doubleDamageFromNode = getDamagesTypes(doubleDamageFrom);

    // append double damage from
    detailNode.append(doubleDamageFromTitle);
    detailNode.append(doubleDamageFromNode);
  }

  if (doubleDamageTo.length) {
    // double damage to
    const doubleDamageToTitle = getFeaturesTitle("Hace doble daño a tipos");
    const doubleDamageToNode = getDamagesTypes(doubleDamageTo);

    // append double damage to
    detailNode.append(doubleDamageToTitle);
    detailNode.append(doubleDamageToNode);
  }

  if (halfDamageFrom.length) {
    // half damage from
    const halfDamageFromTitle = getFeaturesTitle(
      "Recibe mitad de daño de tipos"
    );
    const halfDamageFromNode = getDamagesTypes(halfDamageFrom);

    // append half damage from
    detailNode.append(halfDamageFromTitle);
    detailNode.append(halfDamageFromNode);
  }

  if (halfDamageTo.length) {
    // half damage to
    const halfDamageToTitle = getFeaturesTitle("Hace mitad de daño a tipos");
    const halfDamageToNode = getDamagesTypes(halfDamageTo);

    // append half damage to
    detailNode.append(halfDamageToTitle);
    detailNode.append(halfDamageToNode);
  }

  if (noDamageFrom.length) {
    // no demage from
    const noDamageFromTitle = getFeaturesTitle("No recibe  daño de tipos");
    const noDamageFromNode = getDamagesTypes(noDamageFrom);

    // append half damage to
    detailNode.append(noDamageFromTitle);
    detailNode.append(noDamageFromNode);
  }

  if (noDamageTo.length) {
    // no demage to
    const noDamageToTitle = getFeaturesTitle("No Hace  daño a tipos");
    const noDamageToNode = getDamagesTypes(noDamageTo);

    // append half damage to
    detailNode.append(noDamageToTitle);
    detailNode.append(noDamageToNode);
  }
}

function getDamagesTypes(items) {
  const ul = document.createElement("ul");

  items
    .map(item => item.name)
    .forEach(name => {
      const li = document.createElement("li");

      li.append(name);

      ul.append(li);
    });

  return ul;
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

function pokemonHandler(event) {
  event.preventDefault();

  const target = event.target;

  if (target.nodeName !== "A") {
    return false;
  }

  fetchPokemonDetail(target.href);
}

// initial function
fetchPokemons();
