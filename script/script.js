let buttons = document.querySelectorAll('.game-container');
buttons.forEach(button => {
	button.addEventListener('click', async () => {
		const gameId = button.id; // upewnij się, że każdy przycisk ma ustawione id
		await loadingScreen();
		gameStartScreen(gameId);


	});
});

function gameSelection(gameId) {
	const gameScreen = document.querySelector('.game-screen');
	gameScreen.innerHTML = ''; // Czyszczenie zawartości

	switch (gameId) {
		case 'game1': // Użycie stringów jako identyfikatorów
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
				resolve(); // Zakończ promise po załadowaniu paska
			} else {
				width++;
				document.getElementById("myBar").style.width = width + "%";
			}
		}
	});
}

function gameStartScreen(gameId) {
	const gameScreen = document.querySelector('.game-screen');
	const startButtonWrapper = document.createElement('div');
	startButtonWrapper.classList.add('startButtonWrapper');
	gameScreen.innerHTML = ''; // Czyszczenie zawartości
	gameScreen.style.backgroundColor = '#9BD9C1';


	selectPlayerName();


	const startButton = document.createElement('button');
	startButton.classList.add('ingameButtons', 'shadow');
	startButton.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
	startButton.addEventListener('click', () => gameSelection(gameId));
	startButtonWrapper.appendChild(startButton);
	gameScreen.appendChild(startButtonWrapper);


}




function selectPlayerName() {
	const gameScreen = document.querySelector('.game-screen');
	const playerNameWrapper = document.createElement('div');
	playerNameWrapper.classList.add('playerNameWrapper');
	const playerNameLabel = document.createElement('label');
	playerNameLabel.textContent = 'Max 3 characters'

	const playerNameInput = document.createElement('input');
	playerNameInput.value = localStorage.getItem('playerName') || '';
	playerNameInput.type = 'text';
	playerNameInput.maxLength = 3;
	playerNameInput.addEventListener('focus', function () {
		this.select(); // Automatycznie zaznacza cały tekst
	});
	const playerNameBtn = document.createElement('button');
	playerNameBtn.textContent = 'Set Name';

	playerNameBtn.addEventListener('click', () => {
		const playerName = playerNameInput.value;
		if (playerName) {
			localStorage.setItem('playerName', playerName); // Zapisanie nazwy gracza
		}
	});

	playerNameWrapper.appendChild(playerNameLabel);
	playerNameWrapper.appendChild(playerNameInput);
	playerNameWrapper.appendChild(playerNameBtn);
	gameScreen.appendChild(playerNameWrapper);

}



