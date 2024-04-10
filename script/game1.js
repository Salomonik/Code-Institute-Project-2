function game1() {
	buttonCreator();

}

const choices = [
	{ rock: "scissors" },
	{ paper: "rock" },
	{ scissors: "paper" }
];

function buttonCreator() {
	const gameScreen = document.querySelector('.game-screen');
	gameScreen.innerHTML = ''; // Czyszczenie zawartości
	gameScreen.style.display = 'flex';
	gameScreen.style.alignItems = 'flex-end';
	gameScreen.style.justifyContent = 'space-around';
	gameScreen.style.padding = '3rem'

	for (let i = 0; i < choices.length; i++) {
		const choice = choices[i];
		const choiceKey = Object.keys(choice)[0]; // Pobieranie klucza (nazwy) z obiektu
		const button = document.createElement('button');
		button.textContent = choiceKey; // Ustawianie tekstu przycisku na podstawie klucza
		button.id = `button${choiceKey}`; // Ustawianie id przycisku na podstawie klucza
		button.classList.add('ingameButtons');
		
		button.addEventListener('click', function() {
			const playerChoice = this.id.replace('button', ''); // Pobieranie wyboru gracza z id przycisku
			const computerSelection = computerChoice(); // Pobieranie wyboru komputera
			
			// Tutaj możesz wywołać funkcję calculatingResults z odpowiednimi argumentami
			calculateResults(playerChoice, computerSelection);
		});
		gameScreen.appendChild(button); // Dodawanie przycisku bezpośrednio do elementu gameScreen
	}
}


let computerChoice = () => {
	let randomNum = Math.floor(Math.random() * 3); // Usunięto (0) z Math.random(), jest to zbędne
	const choiceKeys = Object.keys(choices[randomNum]);
	return choiceKeys[0]; // Zwraca klucz wyboru komputera, np. "rock"
};

function calculateResults(playerChoice, computerChoiceResult) {
	if (playerChoice === computerChoiceResult) {
		console.log(`Remis! Oboje wybraliście ${playerChoice}.`);
        return `Remis! Oboje wybraliście ${playerChoice}.`;
    }

    const winConditions = {
        rock: 'scissors',
        paper: 'rock',
        scissors: 'paper'
    };

    if (computerChoiceResult === winConditions[playerChoice]) {
		console.log(`Wygrałeś! ${playerChoice} bije ${computerChoiceResult}.`)
        return `Wygrałeś! ${playerChoice} bije ${computerChoiceResult}.`;
    } else {
		console.log(`Przegrałeś! ${computerChoiceResult} bije ${playerChoice}.`)
        return `Przegrałeś! ${computerChoiceResult} bije ${playerChoice}.`;
    }
}




















function calculatingResults(playerChoice, computerChoice) {

}