const pokemons = [
  { id: 1, name: "Bulbasaur", types: ["Grass", "Poison"] },
  { id: 2, name: "Ivysaur", types: ["Grass", "Poison"] },
  { id: 3, name: "Venusaur", types: ["Grass", "Poison"] },
  { id: 4, name: "Charmander", types: ["Fire"] },
  { id: 5, name: "Charmeleon", types: ["Fire"] },
  { id: 6, name: "Charizard", types: ["Fire", "Flying"] },
  { id: 7, name: "Squirtle", types: ["Water"] },
  { id: 8, name: "Wartortle", types: ["Water"] },
  { id: 9, name: "Blastoise", types: ["Water"] },
  { id: 10, name: "Caterpie", types: ["Bug"] },
  { id: 11, name: "Metapod", types: ["Bug"] },
  { id: 12, name: "Butterfree", types: ["Bug", "Flying"] },
  { id: 13, name: "Weedle", types: ["Bug", "Poison"] },
  { id: 14, name: "Kakuna", types: ["Bug", "Poison"] },
  { id: 15, name: "Beedrill", types: ["Bug", "Poison"] },
  { id: 16, name: "Pidgey", types: ["Normal", "Flying"] },
  { id: 17, name: "Pidgeotto", types: ["Normal", "Flying"] },
  { id: 18, name: "Pidgeot", types: ["Normal", "Flying"] },
  { id: 19, name: "Rattata", types: ["Normal"] },
  { id: 20, name: "Raticate", types: ["Normal"] },
];

const forEachPokemon = function () {
  const lines = [];
  pokemons.forEach((p) => {
    lines.push(`#${p.id} ${p.name} - ${p.types.join(" / ")}`);
  });
  return lines.join("\n");
};

console.group("=========== forEachPokemon =========== ");
console.log(forEachPokemon());
console.groupEnd();

const filterPokemons = function (type) {
  return pokemons
    .filter((p) => p.types.includes(type))
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((p) => p.name);
};

console.group("=========== filterPokemons =========== ");
console.log(filterPokemons("Fire"));
console.log(filterPokemons("Normal"));
console.log(filterPokemons("Poison"));
console.groupEnd();

const searchPokemons = function (query) {
  const q = query.toLowerCase();
  return pokemons.filter((p) => p.name.toLowerCase().includes(q) || p.types.some((t) => t.toLowerCase().includes(q)));
};

console.group("=========== searchPokemons =========== ");
console.log(searchPokemons("Wartortle"));
console.log(searchPokemons("pidgey"));
console.log(searchPokemons("bug"));
console.groupEnd();

const reducePokemons = pokemons.reduce((counts, p) => {
  p.types.forEach((t) => {
    counts[t] = (counts[t] || 0) + 1;
  });
  return counts;
}, {});

console.group("=========== reducePokemons =========== ");
console.log(reducePokemons);
console.groupEnd();
