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


	selectPlayerName();


	const startButton = document.createElement('button');
	startButton.classList.add('ingameButtons', 'shadow');
	startButton.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
	startButton.addEventListener('click', () => gameSelection(gameId));
	gameScreen.appendChild(startButton);


}




function selectPlayerName() {
    const gameScreen = document.querySelector('.game-screen');
	
    const playerNameInput = document.createElement('input');
    playerNameInput.type = 'text';
	playerNameInput.maxLength = 3;
    const playerNameBtn = document.createElement('button');
    playerNameBtn.textContent = 'Set Name';

    playerNameBtn.addEventListener('click', () => {
        const playerName = playerNameInput.value;
        if (playerName) {
            localStorage.setItem('playerName', playerName); // Zapisanie nazwy gracza
        }
    });

    gameScreen.appendChild(playerNameInput);
    gameScreen.appendChild(playerNameBtn);
}



