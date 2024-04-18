// Adds event listeners to buttons for selecting games.
let buttons = document.querySelectorAll('.game-container');
buttons.forEach(button => {
	button.addEventListener('click', async () => {
		const gameId = button.id; // Retrieves game ID from button.
		await loadingScreen(); // Displays loading screen before game starts.
		gameStartScreen(gameId); // Initiates game start screen setup.


	});
});

// Loads game based on gameId and updates the display accordingly.
function gameSelection(gameId) {
	const gameScreen = document.querySelector('.game-screen');
	gameScreen.innerHTML = ''; // Clears existing content.

	switch (gameId) {
		case 'game1':
			game1();
			break;
		case 'game2':
			game2();
			break;
		case 'game3':
			game3();
			break;
		default:
			break;
	}
}
// Displays a loading screen with progress bar.
function loadingScreen() {

	return new Promise((resolve, reject) => {
		const screen = document.querySelector('.game-screen');
		screen.style.backgroundColor = 'black';
		screen.innerHTML = `
			<div id="myProgress">LOADING...
				<div id="myBar"></div>
				<div class="hidden-image">
				<img src="./assets/images/game1/player1/ai-idle.webp" alt="">
					<img src="./assets/images/game1/player1/ai-loser.webp" alt="">
					<img src="./assets/images/game1/player1/ai-scissors.webp" alt="">
					<img src="./assets/images/game1/player1/ai-rock.webp" alt="">
					<img src="./assets/images/game1/player1/ai-paper.webp" alt="">
					<img src="./assets/images/game1/player1/ai-winner.webp" alt="">
					<img src="./assets/images/game1/player1/cat-idle.webp" alt="">
					<img src="./assets/images/game1/player1/cat-loser.webp" alt="">
					<img src="./assets/images/game1/player1/cat-scissors.webp" alt="">
					<img src="./assets/images/game1/player1/cat-rock.webp" alt="">
					<img src="./assets/images/game1/player1/cat-paper.webp" alt="">
					<img src="./assets/images/game1/player1/cat-winner.webp" alt="">
				</div>
			</div>`;

		let width = 1;
		let id = setInterval(frame, 10);
		function frame() {
			if (width >= 100) {
				clearInterval(id);
				resolve(); // Resolves the promise once loading is complete.
			} else {
				width++;
				document.getElementById("myBar").style.width = width + "%";
			}
		}
	});
}
// Sets up the screen where the player can start the game.
function gameStartScreen(gameId) {
	const gameScreen = document.querySelector('.game-screen');
	const startButtonWrapper = document.createElement('div');
	startButtonWrapper.classList.add('startButtonWrapper');
	gameScreen.innerHTML = ''; // Clears the game screen.
	gameScreen.style.backgroundColor = '#9BD9C1';


	selectPlayerName(); // Allows the player to set or update their name.

	const startButton = document.createElement('button');
	startButton.classList.add('ingameButtons', 'shadow');
	startButton.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
	startButton.addEventListener('click', () => gameSelection(gameId));
	startButtonWrapper.appendChild(startButton);
	gameScreen.appendChild(startButtonWrapper);

}
// Allows the player to enter or change their name.
function selectPlayerName() {
	const gameScreen = document.querySelector('.game-screen');
	gameScreen.style.backgroundImage = "url('./assets/images/background/background2.webp')"
	const playerNameWrapper = document.createElement('div');
	playerNameWrapper.classList.add('playerNameWrapper');
	const playerNameLabel = document.createElement('label');
	playerNameLabel.textContent = 'Max 3 characters'

	const playerNameInput = document.createElement('input');
	playerNameInput.value = localStorage.getItem('playerName') || '';
	playerNameInput.type = 'text';
	playerNameInput.maxLength = 3;
	playerNameInput.addEventListener('focus', function () {
		this.select(); // Selects all text in the input box on focus for easy editing.
	});
	const playerNameBtn = document.createElement('button');
	playerNameBtn.textContent = 'Set Name';

	playerNameBtn.addEventListener('click', () => {
		const playerName = playerNameInput.value;
		if (playerName) {
			localStorage.setItem('playerName', playerName); // Saves the player's name in local storage.
		}
	});

	playerNameWrapper.appendChild(playerNameLabel);
	playerNameWrapper.appendChild(playerNameInput);
	playerNameWrapper.appendChild(playerNameBtn);
	gameScreen.appendChild(playerNameWrapper);

}

// form validation
// Adds event listener for form submission and performs client-side validation.

document.addEventListener('DOMContentLoaded', function () {
	const form = document.querySelector('form');

	if (form) {
		form.addEventListener('submit', function (e) {
			e.preventDefault(); // Prevents form from submitting traditionally.
			console.log('Form submission prevented.');

			let isValid = true; // Tracks form validity.

			const inputs = this.querySelectorAll('input');
			inputs.forEach(input => {
				if (!input.checkValidity()) {
					isValid = false;
					input.classList.add('error');
				}

			})
			// Submits form if all inputs are valid.
			if (isValid) {
				console.log('form submited');
				form.submit();
			} else {
				console.log('validation error');
			}


		})
	}


})