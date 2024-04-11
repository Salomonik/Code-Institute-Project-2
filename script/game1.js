function game1() {
	const gameScreen = document.querySelector('.game-screen');
	document.querySelector('.modal').style.display = 'none';
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
			updateScore(result);
			animateCharacters(result);
		});

		gameButtonContainer.appendChild(button); // Dodawanie przycisku do kontenera
	}


}


function populateHTML() {
	const gameScreen = document.querySelector('.game-screen');

	gameScreen.innerHTML =
		`<div class="score"><span id='p1Score'>0</span>:<span id='p2Score'>0</span></div>
		<div class="mainGame ">
			<img class="game-image" src="./assets/images/game1/player1/cat-idle.webp" alt="">
			<img class="game-image" src="./assets/images/game1/player1/ai-idle.webp" alt="">
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


function animateItems(result, image1, image2) {

	if (result[1] === 'rock') {
		image1.src = `./assets/images/game1/player1/cat-${result[1]}.webp`;
		image2.src = `./assets/images/game1/player1/ai-${result[2]}.webp`;
	}
	if (result[1] === 'paper') {
		image1.src = `./assets/images/game1/player1/cat-${result[1]}.webp`;
		image2.src = `./assets/images/game1/player1/ai-${result[2]}.webp`;
	}
	if (result[1] === 'scissors') {
		image1.src = `./assets/images/game1/player1/cat-${result[1]}.webp`;
		image2.src = `./assets/images/game1/player1/ai-${result[2]}.webp`;
	}

}




function animateCharacters(result) {
	clearMainGame();
	const mainGame = document.querySelector('.mainGame');







	const image1 = document.createElement('img');
	const image2 = document.createElement('img');
	image1.classList.add('game-image');
	image2.classList.add('game-image');

	image1.src = './assets/images/game1/player1/cat-idle.webp';
	image2.src = './assets/images/game1/player1/ai-idle.webp';






	mainGame.appendChild(image1);
	mainGame.appendChild(image2);


	if (result[0] === 'win' || result[0] === 'lose' || result[0] === 'draw') {
		animateItems(result, image1, image2);

		setTimeout(() => {
			image1.src = './assets/images/game1/player1/cat-idle.webp';
			image2.src = './assets/images/game1/player1/ai-idle.webp';
		}, 1000)
	};


}


function updateScore(result) {

	const winDisplay = document.getElementById('p1Score');
	const loseDisplay = document.getElementById('p2Score');
	const drawDisplay = document.getElementById('draw-counter');


	let winCounter = parseInt(winDisplay.textContent)
	let loseCounter = parseInt(loseDisplay.textContent)


	if (result[0] === 'win') {
		winCounter++;
		winDisplay.textContent = winCounter;
	} else if (result[0] === 'lose') {
		loseCounter++;
		loseDisplay.textContent = loseCounter;
	} else if (result[0] === 'draw') {
		drawCounter++;
		drawDisplay.textContent = drawCounter;
	}

	checkEndGame(winCounter, loseCounter)

}


function checkEndGame(wins, lose) {



	let message = wins >= 1 ? 'U WON' : 'U LOSE';

	let endGameModal = document.querySelector('#endGameModal');
	endGameModal.style.display = 'block';
	document.querySelector('#endGameMessage').textContent = message;
	document.querySelector('#resetGameButton').addEventListener('click', game1)



}