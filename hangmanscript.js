var wordHintPairs = [
    { word: "blue", hint: "The color of the sky" },
    { word: "monkey", hint: "Eats bananas" },
    { word: "flowers", hint: "They are in a garden" }
  ];
  let countdown = 30;
  let timer;
  let currentWordIndex = 0;
  let guessedLetters = [];
  let wrongGuesses = [];
  let wordToGuess;
  let hint;
  let displayWord;
  
  var CheckCorrectWord = false;
  
  var correctGuessSound = document.getElementById('correctGuessSound');
  
  function goToNextLevel() {
    if (CheckCorrectWord) {
      currentWordIndex++;
      if (currentWordIndex < wordHintPairs.length) {
        startGame();
      } else {
        document.getElementById('result').textContent = 'Congratulations! You have completed all levels!';
      }
      CheckCorrectWord = false;
      document.getElementById('nextLevelContainer').style.display = 'none';
    }
  }
  
  function WordStatus() {
    CheckCorrectWord = true;
    document.getElementById('nextLevelContainer').style.display = 'block';
  }
  
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  shuffle(wordHintPairs);
  
  function startCountdown() {
    clearInterval(timer); 
    timer = setInterval(function() {
      countdown--;
      document.getElementById('countdown').textContent = `Countdown: ${countdown}`;
      if (countdown === 0) {
        clearInterval(timer);
        document.getElementById('result').textContent = "Time's up! The word was: " + wordToGuess;
        document.getElementById('guessInput').disabled = true;
      }
    }, 1000);
  }
  
  function guessLetter() {
    const guess = document.getElementById('guessInput').value.toLowerCase();
    document.getElementById('guessInput').value = '';
    if (guess && !guessedLetters.includes(guess)) {
      guessedLetters.push(guess);
      if (wordToGuess.includes(guess)) {
        updateDisplayWord();
        if (displayWord === wordToGuess) {
          clearInterval(timer);
          document.getElementById('result').textContent = 'Congratulations! You guessed the word!';
          document.getElementById('guessInput').disabled = true;
          WordStatus();
          correctGuessSound.play(); 
        }
      } else {
        wrongGuesses.push(guess);
        document.getElementById('wrongGuesses').textContent = wrongGuesses.join(', ');
      }
    }
  }
  
  function updateDisplayWord() {
    displayWord = wordToGuess.split('').map(letter => guessedLetters.includes(letter) ? letter : '_').join('');
    document.getElementById('word').textContent = displayWord;
  }
  
  function startGame() {
    if (currentWordIndex >= wordHintPairs.length) {
      document.getElementById('result').textContent = 'Congratulations! You have completed all levels!';
      return;
    }
    guessedLetters = [];
    wrongGuesses = [];
    wordToGuess = wordHintPairs[currentWordIndex].word;
    hint = wordHintPairs[currentWordIndex].hint;
    document.getElementById('hint').textContent = "Hint: " + hint;
    displayWord = wordToGuess.split('').map(() => '_').join('');
    document.getElementById('word').textContent = displayWord;
    document.getElementById('wrongGuesses').textContent = '';
    document.getElementById('result').textContent = '';
    document.getElementById('guessInput').disabled = false;
    countdown = 30;
    document.getElementById('countdown').textContent = `Countdown: ${countdown}`;
    startCountdown();
  }
  
  window.onload = startGame;