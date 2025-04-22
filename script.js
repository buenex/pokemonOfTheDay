var normalImageElement = document.getElementById("normalImage");
var shinyImageElement = document.getElementById("shinyImage");
var nameElement = document.getElementById("pokemonName");

function pokemonNumberDay() {
    // const today = new Date();
    // const day = String(today.getDate()).padStart(2, '0');
    // const month = String(today.getMonth() + 1).padStart(2, '0');
    // const year = today.getFullYear();
    // const uniqueSeed = parseInt(day + month + year) + year;
    const uniqueSeed = parseInt(Math.random()*1025)
    const pokemonNum = (uniqueSeed % 1025) + 1;

    return pokemonNum;
}

function getPokemon(pokemonNumber) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`)
        .then(response => response.json())
        .then(data => {
            normalImageElement.src=data.sprites.other["official-artwork"].front_default
            shinyImageElement.src=data.sprites.other["official-artwork"].front_shiny
            nameElement.innerHTML = data.name[0].toUpperCase()+data.name.substring(1);
        })
        .catch(error => console.error("Erro:", error));
}

getPokemon(pokemonNumberDay())