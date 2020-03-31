const user = {
  name: "Ricardo",
  surname: "Tapia",
  nickname: "Robin",
  age: 20,
  gadgets: ["item1", "item2", "item3"],
  address: undefined
};

// ENTRIES
// const entries = Object.entries(user);
// Sirve para poder iterar sobre propiedades y valores de un objeto
// for (const [key, value] of Object.entries(user)) {
//   console.log(key, value);
// }
// values
// console.log(Object.values(user));
// keys
// console.log(Object.keys(user));
// console.log(Object.keys({}));

// stringify
// serializar
const json = JSON.stringify(user);

// parse
// deseralizar
const anotherUser = JSON.parse(json);

console.log(json);
console.log(anotherUser);
