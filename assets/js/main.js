const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const maxRecords = 151;
const limit = 10;
let offset = 0;
const pokemonCache = new Map();

function convertPokemonToLi(pokemon) {
  return `
                <li class="pokemon ${pokemon.type}">
                    <button class="pokemon-detail-button" type="button" data-pokemon-number="${pokemon.number}">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>

                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
                        </ol>

                        <img src="${pokemon.photo}"
                            alt="${pokemon.name}"/>
                     
                    </div>
                    </button>
            </li>
    `;
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    pokemons.forEach((pokemon) => pokemonCache.set(String(pokemon.number), pokemon));

    const newHtml = pokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});

pokemonList.addEventListener("click", (event) => {
  const pokemonButton = event.target.closest(".pokemon-detail-button");

  if (!pokemonButton) {
    return;
  }

  const pokemonNumber = pokemonButton.dataset.pokemonNumber;
  const cachedPokemon = pokemonCache.get(pokemonNumber);

  if (cachedPokemon) {
    pokeModal.open(cachedPokemon);
    return;
  }

  pokeApi.getPokemonByNumber(pokemonNumber).then((pokemon) => {
    pokemonCache.set(String(pokemon.number), pokemon);
    pokeModal.open(pokemon);
  });
});
