import { useEffect } from 'react';

const keys = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

const Keyboard = ({
  correctLetters,
  incorrectLetters,
  addGuessedLetter,
  disabled = false,
}) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();
      if (
        keys.includes(key) &&
        !correctLetters.includes(key) &&
        !incorrectLetters.includes(key)
      ) {
        addGuessedLetter(key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [correctLetters, incorrectLetters, addGuessedLetter]);

  return (
    <div className="flex justify-center my-10">
      <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 md:gap-4">
        {keys.map((key) => {
          const active = correctLetters.includes(key);
          const inActive = incorrectLetters.includes(key);

          return (
            <button
              className={`uppercase border w-12 h-12 hover:scale-110 rounded-md ${
                active ? 'bg-blue-300 text-white' : 'text-white'
              } ${inActive ? 'opacity-30' : 'opacity-100'}`}
              key={key}
              disabled={active || inActive || disabled}
              onClick={() => addGuessedLetter(key)}
            >
              {key}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Keyboard;
