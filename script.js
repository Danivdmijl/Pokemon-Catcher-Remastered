let shinyChance = 0.5; // Set shiny chance to 50%
let maxPokemonHP = 100;
let pokemonHP = maxPokemonHP;

const hpText = document.getElementById("js--hp-text");
const hpFill = document.getElementById("js--hp-fill");

const pokemonImage = document.getElementById("js--pokemon-image");
let randomNumber = Math.floor(Math.random() * 897 + 1);

console.log(randomNumber)


let pokemon = fetch("https://pokeapi.co/api/v2/pokemon/" + randomNumber)
.then(function(response){
    return response.json();
})
.then(function(realData){
    console.log(realData);
    pokemonName = realData.name;
    pokemonText.innerText = "A wild " + pokemonName + " has appeared";
    pokemonImage.src = realData.sprites.front_default;
});


const catchButton = document.getElementById("js--catch-button");
const pokemonText = document.getElementById("js--pokemon-text");
let pokemonName = "";

let pokemonGamePlayed = false;

const caughtCountertext = document.getElementById("js--caught-counter");
let caughtCounter = 0;
caughtCountertext.innerText = "Pokemon Caught: " + caughtCounter;

catchButton.onclick = function() {
    // Disable the button to prevent spam clicks
    catchButton.disabled = true;
    runButton.disabled = true; // Optionally disable the Run button too

    if (!fainting) {
        const catchRate = calculateCatchRate(); // Calculate the catch rate
        const isCaught = Math.random() < catchRate; // Determine if the Pokémon is caught

        if (isCaught) {
            pokemonText.innerText = "Pokemon Caught!";
            caughtCounter++;
            caughtCountertext.innerText = "Pokemon Caught: " + caughtCounter;
            addToPokedex({ id: randomNumber, name: pokemonName, sprites: { front_default: pokemonImage.src } });

            // Apply the catch effect
            pokemonImage.classList.add("catch-effect");

            // Remove the effect class after the animation duration
            setTimeout(() => {
                pokemonImage.classList.remove("catch-effect");
            }, 500); // Match this to the duration of your CSS animation
        } else {
            pokemonText.innerText = "The Pokémon escaped!";
        }
        
        // Load a new Pokémon after a brief delay
        setTimeout(() => {
            loadNewPokemon(); // Load new Pokémon
            catchButton.disabled = false; // Re-enable the Catch button
            runButton.disabled = false; // Re-enable the Run button
        }, 2000); // Delay to allow the catch message to display
    }
};

function idkwtfditeigword(){
    randomNumber = Math.floor(Math.random() * 897 + 1);
            console.log(randomNumber);
            fetch("https://pokeapi.co/api/v2/pokemon/" + randomNumber)
            .then(function(response){
                return response.json();
            })
            .then(function(realData){
                console.log(realData);
                pokemonImage.src = realData.sprites.front_default;
                pokemonName = realData.name;
                pokemonText.innerText = "A wild " + pokemonName + " has appeared";
                setTimeout(nieuwepokemon, 750);
            });        
}

const runButton = document.getElementById("js--run-button");
console.log(runButton);

runButton.onclick = function() {
    // Disable the button to prevent spam clicks
    runButton.disabled = true;
    catchButton.disabled = true; // Optionally disable the Catch button too

    if (!fainting) {
        const runNumber = Math.floor(Math.random() * 3);
        if(runNumber === 0) {
            pokemonText.innerText = "You can't run!";
            setTimeout(() => { 
                pokemonText.innerText = "A wild " + pokemonName + " has appeared!"; 
                runButton.disabled = false; // Re-enable the Run button
                catchButton.disabled = false; // Re-enable the Catch button
            }, 1750);
        } else {
            pokemonText.innerText = "You ran away!";
            // Load a new Pokémon after a brief delay
            setTimeout(() => {
                loadNewPokemon(); // Load new Pokémon
                runButton.disabled = false; // Re-enable the Run button
                catchButton.disabled = false; // Re-enable the Catch button
            }, 2000); // Delay to allow the run message to display
        }
    }
};

function nieuwepokemon(){
    pokemonGamePlayed = false
}

const pokedexButton = document.getElementById("js--pokedex-button");
const pokedexModal = document.getElementById("js--pokedex-modal");
const pokedexClose = document.getElementById("js--pokedex-close");
const pokedexList = document.getElementById("js--pokedex-list");

// Load Pokedex from localStorage or initialize it
let pokedex = JSON.parse(localStorage.getItem('pokedex')) || [];

// Function to add a Pokemon to the Pokedex (only if not already added)
function addToPokedex(pokemon, isShiny = false) {
    // Avoid duplicates of the same Pokémon with different shiny statuses
    if (!pokedex.some(p => p.id === pokemon.id && p.isShiny === isShiny)) {
        pokedex.push({ 
            id: pokemon.id, 
            name: pokemon.name + (isShiny ? " (Shiny)" : ""), // Append "(Shiny)" if the Pokémon is shiny
            image: isShiny ? pokemon.sprites.front_shiny : pokemon.sprites.front_default,
            isShiny: isShiny
        });
        localStorage.setItem('pokedex', JSON.stringify(pokedex)); // Save to localStorage
    }
}

function updatePokedexUI() {
    pokedexList.innerHTML = '';
    pokedex.forEach(pokemon => {
        let li = document.createElement('li');
        li.innerHTML = `
            <img src="${pokemon.image}" alt="${pokemon.name}" class="pokedex-image ${pokemon.isShiny ? "shiny-effect" : ""}">
            <span>${pokemon.name}</span>
        `;
        pokedexList.appendChild(li);
    });
}

// Open the Pokedex
pokedexButton.onclick = function() {
    updatePokedexUI();
    pokedexModal.style.display = "block";
}

// Close the Pokedex
pokedexClose.onclick = function() {
    pokedexModal.style.display = "none";
}

// Close modal if clicked outside the content
window.onclick = function(event) {
    if (event.target === pokedexModal) {
        pokedexModal.style.display = "none";
    }
}

function idkwtfditeigword() {
    randomNumber = Math.floor(Math.random() * 897 + 1);
    fetch("https://pokeapi.co/api/v2/pokemon/" + randomNumber)
        .then(function(response) {
            return response.json();
        })
        .then(function(realData) {
            const isShiny = Math.random() < shinyChance; // Uses shinyChance for shiny probability

            // Set Pokémon image based on whether it's shiny
            if (isShiny) {
                pokemonImage.src = realData.sprites.front_shiny;
                pokemonImage.classList.add("shiny-effect");
                pokemonText.innerText = "A shiny " + realData.name + " has appeared!";
            } else {
                pokemonImage.src = realData.sprites.front_default;
                pokemonImage.classList.remove("shiny-effect");
                pokemonText.innerText = "A wild " + realData.name + " has appeared!";
            }

            pokemonName = realData.name;
            setTimeout(nieuwepokemon, 750);
        });
}

const resetPokedexButton = document.getElementById("js--reset-pokedex-button");

resetPokedexButton.onclick = function() {
    // Show confirmation prompt
    let confirmReset = confirm("Are you sure you want to reset your Pokedex? This will delete all captured Pokémon data!");
    
    if (confirmReset) {
        // Clear Pokedex data from localStorage and reset the Pokedex array
        localStorage.removeItem('pokedex');
        pokedex = []; // Reset the in-memory pokedex array
        updatePokedexUI(); // Update the UI to reflect the cleared Pokedex
        alert("Pokedex has been reset.");
    }
};

function updateHPBar() {
    const hpPercentage = pokemonHP / maxPokemonHP;
    const hpFill = document.getElementById("js--hp-fill");
    const hpText = document.getElementById("js--hp-text");

    // Update HP bar scale
    hpFill.style.transform = `scaleX(${hpPercentage})`; 
    hpText.innerText = `HP: ${pokemonHP}/${maxPokemonHP}`;

    // Change HP bar color based on percentage
    if (hpPercentage > 0.5) {
        hpFill.style.backgroundColor = "var(--green)"; // Above 50%
    } else if (hpPercentage > 0.25) {
        hpFill.style.backgroundColor = "var(--orange)"; // Between 25% and 50%
    } else {
        hpFill.style.backgroundColor = "var(--red)"; // Below 25%
    }
}

// Function to calculate the catch rate
function calculateCatchRate() {
    const baseCatchRate = 0.5; // 50% base catch chance
    const catchModifier = 0.5; // Adjust how much HP affects catch rate
    const hpFactor = (maxPokemonHP - pokemonHP) / maxPokemonHP; // Factor based on lost HP
    return Math.min(1, baseCatchRate + (hpFactor * catchModifier)); // Ensuring it caps at 1
}

function loadNewPokemon() {
    fainting = false; // Reset fainting flag for the new Pokémon

    // Fetch a new Pokémon and update display
    randomNumber = Math.floor(Math.random() * 897 + 1);
    fetch("https://pokeapi.co/api/v2/pokemon/" + randomNumber)
        .then(function(response) {
            return response.json();
        })
        .then(function(realData) {
            // Update Pokémon name
            pokemonName = realData.name;
            document.getElementById("js--pokemon-name").innerText = pokemonName;

            // Update Pokémon image
            pokemonImage.src = realData.sprites.front_default;
            pokemonText.innerText = "A wild " + pokemonName + " has appeared!";

            // Update Pokémon gender and style it
            const genderSpan = document.getElementById("js--pokemon-gender");
            let gender;
            if (realData.gender_rate === -1) {
                gender = "⚥";
            } else {
                gender = Math.random() < 0.5 ? "♂" : "♀";
            }
            genderSpan.innerText = gender;
            genderSpan.style.color = gender === "Male" ? "var(--blue)" : "var(--pink)";

            // Update Pokémon level (simulate a random level between 1 and 100)
            const level = Math.floor(Math.random() * 100) + 1;
            document.getElementById("js--pokemon-level").innerText = `Lv. ${level}`;

            // Set max HP based on the Pokémon's actual base HP stat
            maxPokemonHP = realData.stats[0].base_stat; // This is usually the HP stat in the API
            pokemonHP = maxPokemonHP; // Set current HP to max HP
            updateHPBar();

            // Apply the popIn animation every time a new Pokémon is loaded
            pokemonImage.style.animation = "popIn 0.5s ease-out";
        });
}

let fainting = false; // Flag to track if the Pokémon is fainting

const flamethrowerButton = document.querySelector(".attack-button[data-damage='30']");
const hyperBeamButton = document.querySelector(".attack-button[data-damage='40']");
const quickAttackButton = document.querySelector(".attack-button[data-damage='10']");
const thunderboltButton = document.querySelector(".attack-button[data-damage='20']");

document.querySelectorAll(".attack-button").forEach(button => {
    button.addEventListener("click", () => {
        // Prevent actions if the Pokémon is fainting
        if (fainting) return;

        const damage = parseInt(button.getAttribute("data-damage"));
        pokemonHP = Math.max(0, pokemonHP - damage);
        updateHPBar();

        // If HP reaches 0, faint the Pokémon and load a new one
        if (pokemonHP === 0) {
            console.log("Pokemon fainted, clearing any active attack animations");

            fainting = true; // Set the fainting flag

            // Clear any attack animations
            pokemonImage.style.animation = "none";
            pokemonImage.classList.remove("flameHit", "hyperBeam", "quickAttack", "thunderBolt");

            // Trigger reflow to clear all animation states
            void pokemonImage.offsetWidth;

            // Start fainting animation
            pokemonText.innerText = `${pokemonName} fainted!`;
            pokemonImage.classList.add("faint-effect");

            setTimeout(() => {
                pokemonImage.classList.remove("faint-effect"); // Clear the faint effect
                fainting = false; // Reset the fainting flag
                loadNewPokemon(); // Load a new Pokémon
            }, 1000); // 1 second matches the animation duration
        }

        // Reset the animation style
        pokemonImage.style.animation = "none"; 
        pokemonImage.offsetHeight; // Trigger reflow

        // Apply the appropriate animation based on the attack
        if (button === flamethrowerButton) {
            pokemonImage.style.animation = "flameHit 1.2s ease-out";
            console.log("Flamethrower effect triggered!");
        } else if (button === hyperBeamButton) {
            pokemonImage.style.animation = "hyperBeam 1s ease-out";
            console.log("Hyper Beam effect triggered!");
        } else if (button === quickAttackButton) {
            pokemonImage.style.animation = "quickAttack 0.3s ease-out";
            console.log("Quick Attack effect triggered!");
        } else if (button === thunderboltButton) {
            pokemonImage.style.animation = "thunderBolt 0.5s ease-in-out";
            console.log("Thunderbolt effect triggered!");
        }
    });
});

loadNewPokemon();
