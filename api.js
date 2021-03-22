//creating variable to store the API url
const speciesURL = 'https://pokeapi.co/api/v2/pokemon-species/';

//For personal testing
const working = " is working!!!!!111";

//TAG selectors
const submitForm = document.querySelector('form');
const results = document.querySelector('.results');

//Runs the fetchresults function when the submit button is clicked
submitForm.addEventListener('submit', fetchResults);

function fetchResults(e) {
    // prevent breakage in the code
    //form submit refreshes by default
    e.preventDefault();

    console.log("fetchresults" + working);
    fetchSource = speciesURL;

    fetch(fetchSource)
        .then(function (result) {
            return result.json();
        })
        .then(function (json) {
            console.log(json);
            displayResults(json);
        })
}

function displayResults(json) {
    console.log("displayresults" + working + " but doesn't do anything")
    
    while (results.firstChild) {
        results.removeChild(results.firstChild);
    }

    for (i = 0; i < json.results.length; i++) {
        let para = document.createElement('p');
        para.textContent = json.results[i].name;
        results.appendChild(para);
    }
    
}