fetch("https://pokeapi.co/api/v2/pokemon/")
  .then(response => response.json())
  .then(data => {
    const results = data.results; // aqui estan los pokemons
    const pokemons = document.querySelector("ul#pokemons");

    for (const result of results) {
      // obtener los valores
      const name = result.name;
      const url = result.url;

      // crear nodos
      const li = document.createElement("li");
      const a = document.createElement("a");

      // setear valores
      a.textContent = name;
      a.setAttribute("href", url);

      // adjuntor a nodo objetivos
      li.append(a);
      pokemons.append(li);
    }
  })
  .catch(error => console.error(error.message));
