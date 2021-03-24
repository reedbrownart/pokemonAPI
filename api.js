//creating variable to store the API url
const baseURL = 'https://pokeapi.co/api/v2/';
const species = 'pokemon-species/';
const abilities = 'ability/'
const offset = '?offset=';
const limit = '&limit=';
const pokemonListURL = baseURL + species + offset + 0 + limit + 898;
const pokemonAbilitiesURL = baseURL + abilities + offset + 0 + limit + 400;
const pokemonTestFetchSource = 'https://pokeapi.co/api/v2/pokemon-species/89/';



//For personal testing
const working = " is working!!!!!111";
const charmander = 'charmander'

//TAG selectors
const submitForm = document.querySelector('form'); //the input form
const results = document.querySelector('.results'); //the div where all the results go
const pokemonSelection = document.querySelector('.pokemonSelection'); //the textbox where they type a player pokemon
const enemySelection = document.querySelector('.enemySelection') //the textbox where they type an enemy pokemon

//These save the location of the two pokemon who will be battling for future reference
let playerPokemonLocation; // player pokemon url
let enemyPokemonLocation; // enemy pokemon url
let playerPokemonActual; // player pokemon object
let enemyPokemonActual; // enemy pokemon object
let movesList;

//Creates a "pokemon battle story" based on the pokemon selected by the user, it gets activated by filling out the form and clicking submit
submitForm.addEventListener('submit', mainFunction);

function mainFunction(e) {
    e.preventDefault();

    fetch(pokemonListURL) //fetches a list of pokemon
        .then(function (result) {
            return result.json(); //jsonifies the list
        })
        .then(function (json) {
            announcement(json); //runs the announcement function (described below)
            return fetch(pokemonAbilitiesURL); //fetches data for random pokemon moves
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            movesList = response.results;
            return fetch(playerPokemonLocation); //fetches data for player pokemon determined by user input
        })
        .then(function (response) {
            return response.json(); //jsonifies the player pokemon data
        })
        .then(function (playerPokemon) {
            console.log('things are going swimmingly, you have fetched a pokemon for yourself using the URL from the announcement and you should see ' + playerPokemon.name + ' below');
            console.log(playerPokemon); //console logs the playerPokemon object
            playerPokemonActual = playerPokemon; //stores our playerPokemon object for the battle
            return fetch(enemyPokemonLocation); //fetches data for enemy pokemon determined by user input
        })
        .then(function (response) {
            return response.json(); //jsonifies the enemy pokemon data
        })
        .then(function (enemyPokemon) {
            console.log('youre almost there buckeroo, you have fetched an enemy pokemon using the URL from the announcement and you should see ' + enemyPokemon.name + ' below');
            console.log(enemyPokemon); //console logs the enemy pokemon object
            enemyPokemonActual = enemyPokemon; //stores our enemyPokemon object for the battle
            runBattle(); //runs a battle between two pokemon and tells the user what happened
        })
}

//functions for processing the jsons

function announcement(json) {
    console.log("you have successfully fetched the pokemon list. here it is:");
    console.log(json);
    //checks if results is occupied, if it is, it removes everything
    while (results.firstChild) {
        results.removeChild(results.firstChild);
    }

    // creation of battle tag which will describe the battle and return the results
    let announcement = document.createElement('div');

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
            playerPokemonLocation = json.results[i];
            playerPokemonParagraph.textContent = playerPokemonLocation.name.toUpperCase();
            playerPokemonLocation = json.results[i].url;
        }

        if (enemySelection.value.toLowerCase() === json.results[i].name) {
            enemyPokemonLocation = json.results[i];
            enemyPokemonParagraph.textContent = enemyPokemonLocation.name.toUpperCase();
            enemyPokemonLocation = json.results[i].url;
        }
    }
    //appending the results onto the section "results" for display
    announcement.appendChild(playerPokemonParagraph);
    announcement.appendChild(versus);
    announcement.appendChild(enemyPokemonParagraph);
    results.appendChild(announcement);
    console.log('it looks like the announcement has succeeded, you should see the URLs for the two pokemon you selected below');
    console.log(playerPokemonLocation);
    console.log(enemyPokemonLocation);
}

function runBattle() {
    const playerPokemonName = playerPokemonActual.name;
    const enemyPokemonName = enemyPokemonActual.name;
    let playerHealth = 100;
    let enemyHealth = 50;

    console.log('a battle is happening!');
    console.log('your pokemon is ' + playerPokemonName);
    console.log('your enemy is ' + enemyPokemonName);
    console.log('hey the moves list made it all the way here!');
    console.log(movesList);

    let playerIsDead = false;
    let enemyIsDead = false;
    let battle = document.createElement('div');
    let battleDescription = document.createElement('p');
    let deathDescription = document.createElement('p');
    deathDescription.textContent = 'neither pokemon has died!';

    while (!playerIsDead && !enemyIsDead) {
            let playerMoveResults = document.createElement('p');
            let randomNum = Math.floor(Math.random() * Math.floor(325));
            let randomMove = movesList[randomNum];
            playerMoveResults.textContent = playerPokemonName + ' used ' + randomMove.name;

            enemyHealth -= 10;

            if (enemyHealth <= 0) {
                enemyIsDead = true;
                break;
            }

            battleDescription.appendChild(playerMoveResults); //player pokemon picks a random move that gets announced

            let enemyMoveResults = document.createElement('p');
            randomNum = Math.floor(Math.random() * Math.floor(325));
            randomMove = movesList[randomNum];
            enemyMoveResults.textContent = enemyPokemonName + ' used ' + randomMove.name;

            playerHealth -= 10;

            if (playerHealth <= 0) {
                playerIsDead = true;
                break;
            }
            battleDescription.appendChild(enemyMoveResults);
    }

    if (playerIsDead) {
        deathDescription.textContent = playerPokemonName + ' has died, please go to a pokecenter';
    }

    if (enemyIsDead) {
        deathDescription.textContent = 'you have defeated ' + enemyPokemonName + ', congratulations!';
    }

    //player pokemon picks a move
    //announcer announces the move
    
    //enemy pokemon picks a move
    //announcer announces the move
    battleDescription.appendChild(deathDescription);
    battle.appendChild(battleDescription);
    results.appendChild(battle);
}

function isSuperEffective(move, pokemon) {
    if (pokemon.name === 'zubat') {
        return true;
    }
    
    if (move.name === 'tackle') {
        return true;
    } else {
        return false;
    }
}