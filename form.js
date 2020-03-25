const form = document.querySelector("form");

form.addEventListener("submit", event => {
  event.preventDefault();

  const target = event.target;
  const name = target.name.value;
  const email = target.email.value;
  const gender = target.gender.value;
  const message = target.message.value;

  if (name === "" || email === "" || gender === "" || message === "") {
    alert("Todos los datos son obligatorios");

    return;
  }

  console.log(name, email, gender, message);
});
