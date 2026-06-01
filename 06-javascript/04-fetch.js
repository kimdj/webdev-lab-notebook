const pokemonColors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#ea7ce8",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

const POKEMON_COUNT = 25;
const API_URL = `https://pokeapi.co/api/v2/pokemon?limit=${POKEMON_COUNT}`;

const container = document.getElementById("pokemon-container");
const statusEl = document.getElementById("status");
const searchInput = document.getElementById("search-input");

container.classList.add("pokemon-container");

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let allPokemons = [];

const showStatus = (message) => {
  statusEl.innerHTML = message;
  statusEl.style.display = "block";
};

const hideStatus = () => {
  statusEl.style.display = "none";
};

const fetchPokemons = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    await delay(2000);

    const details = await Promise.all(data.results.map((p) => fetch(p.url).then((r) => r.json())));

    allPokemons = details.map((p) => ({
      id: p.id,
      name: p.name,
      image: p.sprites.other["official-artwork"].front_default || p.sprites.front_default,
      types: p.types.map((t) => t.type.name),
    }));

    hideStatus();
    renderPokemons(allPokemons);
  } catch (err) {
    showStatus("<p>Failed to load Pokemons. Please try again.</p>");
  }
};

const renderPokemons = (list) => {
  container.innerHTML = "";

  if (list.length === 0) {
    showStatus("<p>No Pokemons matched your search.</p>");
    return;
  }
  hideStatus();

  list.forEach((p) => {
    const card = document.createElement("article");
    const image = document.createElement("img");
    const name = document.createElement("h2");
    const types = document.createElement("div");

    card.classList.add("pokemon-card");
    card.style.setProperty("--type-color", pokemonColors[p.types[0]] || "#777");

    image.classList.add("pokemon-image");
    image.src = p.image;
    image.alt = p.name;

    name.classList.add("pokemon-name");
    name.textContent = p.name;

    types.classList.add("pokemon-types");

    p.types.forEach((type) => {
      const typeBadge = document.createElement("span");
      typeBadge.classList.add("pokemon-type");
      typeBadge.style.backgroundColor = pokemonColors[type] || "#777";
      typeBadge.textContent = type;
      types.appendChild(typeBadge);
    });

    card.append(image, name, types);
    container.appendChild(card);
  });
};

const handleSearch = () => {
  const query = searchInput.value.trim().toLowerCase();

  if (!query) {
    renderPokemons(allPokemons);
    return;
  }

  const filtered = allPokemons.filter((p) => p.name.toLowerCase().includes(query) || p.types.some((t) => t.toLowerCase().includes(query)));

  renderPokemons(filtered);
};

searchInput.addEventListener("input", handleSearch);

fetchPokemons();
