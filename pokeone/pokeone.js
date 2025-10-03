let currentFilter = null; 
let allPokemons = [];      // todos los pokemones
let renderedPokemons = []; // lista actual (filtrada o completa)
let currentIndex = 0;      // índice actual de carga
const PAGE_SIZE = 20;      // cuántos pokemones cargar por tanda

// Renderizar una tanda de pokemones
function renderNextBatch() {
  const pokemonContainer = document.getElementById('pokemon-container');
  const slice = renderedPokemons.slice(currentIndex, currentIndex + PAGE_SIZE);

  slice.forEach(pokemon => {
    const pokemonComponent = createPokemonComponent(pokemon);
    pokemonContainer.appendChild(pokemonComponent);
  });

  currentIndex += PAGE_SIZE;
}

// Resetear la vista y empezar desde cero
function resetRender(newList) {
  const pokemonContainer = document.getElementById('pokemon-container');
  pokemonContainer.innerHTML = '';

  renderedPokemons = newList;
  currentIndex = 0;

  renderNextBatch(); // primera tanda
}

// Crear un Pokémon
function createPokemonComponent(pokemon) {
  const pokemonDiv = document.createElement("div");
  pokemonDiv.className = "pokemon"; // 👈 empieza invisible

  const img = document.createElement("img");
  if (pokemon.hasCustomName) {
    img.src = `Imagenes/PokemonesConNombre/${pokemon.image}.webp`;
  } else {
    img.src = `Imagenes/PokemonesSinNombre/${pokemon.image}.webp`;
  }
  img.alt = pokemon.name;
  img.loading = "lazy";
  pokemonDiv.appendChild(img);

  const nameDiv = document.createElement("div");
  nameDiv.className = "name";

  const nameImg = document.createElement("img");
  nameImg.src = `Imagenes/Nombres/${pokemon.image}.webp`;
  nameImg.alt = pokemon.name;
  nameImg.loading = "lazy";
  nameDiv.appendChild(nameImg);

  pokemonDiv.appendChild(nameDiv);

  // 👇 después de un pequeño delay, agregamos la clase visible
  requestAnimationFrame(() => {
    setTimeout(() => {
      pokemonDiv.classList.add("visible");
    }, 50); // leve delay para que active la transición
  });

  return pokemonDiv;
}

// Cargar el JSON y mostrar todos al inicio
fetch('https://raw.githubusercontent.com/KyubiGames/KyubimonSeries/main/pokeone/pokeone.json')
  .then(response => response.json())
  .then(data => {
    allPokemons = data;
    resetRender(allPokemons); // mostramos todos con lazy load
  })
  .catch(error => console.error(error));

// -------------------
// 🔍 Búsqueda y filtros
// -------------------
document.addEventListener("DOMContentLoaded", () => {
  const filterButton = document.querySelector("button"); 
  const filterContainer = document.querySelector(".filter-container");
  const searchInput = document.querySelector("input[type='search']");

  // 🔹 Mostrar / ocultar contenedor de filtros con animación
  filterButton.addEventListener("click", () => {
    if (filterContainer.classList.contains("visible")) {
      // Ocultar
      filterContainer.classList.remove("visible");
      setTimeout(() => {
        filterContainer.style.display = "none"; // oculto después de la transición
      }, 600);
    } else {
      // Mostrar con fade-in
      filterContainer.style.display = "flex";
      requestAnimationFrame(() => {
        filterContainer.classList.add("visible");
      });
    }
  });

  // 🔹 Clic en un filtro (ej: Agua, Fuego, Alfabético, etc.)
  filterContainer.addEventListener("click", e => {
    if (e.target.tagName === "IMG") {
      const tipo = e.target.alt;

      if (currentFilter === tipo) {
        currentFilter = null;
        resetRender(allPokemons);
      } else {
        currentFilter = tipo;

        if (tipo === "Alfabético") {
          // 🔹 Ordenar por nombre
          let ordenados = [...allPokemons].sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          resetRender(ordenados);
        } else {
          // 🔹 Filtrar por tipo
          let filtrados = allPokemons.filter(p =>
            Array.isArray(p.type) ? p.type.includes(tipo) : p.type === tipo
          );
          resetRender(filtrados);
        }
      }
    }
  });

  // 🔹 Búsqueda en vivo
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();

    let filtrados = allPokemons.filter(p =>
      p.name.toLowerCase().includes(query)
    );

    resetRender(filtrados);
  });

  // 🔹 Lazy loading con scroll
  window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
      renderNextBatch();
    }
  });
});


