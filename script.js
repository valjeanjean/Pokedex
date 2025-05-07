async function getPokemons() {

    return fetch("https://pokebuildapi.fr/api/v1/pokemon/")
    .then(response => response.json());
}

async function pokemonEvolutionLine(pokemon){
    
    const response = await fetch("https://pokebuildapi.fr/api/v1/pokemon");
    const allPokemons = await response.json();
    
    if(pokemon == null){
        
        return null;
    }
    
    const evolutionLineTemplate = document.querySelector(".pokemon-line-template");
    if(evolutionLineTemplate == null){
        
        return null;
    }
    
    const newPokemonEvolution = evolutionLineTemplate.content.cloneNode(true);
    const pokemonDescriptions = newPokemonEvolution.querySelectorAll("p");
    const pokemonIcon = newPokemonEvolution.querySelector("img");
    
    if(pokemon.apiEvolutions?.length){
        
        const pokemonID = pokemon.apiEvolutions[0].pokedexId;
        
        allPokemons.forEach(pokemon2 =>{
            
            if(pokemon2.id == pokemonID){
                
                pokemonDescriptions[0].textContent = pokemon2.id;
                pokemonDescriptions[1].textContent = pokemon2.name;
                pokemonIcon.src = pokemon2.sprite;
                
                const evolutionDiv = newPokemonEvolution.querySelector(".single-pokemon");
                if(evolutionDiv != null){

                    evolutionDiv.addEventListener("click", ()=>{

                        pokemonCardComponent(pokemon2);

                    });

                }else{
                    
                    console.log("evolutionDiv est undefined/null");
                }
            }  
        });
        
    }else{
        
        pokemonDescriptions[0].textContent = "N/A";
        pokemonDescriptions[1].textContent = "Aucune évolution";
        pokemonIcon.classList.add("pokemon-icons");
        pokemonIcon.src = "https://img.icons8.com/?size=100&id=T9nkeADgD3z6&format=png&color=000000";
    }
    
    return newPokemonEvolution;
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
    
    elementPokemon.addEventListener("click", async ()=>{
        
        pokemonCardComponent(pokemon);
        
        const evolutionDiv = await pokemonEvolutionLine(pokemon);
        
        const pokemonEvolutionContainer = document.querySelector(".evolution-display");
        if(pokemonEvolutionContainer == null){
            
            throw Error("Erreur lors de la récupération de la class first-column");
        }
        
        pokemonEvolutionContainer.innerHTML = "";
        
        if(evolutionDiv != null){
            
            pokemonEvolutionContainer.appendChild(evolutionDiv);
        }
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
    
function pokemonFilter(searchInput){

    const searchButton = document.querySelector(".submit");
    const lowerCaseInput = searchInput.trim().toLowerCase();
    const pokemonLineContainer = document.querySelector(".display-pokemon-line");

    if(pokemonLineContainer == null){

        throw Error("Erreur lors de la récupération de la class display-pokemon-line");
    }

    const allPokemonDisplayed = pokemonLineContainer.querySelectorAll(".pokemon-line");

    allPokemonDisplayed.forEach(pokemon =>{

        const pokemonParagraphs = pokemon.querySelectorAll("p");
        const pokemonName = pokemonParagraphs[1].textContent?.trim().toLowerCase();

        if(pokemonName.includes(lowerCaseInput)){

            pokemon.style.display = "flex";

        }else{

            pokemon.style.display = "none";
        }

    });

}
    
/* Fonction d'affichage des Pokemons */
function displayPokemonLines() {
        
    getPokemons().then(pokemons => {
        
        pokemons.forEach(pokemon => {           
            
            const newPokemonLine = PokemonLineComponent(pokemon);
            const pokemonLinesContainer = document.querySelector(".display-pokemon-line");
            if(pokemonLinesContainer == null){
                
                throw Error("Échec lors de la récupération de la class display-pokemon-line");
            }

            pokemonLinesContainer.appendChild(newPokemonLine);
        });
    });
}

displayPokemonLines();