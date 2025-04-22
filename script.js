var normalImageElement = document.getElementById("normalImage");
var shinyImageElement = document.getElementById("shinyImage");
var nameElement = document.getElementById("pokemonName");
var pokedexDescriptionElement = document.getElementById("pokedexDescription");
var cryAudioElement = document.getElementById("cryAudio");

function seededShuffle(array, seed) {
    function mulberry32(a) {
        return function() {
            var t = a += 0x6D2B79F5;
            t = Math.imul(t ^ t >>> 15, t | 1);
            t ^= t + Math.imul(t ^ t >>> 7, t | 61);
            return ((t ^ t >>> 14) >>> 0) / 4294967296;
        };
    }

    const random = mulberry32(seed);
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function getPokemonNumberForToday() {
    const startDate = new Date('2025-01-01');
    const today = new Date();
    const daysDiff = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));

    const index = daysDiff % 1025;

    const numbers = Array.from({ length: 1025 }, (_, i) => i + 1);
    seededShuffle(numbers, 123456);

    return numbers[index];
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

const pokemonNumber = getPokemonNumberForToday()
getPokemon(pokemonNumber)
getPokedex(pokemonNumber)