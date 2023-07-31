import { useState } from 'react';
import { RotateCcw } from 'lucide-react';

import words from './word-list.json';
import Hangman from './components/Hangman';
import Layout from './components/ui/Layout';
import Word from './components/Word';
import Keyboard from './components/Keyboard';

const getRandomWord = (words) => {
  return words[Math.floor(Math.random() * words.length)];
};

const App = () => {
  const [wordToGuess, setWordToGuess] = useState(getRandomWord(words));
  const [guessedLetters, setGuessedLetters] = useState([]);

  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  const isLose = incorrectLetters.length >= 6;
  const isWin = wordToGuess
    .split('')
    .every((letter) => guessedLetters.includes(letter));

  const addGuessedLetter = (letter) => {
    if (!guessedLetters.includes(letter)) {
      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    }
  };

  const restartGame = () => {
    setWordToGuess(getRandomWord(words));
    setGuessedLetters([]);
  };

  return (
    <Layout>
      <h1 className='text-center text-7xl font-bold mt-5 text-white'>
        Hangman
      </h1>

      {isWin && (
        <div className='flex justify-center items-center min-h-[200px]'>
          <h2 className='font-bold text-4xl text-white'>You Win!</h2>
        </div>
      )}
      {!isWin && <Hangman numberOfGuesses={incorrectLetters.length} />}
      {isLose && (
        <div className='flex justify-center items-center'>
          <h2 className='font-bold text-4xl text-white'>You Lose!</h2>
        </div>
      )}

      <Word
        reveal={isLose}
        wordToGuess={wordToGuess}
        guessedLetters={guessedLetters}
      />

      {(isWin || isLose) && (
        <div className='flex justify-center mt-10'>
          <button
            onClick={restartGame}
            className='border rounded-md p-2 text-white hover:opacity-80 cursor-pointer'
          >
            <RotateCcw size={24} />
          </button>
        </div>
      )}

      <Keyboard
        disabled={isWin || isLose}
        correctLetters={guessedLetters.filter((letter) =>
          wordToGuess.includes(letter)
        )}
        incorrectLetters={incorrectLetters}
        addGuessedLetter={addGuessedLetter}
      />
    </Layout>
  );
};

export default App;
