function game1() {
	const gameScreen = document.querySelector('.game-screen');
	gameScreen.innerHTML = ''; // Czyszczenie zawartości
	populateHTML()
	buttonCreator();


}

const choices = [
	{ rock: "scissors" },
	{ paper: "rock" },
	{ scissors: "paper" }
];

function buttonCreator() {
	const gameScreen = document.querySelector('.game-screen');




	let gameButtonContainer = document.querySelector('.game-button-container');

	for (let i = 0; i < choices.length; i++) {
		const choice = choices[i];
		const choiceKey = Object.keys(choice)[0];
		const button = document.createElement('button');
		button.textContent = choiceKey;
		button.id = `${choiceKey}`;
		button.classList.add('ingameButtons');

		button.addEventListener('click', function () {
			const playerChoice = this.id;
			const computerSelection = computerChoice();
			const result = calculateResults(playerChoice, computerSelection);
			animateCharacters(result);
		});

		gameButtonContainer.appendChild(button); // Dodawanie przycisku do kontenera
	}


}


function populateHTML() {
	const gameScreen = document.querySelector('.game-screen');

	gameScreen.innerHTML =
		`<div class="score">random test</div>
		<div class="mainGame">
			<img src="./assets/images/game1/player1/cat-idle.webp" width="400px" height="400px" alt="">
			<img src="./assets/images/game1/player1/ai-idle.webp" width="400px" height="400px" alt="">
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
		return ['draw', `${playerChoice}`, `${computerChoiceResult}`]; // Gracz wygrywa
	}

	const winConditions = {
		rock: 'scissors',
		paper: 'rock',
		scissors: 'paper'
	};

	if (computerChoiceResult === winConditions[playerChoice]) {
		console.log(`Wygrałeś! ${playerChoice} bije ${computerChoiceResult}.`)
		return ['win', `${playerChoice}`, `${computerChoiceResult}`]; // Gracz wygrywa
	} else {
		console.log(`Przegrałeś! ${computerChoiceResult} bije ${playerChoice}.`)
		return ['lose', `${playerChoice}`, `${computerChoiceResult}`]; // Gracz wygrywa
	}
}


function clearMainGame() {
	const mainGame = document.querySelector('.mainGame');

	while (mainGame.firstChild) {
		mainGame.removeChild(mainGame.firstChild);
	}
}
function animateCharacters(result) {
	clearMainGame();



	const mainGame = document.querySelector('.mainGame');

	mainGame.style.display = "flex";
	mainGame.style.flex = '1';
	mainGame.style.justifyContent = "space-around";

	const image1 = new Image;
	const image2 = document.createElement('img');
	image1.src = './assets/images/game1/player1/cat-idle.webp';
	image2.src = './assets/images/game1/player1/ai-idle.webp';
	image1.style.width = '400px'
	image1.style.height = '400px'
	image2.style.width = '400px'
	image2.style.height = '400px'

	mainGame.appendChild(image1);
	mainGame.appendChild(image2);

	if (result[0] === 'win') {
		image1.src = './assets/images/game1/player1/cat-winner.webp';
		image2.src = './assets/images/game1/player1/ai-loser.webp';
	} else if (result[0] === 'lose') {
		image1.src = './assets/images/game1/player1/cat-loser.webp';
		image2.src = './assets/images/game1/player1/ai-winner.webp';



	}

	mainGame.appendChild(image1);
	mainGame.appendChild(image2);

}

