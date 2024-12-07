"use client";

import { useEffect, useState } from "react";

interface KeyboardEvent {
  key: string;
}

type GameData = {
  word: string;
  img: string;
};

function getData(): GameData[] {
  return [
    {
      word: "CAMION",
      img: "https://upload.wikimedia.org/wikipedia/commons/3/34/Renault_T-Truck_-_E_5958KC.jpg",
    },
    {
      word: "MAISON",
      img: "https://upload.wikimedia.org/wikipedia/commons/8/80/MaisonCausapscal.JPG",
    },
    {
      word: "CHOCOLAT",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Green_and_Black%27s_dark_chocolate_bar_2.jpg/2560px-Green_and_Black%27s_dark_chocolate_bar_2.jpg",
    },
    {
      word: "CHAMPIGNON",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Les_champions_blancs_%C3%A0_la_For%C3%AAt_Sacr%C3%A9e_de_Kpass%C3%A8.jpg/2560px-Les_champions_blancs_%C3%A0_la_For%C3%AAt_Sacr%C3%A9e_de_Kpass%C3%A8.jpg",
    },
    {
      word: "VELO",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/BmxStreet.JPG/2880px-BmxStreet.JPG",
    },
    {
      word: "SALADE",
      img: "https://upload.wikimedia.org/wikipedia/commons/2/20/Kropsla_herfst.jpg",
    },
    {
      word: "ARC EN CIEL",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Sai_Thong_National_Park_.jpg/2880px-Sai_Thong_National_Park_.jpg",
    },
  ];
}

const words = [
  "CAMION",
  "CHOCOLAT",
  "MAMAN",
  "TARTINE",
  "TOMATE",
  "CAMPING",
  "VOITURE",
  "LIT",
  "VILLAGE",
  "MERCREDI",
  "PIANO",
  "PYJAMA",
];

type GameState = {
  wordToGuess: string;
  guessed: string[];
  letterEntered: string[];
  step: number;
  win: boolean;
};

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

const allData = getData();
const data = allData[6];

export default function Home() {
  const newGame = () => {
    const wordToGuess = words[getRandomInt(words.length)];
    const guessed: string[] = [];
    for (const c of wordToGuess) {
      if (/^[A-Z]$/.test(c)) {
        guessed.push("_");
      } else {
        guessed.push(c);
      }
    }
    return {
      wordToGuess,
      guessed,
      letterEntered: [] as string[],
      step: 0,
      win: false,
    };
  };

  const [gameState, setGameState] = useState<GameState>(newGame);

  const resetGame = () => {
    setGameState(newGame());
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (gameState.win || gameState.step >= 13) {
      return gameState;
    }
    const character = event.key.toUpperCase();
    if (/^[A-Z]$/.test(character)) {
      setGameState((gameState) => {
        if (gameState.letterEntered.includes(character)) {
          return { ...gameState };
        }
        const letterEntered = [...gameState.letterEntered, character];
        if (gameState.wordToGuess.split("").includes(character)) {
          const guessed: string[] = [];
          let win = true;
          for (const c of gameState.wordToGuess) {
            if (/^[A-Z]$/.test(c)) {
              if (letterEntered.includes(c)) {
                guessed.push(c);
              } else {
                guessed.push("_");
                win = false;
              }
            } else {
              guessed.push(c);
            }
          }
          return {
            ...gameState,
            guessed,
            letterEntered,
            win,
          };
        }
        return {
          ...gameState,
          letterEntered,
          step: gameState.step + 1,
          win: false,
        };
      });
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  let img = "";
  if (gameState.win) {
    img = "win.jpg";
  } else {
    if (gameState.step == 0) {
      img = "init.jpg";
    } else if (gameState.step >= 13) {
      img = "pendu_13.jpg";
    } else {
      img = "pendu_" + String(gameState.step).padStart(2, "0") + ".jpg";
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="flex flex-col  items-center p-24">
        <h1 className="m-3 text-8xl font-semibold">
          {gameState.guessed.join(" ")}
        </h1>
        <img src={img} alt="Pendu" width={500} className="mt-4"></img>
        <div className="text-4xl">{gameState.letterEntered.join(" ")}</div>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={resetGame}
      >
        Nouveau jeu
      </button>
    </main>
  );
}

// export default function Home() {
//   const [toGuess, setToGuess] = useState<string>(
//     data.word
//       .split("")
//       .map((c) => {
//         if (/^[A-Z]$/.test(c)) {
//           return "_";
//         } else {
//           return c;
//         }
//       })
//       .join(" ")
//   );
//   const [allChars, setAllChars] = useState<string[]>([]);

//   const handleKeyPress = (event: KeyboardEvent) => {
//     const character = event.key.toUpperCase();
//     if (/^[A-Z]$/.test(character) && !allChars.includes(character)) {
//       setAllChars((a) => [...a, character]);
//     }
//   };

//   useEffect(() => {
//     let newGuess = "";
//     for (const c of data.word) {
//       if (allChars.includes(c)) {
//         newGuess += c + " ";
//       } else if (/^[A-Z]$/.test(c)) {
//         newGuess += "_ ";
//       } else {
//         newGuess += "  ";
//       }
//     }
//     setToGuess(newGuess);
//   }, [allChars]);

//   useEffect(() => {
//     window.addEventListener("keydown", handleKeyPress);
//     return () => window.removeEventListener("keydown", handleKeyPress);
//   }, []);

//   return (
//     <main className="flex min-h-screen flex-col items-center p-24">
//       <img src={data.img} alt="A trouver" width={800} />
//       <h1 className="m-3 text-8xl font-semibold">{toGuess}</h1>
//     </main>
//   );
// }
