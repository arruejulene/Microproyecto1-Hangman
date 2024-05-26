    // Lista de palabras
    const words = ['julene', 'pared', 'luna', 'jupiter', 'bases', 'datos'];

    let chosenWord = '';
    let wordToGuess = '';
    let chancesLeft = 6;
    let wins = 0;
    let losses = 0;

    // Comienza juego
    function initializeGame() {
      // Resetea chances
      document.querySelector(".hangman-box img").src = `imagenes/a7.svg`;
      chancesLeft = 6;
      document.getElementById('chances-left').textContent = chancesLeft;

      // Choose a random word from the list
      chosenWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
      
      // Generate the placeholders for the word
      wordToGuess = chosenWord.replace(/[A-Z]/g, '_');
      document.getElementById('hangman-word').textContent = wordToGuess;

      // Create the keyboard
      const keyboard = document.getElementById('keyboard');
      keyboard.innerHTML = '';
      for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i);
        const key = document.createElement('div');
        key.className = 'key';
        key.textContent = letter;
        key.addEventListener('click', () => {
            guessLetter(letter);
            key.hidden = true;
        });
        keyboard.appendChild(key);
      }
    }

    // Function to handle guessing a letter
    function guessLetter(letter) {
      if (chancesLeft > 0 && wordToGuess.includes('_')) {
        if (chosenWord.includes(letter)) {
          // Replace the underscores with the correctly guessed letter
          let newWord = '';
          for (let i = 0; i < chosenWord.length; i++) {
            if (chosenWord[i] === letter) {
              newWord += letter;
            } else {
              newWord += wordToGuess[i];
            }
          }
          wordToGuess = newWord;
          document.getElementById('hangman-word').textContent = wordToGuess;
        } else {
          // Reduce chances left
          document.querySelector(".hangman-box img").src = `imagenes/a${chancesLeft}.svg`;
          chancesLeft--;
          document.getElementById('chances-left').textContent = chancesLeft;
        }
      }

      // Check for win or loss
      if (wordToGuess === chosenWord) {
        // Win
        wins++;
        document.getElementById('wins').textContent = wins;
        alert('You win!');
        initializeGame();
      } else if (chancesLeft === 0) {
        // Loss
        losses++;
        document.getElementById('losses').textContent = losses;
        alert('You lose! The word was: ' + chosenWord);
        initializeGame();
      }
    }

    // Initialize the game when the page loads
    initializeGame();