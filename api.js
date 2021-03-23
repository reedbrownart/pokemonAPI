//creating variable to store the API url
const baseURL = 'https://pokeapi.co/api/v2/';
const species = 'pokemon-species/';
const offset = '?offset=';
const limit = '&limit=';
const fetchSource = baseURL + species + offset + 0 + limit + 898;
const pokemonFetchSource = 'https://pokeapi.co/api/v2/pokemon-species/89/';

//For personal testing
const working = " is working!!!!!111";
const charmander = 'charmander'

//TAG selectors
const submitForm = document.querySelector('form');
const results = document.querySelector('.results');
const pokemonSelection = document.querySelector('.pokemonSelection');
const enemySelection = document.querySelector('.enemySelection')

//These save the location of the two pokemon who will be battling for future reference
let playerPokemon;
let playerPokemonData;
let enemyPokemon;
let enemyPokemonData;

//Runs the fetchresults function when the submit button is clicked
submitForm.addEventListener('submit', fetchPokemonList);

function fetchPokemonList(e) {
    //form submit refreshes by default
    e.preventDefault();

    fetch(fetchSource)
        .then(function (result) {
            return result.json();
        })
        .then(function (json) {
            displayResults(json);
        })
}

function fetchPokemon(url) {
    fetch(url)
        .then(function(result) {
            return result.json();
        })
        .then(function(json) {
            assignPokemon(json);
        })
}

function displayResults(json) {

    console.log("the fetch" + working);
    console.log(json);
    //checks if results is occupied, if it is, it removes everything
    while (results.firstChild) {
        results.removeChild(results.firstChild);
    }

    // creation of battle tag which will describe the battle and return the results
    let announcement = document.createElement('div');
    let battle = document.createElement('div');

    //creation of p tags which will be filled with pokemon names later
    let playerPokemonParagraph = document.createElement('p');
    playerPokemonParagraph.textContent = 'you have chosen an invalid pokemon, please try again';

    let versus = document.createElement('p');
    versus.textContent = 'WILL BE BATTLING';

    let enemyPokemonParagraph = document.createElement('p');
    enemyPokemonParagraph.textContent = 'you have chosen an invalid pokemon, please try again';

    //iteration through the list of pokemon to announce that the selected pokemon will battle
    //also sets the global variable of playerPokemon = the input
    //also sets the global variable of enemyPokemon = the input
    for (i = 0; i < json.results.length; i++) {
        if (pokemonSelection.value.toLowerCase() === json.results[i].name) {
            playerPokemon = json.results[i];
            //fetchPokemon(json.results[i].url);
            playerPokemonParagraph.textContent = playerPokemon.name.toUpperCase();
        }

        if (enemySelection.value.toLowerCase() === json.results[i].name) {
            enemyPokemon = json.results[i];
            enemyPokemonParagraph.textContent = enemyPokemon.name.toUpperCase();
        }
    }
    //appending the results onto the section "results" for display
    announcement.appendChild(playerPokemonParagraph);
    announcement.appendChild(versus);
    announcement.appendChild(enemyPokemonParagraph);
    results.appendChild(announcement);
    runBattle(battle);
    results.appendChild(battle);
}

function runBattle(battle) {
    //booleans to declare if either pokemon is dead
    let playerIsDead = false;
    let enemyIsDead = false;
    let battleDescription = document.createElement('p');
    let deathDescription = document.createElement('p');
    deathDescription.textContent = 'neither pokemon has died!';

    for (i = 0; i < 5; i++) {
        if (playerIsDead) {
            deathDescription.textContent = playerPokemon.name + ' has died, please go to a pokecenter';
            break;
        }

        if (enemyIsDead) {
            deathDescription.textContent = 'you have defeated ' + enemyPokemon.name + ', congratulations!';
            break;
        }

        if (!playerIsDead) {
            let moveResults = document.createElement('p');
            moveResults.textContent = playerPokemon.name + ' used tackle';
            battleDescription.appendChild(moveResults);
        }

        if (!enemyIsDead) {
            let moveResults = document.createElement('p');
            moveResults.textContent = enemyPokemon.name + ' used scratch';
            battleDescription.appendChild(moveResults);
        }
    }

    //player pokemon picks a move
    //announcer announces the move
    
    //enemy pokemon picks a move
    //announcer announces the move
    battleDescription.appendChild(deathDescription);
    battle.appendChild(battleDescription);
}

function assignPokemon(pokemonURL) {
    playerPokemon = pokemonURL;
    console.log(playerPokemon);
}