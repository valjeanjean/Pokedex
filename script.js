async function getPokemons() {

    return fetch("https://pokebuildapi.fr/api/v1/pokemon/limit/100")
    .then(response => response.json());
}

function searchPokemon(){

}

/* Fonction pour assigner les valeurs/cloner la div correspondante au pokémon cliqué */
async function pokemonEvolutionLineComponent(currentPokemon){

    const pokemon = await fetch("https://pokebuildapi.fr/api/v1/pokemon/" + currentPokemon.apiEvolutions[0].id);

    const evolutionPokemonAddLine = PokemonLineComponent(pokemon);
    const evolutionPokemonContainer = document.querySelector(".evolution-display");
    if(evolutionPokemonContainer == null){
        
        throw Error("Erreur lors de la récupération de la classe evolution-display");
    }
    
    evolutionPokemonContainer.appendChild(evolutionPokemonAddLine);


}



/* Fonction d'assignations de valeurs pour la création d'une nouvelle div qui contiendra les infos du pokemon */
function PokemonLineComponent(pokemon){

    const pokemonName = pokemon.name;
    const pokemonID = pokemon.id;
    const lineTemplate = document.querySelector(".pokemon-line-template");
    if(lineTemplate == null){

        throw Error("Erreur lors de la récupération de la class pokemon-line-template");
    }

    const newPokemonLine = lineTemplate.content.cloneNode(true);
    const pokemonDescriptions = newPokemonLine.querySelectorAll("p");
    const pokemonIcon = newPokemonLine.querySelector("img");

    pokemonDescriptions[0].textContent = pokemonID;
    pokemonDescriptions[1].textContent = pokemonName;
    const pokemonLinesContainer = document.querySelector(".display-pokemon-line");
    const elementPokemon = newPokemonLine.querySelector(".single-pokemon");

    elementPokemon.addEventListener("click", ()=>{
        
        pokemonCardComponent(pokemon);
        
    });

    pokemonIcon.src = pokemon.sprite;
    return newPokemonLine;
}

/* Fonction d'assignations de valeurs pour la création d'une nouvelle div (carte) qui contiendra les infos du pokemon et son image */
function pokemonCardComponent(pokemon){
    
    const cardTemplate = document.querySelector(".pokemon-card-template");
    if(cardTemplate == null){

        throw Error("Erreur lors de la récupération de la classe pokemon-card-template");
    }
    const newPokemonCard = cardTemplate.content.cloneNode(true);
    
    const pokemonID = newPokemonCard.querySelector("p");
    pokemonID.textContent = "n°" + pokemon.id;
    const pokemonName = newPokemonCard.querySelector("h3");
    pokemonName.textContent = pokemon.name;

    const pokemonImage = newPokemonCard.querySelector(".pokemon-image");
    pokemonImage.src = pokemon.image;

    pokemon.apiTypes.forEach(type =>{

        const iconsContainer = newPokemonCard.querySelector(".elements-icons");
        const newIcon = document.createElement("img");
        newIcon.src = type.image;
        newIcon.classList.add("pokemon-icons");
        iconsContainer.appendChild(newIcon);
    });

    const pokemonCardContainer = document.querySelector(".display-pokemon-infos");
    if(pokemonCardContainer == null){

        throw Error("Erreur lors de la récupération de la classe display-pokemon-infos");
    }

    pokemonCardContainer.innerHTML = "";
    pokemonCardContainer.appendChild(newPokemonCard);
    
}

/* Fonction d'affichage des Pokemons */
function displayPokemonLines() {

    getPokemons().then(pokemons => {

        pokemons.forEach(pokemon => {           

            const newPokemonLine = PokemonLineComponent(pokemon);
            const pokemonLinesContainer = document.querySelector(".display-pokemon-line");
            pokemonLinesContainer.appendChild(newPokemonLine);

            const evolContainer = document.querySelector(".evolution-display");

            
            const newPokemonLine2 = PokemonLineComponent(pokemon);

            evolContainer?.appendChild(newPokemonLine2)
        });
    });
}

/* Faire une fonction pour récupérer seulement l'image pour chaque pokemon ? */

displayPokemonLines();
