var normalImageElement = document.getElementById("normalImage");
var shinyImageElement = document.getElementById("shinyImage");
var nameElement = document.getElementById("pokemonName");
var pokedexDescriptionElement = document.getElementById("pokedexDescription");
var cryAudioElement = document.getElementById("cryAudio");

function pokemonNumberDay() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const uniqueSeed = parseInt(day + month + year) + year;
    const pokemonNum = (uniqueSeed % 1025) + 1;

    return pokemonNum;
}

function getPokedex(pokemonNumber) {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonNumber}`)
        .then(response => response.json())
        .then(data => {
            pokedexDescriptionElement.innerHTML = data.flavor_text_entries.filter((item)=>item.language.name =="en")[0].flavor_text
        })
        .catch(error => console.error("Erro:", error));
}

function getPokemon(pokemonNumber) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`)
        .then(response => response.json())
        .then(data => {
            normalImageElement.src=data.sprites.other["official-artwork"].front_default
            shinyImageElement.src=data.sprites.other["official-artwork"].front_shiny
            nameElement.innerHTML = `#${pokemonNumber} ${data.name[0].toUpperCase()+data.name.substring(1)}`;
            cryAudioElement.src = data.cries.latest
        })
        .catch(error => console.error("Erro:", error));
}

const pokemonNumber = pokemonNumberDay()
getPokemon(pokemonNumber)
getPokedex(pokemonNumber)