function getPokemonCard(id, name, urlPicture, type1, type2) {
    return `
    <div class="pokemon" onclick="showOverlay(${id})">
        <div class="details">
            <div class="pokemon-head">
                <p>#${id}</p>
                <p class="m-left-24 f-letter-uppercase">${name}</p>
            </div>
            <div class="pokemon-picture">
                <img class="${type1}" src="${urlPicture}" alt="${name}">
            </div>
            <div class="pokemon-footer d_flex_c_c" id="type-icon">
                ${getPokemonTypeIcon(type1)}
                ${type2 ? getPokemonTypeIcon(type2) : ''}
            </div>
        </div>
    </div>
    `;
}

function getPokemonTypeIcon(type) {
    return `
    <img src="./assets/img/${type}_icon.png" alt="icon">
    `;
}

function getPokemonOverlayDetail(id, name, urlPicture, type) {
    return `
    <div class="pokemon-head">
        <div>
            <p class="f-letter-uppercase"># ${id} ${name}</p>
        </div>
        <div>
            <img src="./assets/img/close.png" class="close" alt="close" onclick="closeOverlay()">
        </div>
    </div>
    <div class="pokemon-picture pokemon-picture-mobile">
        <img class="${type}" src="${urlPicture}" alt="Bulbasaur">
    </div>
    <div class="change">
        <img onclick="showOverlay(${id - 1})"src="./assets/img/arrow_left.png" alt="last">
        <img onclick="showOverlay(${id + 1})" src="./assets/img/arrow_right.png" alt="next">
    </div>
    <div class="pokemon-footer d_flex_c_c" id="overlay-type-icon">

    </div>
    <div class="pokemon-species-change d_flex_c_c">
        <button onclick="renderOverlayMain(${id})" id="main" class="pokemon-overlay-button">main</button>
        <button onclick="renderOverlayStats(${id})" id="stats" class="pokemon-overlay-button">stats</button>
        <button onclick="renderOverlayEvoChain(${id})" id="evochain" class="pokemon-overlay-button">evo chain</button>
    </div>
    <div id="pokemon-species">

    </div> 
    `
}

function getPokemonOverlayTypeIcon(type) {
    return `
    <img src="./assets/img/${type}_icon.png" alt="icon">
    `
}

function getPokemonOverlayMain(height, weight, baseExperience, abilities) {
    return `
        <table>
        <tr>
            <td>Height:</td>
            <td>${height} m</td>
        </tr>
        <tr>
            <td>Weight:</td>
            <td>${weight} kg</td>
        </tr>
        <tr>
            <td>Base experience:</td>
            <td>${baseExperience}</td>
        </tr>
        <tr>
            <td>Abilities:</td>
            <td>${abilities}</td>
        </tr>
    </table>
    `
}

function getPokemonOverlayStats(hp, attack, defense, specialAttack, specialDefense, speed) {
    return `
        <table class="stats">
        <tr>
            <td>hp</td>
            <td class="td-load"><div class="loader-bar" id="load-stats" style="width: ${hp}%; color: #ff0000;">.</div></td>
        </tr>
        <tr>
            <td>attack</td>
            <td class="td-load"><div class="loader-bar" id="load-stats" style="width: ${attack}%; color: #ff0000;">.</div></td>
        </tr>
        <tr>
            <td>defense</td>
            <td class="td-load"><div class="loader-bar" id="load-stats" style="width: ${defense}%; color: #ff0000;">.</div></td>
        </tr>
        <tr>
            <td>special-attack</td>
            <td class="td-load"><div class="loader-bar" id="load-stats" style="width: ${specialAttack}%; color: #ff0000;">.</div></td>
        </tr>
        <tr>
            <td>special-defense</td>
            <td class="td-load"><div class="loader-bar" id="load-stats" style="width: ${specialDefense}%; color: #ff0000;">.</div></td>
        </tr>
        <tr>
            <td>speed</td>
            <td class="td-load"><div class="loader-bar" id="load-stats" style="width: ${speed}%; color: #ff0000;">.</div></td>
        </tr>
    </table>
    `
}

function getPokemonOverlayEvoChain(currentName, currentUrlPicture, nextName, nextUrlPicture, lastName, lastUrlPicture, currentId) {
    return `
    <div class="change-pokemon">
        <div class="last" onclick="showOverlay(${currentId - 1})">
            <img class="change-pokemon-img" src="${lastUrlPicture}" alt="">
            <p class="f-letter-uppercase">${lastName}</p>
        </div>
        <img class="change-pokemon-icon" src="./assets/img/arrow_left.png" alt="last">
        <div class="current">
            <img class="change-pokemon-img" src="${currentUrlPicture}" alt="">
            <p class="f-letter-uppercase">${currentName}</p>
        </div>
        <img class="change-pokemon-icon" src="./assets/img/arrow_right.png" alt="next">
        <div class="next" onclick="showOverlay(${currentId + 1})">
            <img class="change-pokemon-img" src="${nextUrlPicture}" alt="">
            <p class="f-letter-uppercase">${nextName}</p>
        </div>
    </div>
    `
}