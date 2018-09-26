var wins = 0;
var losses = 0;
var maxErrors = 11;
var wordDisplayLettersElement = document.getElementById("word-display-letters");
var guessedLettersElement = document.getElementById("guessed-letters");
var errorCountElement = document.getElementById("error-count");
var winCountElement = document.getElementById("win-count");
var lossCountElement = document.getElementById("loss-count");
var blinkElements = document.getElementsByClassName("blinking");
var alertLineElements = document.getElementsByClassName("alert-line");
var validGuesses = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ];

var pressAnyKeyToStart = [
	" ___                                       _                _              _               _   ",
	"| _ \\ _ _  ___  ___ ___  __ _  _ _  _  _  | |__ ___  _  _  | |_  ___   ___| |_  __ _  _ _ | |_ ",
	"|  _/| '_|/ -_)(_-<(_-< / _` || ' \\| || | | / // -_)| || | |  _|/ _ \\ (_-<|  _|/ _` || '_||  _|",
	"|_|  |_|  \\___|/__//__/ \\__,_||_||_|\\_, | |_\\_\\\\___| \\_, |  \\__|\\___/ /__/ \\__|\\__,_||_|   \\__|",
	"                                    |__/             |__/                                      "
];

var pressAnyKeyToReset = [
	" ___                                       _                _                              _   ",
	"| _ \\ _ _  ___  ___ ___  __ _  _ _  _  _  | |__ ___  _  _  | |_  ___    _ _  ___  ___ ___ | |_ ",
	"|  _/| '_|/ -_)(_-<(_-< / _` || ' \\| || | | / // -_)| || | |  _|/ _ \\  | '_|/ -_)(_-</ -_)|  _|",
	"|_|  |_|  \\___|/__//__/ \\__,_||_||_|\\_, | |_\\_\\\\___| \\_, |  \\__|\\___/  |_|  \\___|/__/\\___| \\__|",
	"                                    |__/             |__/                                      "
];

var youWin = [
	"__  __ ____   __  __   _      __ ____ _  __",
	"\\ \\/ // __ \\ / / / /  | | /| / //  _// |/ /",
	" \\  // /_/ // /_/ /   | |/ |/ /_/ / /    / ",
	" /_/ \\____/ \\____/    |__/|__//___//_/|_/  ",
	"                                           "
];

var youLose = [
	"__  __ ____   __  __  __   ____   ____ ____",
	"\\ \\/ // __ \\ / / / / / /  / __ \\ / __// __/",
	" \\  // /_/ // /_/ / / /__/ /_/ /_\\ \\ / _/  ",
	" /_/ \\____/ \\____/ /____/\\____//___//___/  ",
	"                                           "
];

var emptyAlert = [
	"                                           ",
	"                                           ",
	"                                           ",
	"                                           ",
	"                                           "
];

var game = new Galgje(); //Hier begint de game

document.onkeyup = function(event) { //De onkeyup treedt op wanneer de gebruiker een toets loslaat 
	var userGuess = event.key;

	if (!game.gameOver) { //Als het niet gameOver is dan wordt de code tussen de accolades uitgevoerd
		if (validGuesses.includes(userGuess) && !game.guessedLetters.includes(userGuess)) { //Als de geraden antwoorden één van de opgegeven woorden bevatten EN niet de geraden letters bevatten van de ingevoerde woorden.
					game.checkGuess(userGuess);
		}
	} else {
		game = new Galgje();
		game.updatePageData(); //Anders begint het een nieuwe game
	}
}

window.setInterval(function() { //De setInterval() roept een functie aan of evalueert een uitdrukking op de opgegeven tussenstanden.
	if (blinkElements.length > 0) {
		if (game.guessedLetters.length === 0 || game.gameOver) { //Als de geraden letters 0 zijn dan is het game over
			if (blinkElements[0].style.opacity === "1") {
				for (var i = 0; i < blinkElements.length; i++) {
					blinkElements[i].style.opacity = "0"; 
				}
			} else {
				for (var i = 0; i < blinkElements.length; i++) {
					blinkElements[i].style.opacity = "1";
				}
			}
		} else {
			for (var i = 0; i < blinkElements.length; i++) {
				blinkElements[i].style.opacity = "0";
			} //Blink elements is ervoor om bepaalde elementen te laten knipperen
		}
	}
}, 750);

function Galgje() {
	this.wordList = [
		"zuurstof",
		"oneplus",
		"jquery",
		"toetsenbord",
		"feestwinkel",
		"kostuum",
		"condoom",
		"ijverig",
		"javascript",
		"grofweg",
		"tyfus",
		"klootzak",
		"aquarium",
		"zwager",
		"belasting",
		"gymzaal",
		"jazzzanger",
		"picknick"
	] //Lijst van alle woorden die geraden kunnen worden.

	this.word = this.wordList[Math.floor(Math.random() * this.wordList.length)]; //Hij kiest hier een random woord uit de wordlist
	this.guessedLetters = []; //De geraden letters worden weergegeven in de tab geraden letters
	this.errors = 0; // Je begint met 0 fouten
	this.visibleLetters = []; //Hier komen de geraden letters van het woord in beeld
	this.gameOver = false; //In het begin staat de game over op false
	this.alertLines = emptyAlert; 
	for (var i = 0; i < this.word.length; i++) { //De operators voor verhogen en verlagen in javascript voegen allebei één (+1) of trekken er één (-1) af aan hun operand en vullen vervolgens een andere waarde in.
		this.visibleLetters[i] = (false); 
	}
} //In een functie verwijst dit naar de eigenaar van de functie.

Galgje.prototype.checkGuess = function(char) { //
	this.guessedLetters.push(char);

	var isInWord = false; //Er is geen letter geraden daarom staat deze op false
	for (var i = 0; i < this.word.length; i++) { //Als de woordlengte kleiner is dan 0 dan neemt het toe
		if (this.word.charAt(i) === char) { //De charAt(i) retourneert het teken bij de opgegeven index in een tekenreeks.
			isInWord = true;
			this.visibleLetters[i] = true;
		}
	}
	if (!isInWord) {
		this.errors++; //Als er geen geraden letters in het woord zijn dan nemen de fouten (errors) toe
	}

	if (this.errors >= maxErrors) {
		losses++;
		this.alertLines = youLose;
		this.gameOver = true;
		console.log("Je hebt verloren :("); //Als de fouten groter dan of gelijk aan maximale fouten is dan komt er een verlies (lose) bij en de youLose komt in het beeld en hij schrijft in console (je hebt verloren)

	}

	if (!this.visibleLetters.includes(false)) { 
		wins++;
		this.alertLines = youWin;
		this.gameOver = true;
		console.log("Je hebt gewonnen") //Als er geen letters meer zijn verborgen dan krijg je er een win bij en komt de youWin in beeld en hij schrijft in console (Je hebt gewonnen)
	}

	game.updatePageData(); //Werkt de content van de pagina bij
};

Galgje.prototype.updatePageData = function() {
	var tempString = "";
	for (var i = 0; i < this.visibleLetters.length; i++) {
		tempString += ((this.visibleLetters[i] || this.gameOver) ? this.word.charAt(i).toUpperCase() : "_"); //+= voegt een waarde toe aan de var (tempString) en in dit geval is dat er nog niet alle letters zijn geraden OF dat je hebt verloren. De (?) lijkt erg op een if else statement, maar deze heeft een meer compacte syntaxis. 

		if (i < (this.visibleLetters.length - 1)) tempString += " ";
	}
	wordDisplayLettersElement.textContent = tempString; //Met de textContent wordt de tekstinhoud van de opgegeven var en al zijn nakomelingen ingesteld of teruggestuurd.

	tempString = "";
	for (var i = 0; i < this.guessedLetters.length; i++) { //Als de geraden letters kleiner zijn dan 0 dan telt hij dat op
		tempString += (this.guessedLetters[i].toUpperCase()); //Veranderd de geraden letters in hoofdletters
		if (i < (this.guessedLetters.length - 1)) tempString += " "; //Als de geraden letters kleiner zijn dan i dan gaat er 1 af en telt hij dat op bij de var (tempString)
	} 
	for (var i = tempString.length; i < 51; i++) {
		tempString += " ";
	}
	guessedLettersElement.textContent = tempString; //Met de textContent wordt de tekstinhoud van de opgegeven var en al zijn nakomelingen ingesteld of teruggestuurd.

	tempString = this.errors + " / " + maxErrors;
	for (var i = tempString.length; i < 32; i++) {
		tempString += " ";
	}
	errorCountElement.textContent = tempString; //Met de textContent wordt de tekstinhoud van de opgegeven var en al zijn nakomelingen ingesteld of teruggestuurd.

	tempString = wins + ""; //Telt een winst erbij
	for (var i = tempString.length; i < 45; i++) { //Als i kleiner is dan 45 telt hij dat erbij.
		tempString += " ";
	}
	winCountElement.textContent = tempString; //Met de textContent wordt de tekstinhoud van de opgegeven var en al zijn nakomelingen ingesteld of teruggestuurd.

	tempString = losses + ""; //Telt een verlies erbij
	for (var i = tempString.length; i < 43; i++) { //Als i kleiner is dan 43 telt hij dat erbij.
		tempString += " ";
	}
	lossCountElement.textContent = tempString; //Met de textContent wordt de tekstinhoud van de opgegeven var en al zijn nakomelingen ingesteld of teruggestuurd.

	for (var i = 0; i < blinkElements.length; i++) {
		blinkElements[i].textContent = (this.gameOver ? pressAnyKeyToReset[i] : pressAnyKeyToStart[i]); //Als het gameOver is dan laat hij de pressAnyKeyToReset zien en die heeft dezelfde functie als pressAnyKeyToStart
	}

	for (var i = 0; i < alertLineElements.length; i++) {
		alertLineElements[i].textContent = (this.alertLines[i]);
	}
}

game.updatePageData();
