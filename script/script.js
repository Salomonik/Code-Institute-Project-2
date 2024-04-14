let buttons = document.querySelectorAll('.game-container');
buttons.forEach(button => {
	button.addEventListener('click', async () => {
		const gameId = button.id; // upewnij się, że każdy przycisk ma ustawione id
		await loadingScreen();
		gameStartScreen(gameId);
		showInstruction(gameId);
		
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
	const playerName = document.createElement('input');
	
	startButton.classList.add('startGameBtn', 'shadow');
	startButton.textContent = 'Start Game';
	startButton.addEventListener('click', () => gameSelection(gameId));
	gameScreen.appendChild(startButton);

	gameScreen.appendChild(playerName);




}

function showInstruction(gameId) {
	const instructions = document.querySelector('.instruction-screen');
	instructions.textContent = '';
}

function selectPlayerName(){
	let playerNameField = document.querySelector('#p1Score');
	let playerName = playerNameField.value;

playerName.addEventListener('')

}
