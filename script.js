async function getPokemons() {

    return fetch("https://pokebuildapi.fr/api/v1/pokemon/limit/100")
    .then(response => response.json())

}

function displayPokemonLines() {

    getPokemons().then(pokemons => {

        pokemons.forEach(pokemon => {
            console.log(pokemon.name);
            console.log(pokemon.id);
            const pokemonName = pokemon.name;
            const pokemonID = pokemon.id;
            console.log("Pokémon : " + pokemonName);
            const template = document.querySelector(".pokemon-line-template");
            const newPokemonLine = template.content.cloneNode(true);
            newPokemonLine.querySelector()
        });
    });

}

/* Faire une fonction pour récupérer seulement l'image pour chaque pokemon ? */

function displayPokemonOnClick(event) {
    const pokemonTagClicked = event.target;

    pokemonTagClicked.dataset.id;


    const pokemonLines = document.querySelectorAll(".pokemon-line");
    pokemonLines.forEach(pokemon => {

        pokemon.addEventListener("click", () => {

            // Display le pokemon dans la colonne de droite grâce au template 
            // "pokemon-card-template", puis display avec append
            // la ligne en bas à droite pour l'évolution

        });

    });
}