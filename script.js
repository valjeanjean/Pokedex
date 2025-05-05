function searchPokemon(){


}

function clickToSearchIcon(){

    const iconSearch = document.querySelector(".search-form i");
    iconSearch.addEventListener("click", ()=>{

        const searchBar = document.querySelector(".search-bar");
        const searchBarInput = searchBar.textContent.toLowerCase;
        searchPokemon();

    });

}