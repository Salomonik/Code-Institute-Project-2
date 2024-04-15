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
	gameScreen.innerHTML = ''; // Czyszczenie zawartości
	gameScreen.style.backgroundColor = '#9BD9C1';

	const startButton = document.createElement('button');


	startButton.classList.add('startGameBtn', 'shadow');
	startButton.textContent = 'Start Game';
	startButton.addEventListener('click', () => gameSelection(gameId));
	gameScreen.appendChild(startButton);

	selectPlayerName();



}




function selectPlayerName() {
	const gameScreen = document.querySelector('.game-screen');

	let playerNameField = document.querySelector('#p1Score');
	const playerNameInput = document.createElement('input'); // Stworzenie pola input dla nazwy gracza

	playerNameInput.type = 'text'; // Ustawienie typu input na tekstowy

	let playerNameBtn = document.createElement('button');
	playerNameBtn.textContent = 'Set Name'; // Tekst przycisku

	playerNameBtn.addEventListener('click', () => {
		const playerName = playerNameInput.value; // Pobranie wartości z pola input

		if (playerName) {
			playerNameField = '';
			playerNameField.textContent = playerName; // Ustawienie nazwy gracza w polu wyniku
		}
	});

	gameScreen.appendChild(playerNameInput); // Dodanie pola input
	gameScreen.appendChild(playerNameBtn); // Dodanie przycisku

}



