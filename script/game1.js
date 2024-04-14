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

	let gameButtonContainer = document.querySelector('.game-button-container');
	let buttonIcons = [
		'<i class="fa-regular fa-hand-back-fist"></i>',
		'<i class="fa-regular fa-hand"></i>',
		'<i class="fa-regular fa-hand-scissors"></i>'
	]


	for (let i = 0; i < choices.length; i++) {
		const choice = choices[i];
		const iconChoice = buttonIcons[i];
		const choiceKey = Object.keys(choice)[0];
		const button = document.createElement('button');
		button.innerHTML = iconChoice;
		button.id = `${choiceKey}`;
		button.classList.add('ingameButtons',);

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
		`<div class="score">
		<p id="playerName">player Name</p>
		<div><span id='p1Score'>0</span>:<span id='p2Score'>0</span></div>
		<p>AI</p>
		</div>
		
		
		
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

		if (result[0] === 'win') {
			setTimeout(() => {
				image1.src = './assets/images/game1/player1/cat-winner.webp';
				image2.src = './assets/images/game1/player1/ai-loser.webp';
			}, 1000)
		}
		if (result[0] === 'lose') {
			setTimeout(() => {
				image1.src = './assets/images/game1/player1/cat-loser.webp';
				image2.src = './assets/images/game1/player1/ai-winner.webp';
			}, 1000)
		}
		if (result[0] === 'draw') {
			setTimeout(() => {
				image1.src = './assets/images/game1/player1/cat-idle.webp';
				image2.src = './assets/images/game1/player1/ai-idle.webp';
			}, 1000)
		}


	};


}


function updateScore(result) {

	const winDisplay = document.getElementById('p1Score');
	const loseDisplay = document.getElementById('p2Score');



	let winCounter = parseInt(winDisplay.textContent)
	let loseCounter = parseInt(loseDisplay.textContent)


	if (result[0] === 'win') {
		winCounter++;
		winDisplay.textContent = winCounter;
	} else if (result[0] === 'lose') {
		loseCounter++;
		loseDisplay.textContent = loseCounter;
	}





	/*	 */

	checkEndGame(winCounter, loseCounter)


	const images = document.querySelectorAll('.game-image');
	if (winCounter === 10) {  // Assuming 10 as an example threshold for game end
		images.innerHTML = `<img src="./assets/images/game1/player1/cat-winner.webp" alt="">
		<img src="./assets/images/game1/player1/ai-loser.webp" alt="">`;

	}
	if (loseCounter === 10) {  // Assuming 10 as an example threshold for game end
		images.innerHTML = `<img src="./assets/images/game1/player1/cat-loser.webp" alt="">
		<img src="./assets/images/game1/player1/ai-winner.webp" alt="">`;
	}


}

function checkEndGame(wins, loses) {
	if (wins === 10 || loses === 10) {  // Assuming 10 as an example threshold for game end
		displayEndGameModal(wins === 10 ? 'U WON' : 'U LOSE');
	}
}





function displayEndGameModal(message) {
	const endGameModal = document.querySelector('#endGameModal'); // Upewnij się, że masz taki element w HTML.
	endGameModal.style.display = 'block';
	document.querySelector('#endGameMessage').textContent = message;
	document.querySelector('#resetGameButton').addEventListener('click', resetGame);

	const buttons = document.querySelector('.game-screen').querySelectorAll('button');
	buttons.forEach(button => {
		button.style.display = 'none';
	});
}

function resetGame() {
	// Resetuje grę
	game1(); // Zakładam, że funkcja game1() resetuje grę
	const endGameModal = document.querySelector('#endGameModal');
	endGameModal.style.display = 'none';

	// Przywraca przyciski do widoczności
	const buttons = document.querySelectorAll('.game-screen button');
	buttons.forEach(button => {
		button.style.display = 'block';
	});
}