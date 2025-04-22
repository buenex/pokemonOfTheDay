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

    if (daysDiff >= 1025) return null; 

    const numbers = Array.from({ length: 1025 }, (_, i) => i + 1);
    seededShuffle(numbers, 123456);

    return numbers[daysDiff];
}

var numbers = []
for (var i=0; i<32;i++){
    for (var j=0; j<13;j++){
        for (var k=2025; k<2029;k++){
            numbers.push(parseInt(i + j + k) + k)
        }
    }
}

var numbers = []
for (var i=0; i<32;i++){
    for (var j=0; j<13;j++){
        for (var k=2025; k<2029;k++){
            numbers.push((parseInt(i.toString() + j.toString() + k.toString()) + k)%1025)
        }
    }
}

console.log(numbers.sort(function(a, b) {
    return a - b;
  }))

