const form = document.querySelector("form");
// const form = document.forms[0];
// const form = document.forms.subscribeform;

function submitHandler(event) {
  event.preventDefault();

  // Acceder al nodo que provoco la accion
  const target = event.target;

  // Acceder a los elementos o nodos input en el formulario
  const name = target.elements.name.value;
  const email = target.elements.email.value;

  // validar formulario
  if (!name) {
    alert("Name is required");

    return false;
  }

  if (!email) {
    alert("Email is required");

    return false;
  }

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    // document.querySelector("#email").style.borderColor = "red";
    alert("Email is invalid");

    return false;
  }

  // enviar a un servidor
  const endpoint = "https://jsonplaceholder.typicode.com/posts";
  const data = JSON.stringify({ title: name, body: email, userId: 1 });
  const init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: data
  };

  fetch(endpoint, init)
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(error => console.error(error.message));
}

form.addEventListener("submit", submitHandler);
