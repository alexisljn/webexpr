import logo from './logo.svg';
import './App.css';
import {useCallback, useEffect, useMemo, useState} from "react";

function App() {

  const [words, setWords] = useState([]);

  const [grid, setGrid] = useState([]);

  const alphabet = useMemo(() => {
    return 'abcdefghijklmnopqrstuvwxyz';
  }, []);

  const randomLetter = useCallback(() => {
    return alphabet[Math.floor(Math.random() * (alphabet.length + 1))]
  }, [alphabet])

  const randomIndex = useCallback(() => {
    return Math.floor(Math.random() * (30 + 1))
  }, [])

  useEffect(() => {
    (async () => {
      const wordsResponse = await fetch('http://localhost:3000/words?limit=5');

      const words = await wordsResponse.json()

      if (words.length > 0) {
        setWords(words);
      }

      console.log('words', words);
    })()
  }, []);

  useEffect(() => {
    if (words.length === 0) return;

    let grid = [];

    for (let i = 0; i < 5; i++) {
      const index = randomIndex();

      grid[i] = []
      for (let j = 0; j < 30; j++) {

        if (j === index) {
          console.log(words[i]);
          grid[i][j] = words[i].value;
          continue;
        }

        grid[i][j] = randomLetter()
      }
      // grid[i] =
      // console.log("randomL", randomLetter());
      // grid +=
    }

    console.log("grid", grid);

    setGrid(grid);
  }, [words]);

  return (
    <div>
      {words.length > 0 &&
        <div>
          {words.map((word) => (
              <p>{word.value}</p>
              ))
          }
        </div>
      }
      {grid.length > 0 &&
        <div>
          {grid.map((line) => (
            <div>{line}</div>
          ))}
        </div>
      }
    </div>
  );
}

export default App;
