function game1() {
	const gameScreen = document.querySelector('.game-screen');
	gameScreen.innerHTML = ''; // Czyszczenie zawartości
	populateHTML()
	buttonCreator();
	playerAnimations();

}

const choices = [
	{ rock: "scissors" },
	{ paper: "rock" },
	{ scissors: "paper" }
];

function buttonCreator() {
	const gameScreen = document.querySelector('.game-screen');


	gameScreen.style.display = 'flex';
	gameScreen.style.flexDirection = 'row';
	gameScreen.style.alignItems = 'flex-end';
	gameScreen.style.justifyContent = 'space-around';
	gameScreen.style.padding = '3rem';

	let gameButtonContainer = document.querySelector('.game-button-container');

	for (let i = 0; i < choices.length; i++) {
		const choice = choices[i];
		const choiceKey = Object.keys(choice)[0]; // Pobieranie klucza (nazwy) z obiektu
		const button = document.createElement('button');
		button.textContent = choiceKey; // Ustawianie tekstu przycisku na podstawie klucza
		button.id = `${choiceKey}`; // Ustawianie id przycisku na podstawie klucza
		button.classList.add('ingameButtons');

		button.addEventListener('click', function () {
			const playerChoice = this.id; // Pobieranie wyboru gracza z id przycisku
			const computerSelection = computerChoice(); // Pobieranie wyboru komputera
			calculateResults(playerChoice, computerSelection); // Wywołanie funkcji obliczającej wyniki
		});

		gameButtonContainer.appendChild(button); // Dodawanie przycisku do kontenera
	}


}


function populateHTML() {
	const gameScreen = document.querySelector('.game-screen');

	gameScreen.innerHTML = 
`<div class="score"></div>
<div class="mainGame">
	
</div>
<div class="game-button-container"></div>`

}


 
let computerChoice = () => {
	let randomNum = Math.floor(Math.random() * 3); // Usunięto (0) z Math.random(), jest to zbędne
	const choiceKeys = Object.keys(choices[randomNum]);
	return choiceKeys[0]; // Zwraca klucz wyboru komputera, np. "rock"
};

function calculateResults(playerChoice, computerChoiceResult) {




	if (playerChoice === computerChoiceResult) {
		console.log(`Remis! Oboje wybraliście ${playerChoice}.`);
		return `draw`;
	}

	const winConditions = {
		rock: 'scissors',
		paper: 'rock',
		scissors: 'paper'
	};

	if (computerChoiceResult === winConditions[playerChoice]) {
		console.log(`Wygrałeś! ${playerChoice} bije ${computerChoiceResult}.`)
		return 'win'; // Gracz wygrywa
	} else {
		console.log(`Przegrałeś! ${computerChoiceResult} bije ${playerChoice}.`)
		return 'lose'; // Gracz wygrywa
	}
}

const result = calculateResults(playerChoice, computerChoiceResult);
function animateCharacters(result){




}




















function calculatingResults(playerChoice, computerChoice) {

}