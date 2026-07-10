const pokeModal = (() => {
  const modalId = "pokemonDetailModal";

  function formatHeight(height) {
    return `${(height / 10).toFixed(1)} m`;
  }

  function formatWeight(weight) {
    return `${(weight / 10).toFixed(1)} kg`;
  }

  function convertPokemonToModalHtml(pokemon) {
    return `
      <div class="pokemon-modal-backdrop" id="${modalId}" data-modal-close>
        <article class="pokemon-modal ${pokemon.type}" role="dialog" aria-modal="true" aria-labelledby="pokemonModalTitle">
          <button class="pokemon-modal__close" type="button" aria-label="Fechar detalhes" data-modal-close>
            x
          </button>

          <header class="pokemon-modal__header">
            <span class="pokemon-modal__number">#${pokemon.number}</span>
            <h2 class="pokemon-modal__name" id="pokemonModalTitle">${pokemon.name}</h2>
          </header>

          <img class="pokemon-modal__image" src="${pokemon.photo}" alt="${pokemon.name}">

          <ol class="pokemon-modal__types">
            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
          </ol>

          <dl class="pokemon-modal__details">
            <div>
              <dt>Altura</dt>
              <dd>${formatHeight(pokemon.height)}</dd>
            </div>
            <div>
              <dt>Peso</dt>
              <dd>${formatWeight(pokemon.weight)}</dd>
            </div>
          </dl>

          <section class="pokemon-modal__section">
            <h3>Habilidades</h3>
            <ul>
              ${pokemon.abilities.map((ability) => `<li>${ability}</li>`).join("")}
            </ul>
          </section>

          <section class="pokemon-modal__section">
            <h3>Status</h3>
            <ul>
              ${pokemon.stats.map((stat) => `<li><span>${stat.name}</span><strong>${stat.value}</strong></li>`).join("")}
            </ul>
          </section>
        </article>
      </div>
    `;
  }

  function close() {
    const currentModal = document.getElementById(modalId);

    if (currentModal) {
      currentModal.remove();
    }

    document.removeEventListener("keydown", handleKeyDown);
  }

  function handleKeyDown(event) {
    if (event.key === "Escape") {
      close();
    }
  }

  function handleModalClick(event) {
    if (event.target.hasAttribute("data-modal-close")) {
      close();
    }
  }

  function open(pokemon) {
    close();
    document.body.insertAdjacentHTML("beforeend", convertPokemonToModalHtml(pokemon));

    const modal = document.getElementById(modalId);
    modal.addEventListener("click", handleModalClick);
    document.addEventListener("keydown", handleKeyDown);
  }

  return {
    open,
    close
  };
})();
