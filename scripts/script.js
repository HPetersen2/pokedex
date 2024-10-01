let BASE_URL = "https://pokeapi.co/api/v2/";
let amount = 20;
let start = 0;
let allNames = [];

function init() {
    renderPokemonDetails();
}

async function loadJson(id) {
    let response = await fetch(BASE_URL + "pokemon/" + id)
    let responseJson = await response.json();
    return responseJson;
}

async function searchPokemon() {
    let keyword = document.getElementById('search').value.toLowerCase();
    if (keyword.length > 3) {
        try {
            let result = allNames.filter(name => name.toLowerCase().includes(keyword));
            if (result.length === 0) {
                console.error("No matching Pokémon found.");
                return;
            }
            let ref = document.getElementById('pokemon-cards');
            ref.innerHTML = "";
            for (let pokemonName of result) {
                let response = await loadJson(pokemonName);
                let id = response.id;
                let name = response.name;
                let urlPicture = response.sprites.other.home.front_default;
                let type1 = response.types[0].type.name;
                let type2 = response.types.length > 1 ? response.types[1].type.name : null;
                ref.innerHTML += getPokemonCard(id, name, urlPicture, type1, type2);
            }
            document.getElementById('search').value = "";
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }
}

async function renderPokemonDetails() {
    document.getElementById('loading').style = "display: none;";
    let response = await fetch(BASE_URL + "pokemon?limit=" + amount + "&offset=" + start);
    let responseToJson = await response.json();
    
    for (let i = 0; i < responseToJson.results.length; i++) {
        let name = responseToJson.results[i].name;
        allNames.push(name);
        let responseID = await fetch(BASE_URL + "/pokemon/" + name);
        let responseIdJson = await responseID.json();
        let id = responseIdJson.id;
        let urlPicture = responseIdJson.sprites.other.home.front_default;

        let type1 = responseIdJson.types[0].type.name;
        let type2 = responseIdJson.types.length > 1 ? responseIdJson.types[1].type.name : null;

        document.getElementById('pokemon-cards').innerHTML += getPokemonCard(id, name, urlPicture, type1, type2);
    }
}

async function loadMorePokemon() {
    document.getElementById('load-more').style = "display: none;"
    document.getElementById('pokemon-cards').style = "display: none;";
    document.getElementById('loading').style = "display: flex;";
    start = start + 20;

    setTimeout(() => document.getElementById('load-more').style = "display: flex;", 2000);
    setTimeout(() => document.getElementById('pokemon-cards').style = "display: flex;", 2000);
    setTimeout(renderPokemonDetails, 2000);
}

async function showOverlay(id) {
    document.getElementById('pokemon-overlay').innerHTML = "";
    document.getElementById('main').style = 'overflow-y: hidden';
    document.getElementById('content').style = 'filter: brightness(50%);'
    document.getElementById('pokemon-overlay').style = 'display: block;';
    let responseJson = await loadJson(id);
    let name = responseJson.name;
    let urlPicture = responseJson.sprites.other.home.front_default;
    let type = responseJson.types[0].type.name;
    document.getElementById('pokemon-overlay').innerHTML += getPokemonOverlayDetail(id, name, urlPicture, type);
    renderOverlayMain(id);
    loadOverlayType(id);
}

async function renderOverlayMain(id) {
    let responseJson = await loadJson(id);
    let height = responseJson.height;
    let weight = responseJson.weight;
    let baseExperience = responseJson.base_experience;
    let abilitie1 = responseJson.abilities[0].ability.name;
    let abilitie2 = responseJson.abilities[1] !== undefined ? responseJson.abilities[1].ability.name : " ";
    let abilities = abilitie1 + ", " + abilitie2;
    document.getElementById('pokemon-species').innerHTML = getPokemonOverlayMain(height, weight, baseExperience, abilities);
}

async function renderOverlayStats(id) {
    let responseJson = await loadJson(id);
    let hp = (responseJson.stats[0].base_stat)  / 250 * 100;
    let attack = (responseJson.stats[1].base_stat) / 250 * 100;
    let defense = (responseJson.stats[2].base_stat) / 250 * 100;
    let specialAttack = (responseJson.stats[3].base_stat) / 250 * 100;
    let specialDefense = (responseJson.stats[4].base_stat) / 250 * 100;
    let speed = (responseJson.stats[5].base_stat) / 250 * 100;

    document.getElementById('pokemon-species').innerHTML = getPokemonOverlayStats(hp, attack, defense, specialAttack, specialDefense, speed);
}

async function renderOverlayEvoChain(id) {
        let currentResponseJson = await loadJson(id);
        let currentId = id;
        if(id <= 1) {
            id = 1000;
        }
        let lastResponseJson = await loadJson(id - 1);
        let nextResponseJson = await loadJson(id + 1);
        let currentName = currentResponseJson.name;
        let currentUrlPicture = currentResponseJson.sprites.other.home.front_default;
        let nextName = nextResponseJson.name;
        let nextUrlPicture = nextResponseJson.sprites.other.home.front_default;
        let lastName = lastResponseJson.name;
        let lastUrlPicture = lastResponseJson.sprites.other.home.front_default;
        
        document.getElementById('pokemon-species').innerHTML = getPokemonOverlayEvoChain(currentName, currentUrlPicture, nextName, nextUrlPicture, lastName, lastUrlPicture, currentId);
}

function closeOverlay() {
    let overlay = document.getElementById('pokemon-overlay');
    if(overlay.style.display === "block") {
        document.getElementById('main').style = "overflow-y: auto;";
        document.getElementById('content').style = 'filter: brightness(100%);'
        document.getElementById('pokemon-overlay').style = "display: none;"
        document.getElementById('pokemon-overlay').innerHTML = "";
    }
}

async function loadOverlayType(id) {
    let response = await loadJson(id);
    if(response.types.length == 1) {
        let type = response.types[0].type.name
        document.getElementById('overlay-type-icon').innerHTML += getPokemonOverlayTypeIcon(type);
    } else if(response.types.length == 2) {
        let type1 = response.types[0].type.name;
        let type2 = response.types[1].type.name;
        document.getElementById('overlay-type-icon').innerHTML += getPokemonOverlayTypeIcon(type1);
        document.getElementById('overlay-type-icon').innerHTML += getPokemonOverlayTypeIcon(type2);
    }
}

function clearDisplay() {
    document.getElementById('pokemon-cards').innerHTML = "";
    document.getElementById('search').value = "";
    renderPokemonDetails();
}