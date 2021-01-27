import "./App.css";
import balbasaurPic from "./001.png";
import charmanderPic from "./004.png";
import CharizardPic from "./006.png";
import SquirtlePic from "./007.png";
import CharmeleonPic from "./005.png";
import BlastoisePic from "./009.png";
import PidgeotPic from "./018.png";
import PidgeottoPic from "./017.png";
import { useState } from "react";

const pokemons = [
  {
    id: 1,
    name: "balbasaur",
    image: balbasaurPic,
  },
  {
    id: 2,
    name: "Charmander",
    image: charmanderPic,
  },
  {
    id: 3,
    name: "Charizard",
    image: CharizardPic,
  },
  {
    id: 4,
    name: "Squirtle",
    image: SquirtlePic,
  },
  {
    id: 5,
    name: "Charmeleon",
    image: CharmeleonPic,
  },
  {
    id: 6,
    name: "Blastoise",
    image: BlastoisePic,
  },
  {
    id: 7,
    name: "Pidgeot",
    image: PidgeotPic,
  },
  {
    id: 8,
    name: "Pidgeotto",
    image: PidgeottoPic,
  },
];
function App() {
  const [openedCard, setOpenedCard] = useState([]);
  const [matched, setMatched] = useState([]);
  const [attempts, setAttempt] = useState(0);

  const IDs = pokemons.forEach((pokemon) => pokemon.id);

  const PairOfPokemons = [...pokemons, ...pokemons];

  let RepeatationCount = attempts;

  const TotalReaptations = () => {
    setAttempt(attempts + 1);
  };
  function flipCard(index) {
    setOpenedCard([...openedCard, index]);
    const cards = [...openedCard, index];
    // console.log(cards); // >> This will work if openedCards are assigned to a normal array << >> or you have two different states for each card <<
    // console.log(cards.length);
    if (cards.length === 2) {
      const firstMatch = PairOfPokemons[cards[0]];
      const secondMatch = PairOfPokemons[cards[1]];
      // console.log(firstMatch);
      // console.log(secondMatch);
      if (firstMatch.id === secondMatch.id) {
        // if the opened cards are matching
        // console.log(firstMatch);
        // console.log(secondMatch);
        setMatched([...matched, firstMatch.id]);
        setOpenedCard([]);
      } else {
        //this means that we have two cards opened or flipped
        setTimeout(() => setOpenedCard([]), 500);
        TotalReaptations();
      }
    }
  }
  const RestButton = () => {
    setOpenedCard([]);
    setMatched([]);
    setAttempt(0);
  };
  const LosingTitle = () => {
    if (attempts >= 5) {
      setTimeout(() => setOpenedCard([]), 1500);
      setTimeout(() => setAttempt(0), 1500);
      setTimeout(() => setMatched([]), 500);
      return (
        <div>
          <h1 className="attempts">YOU LOST</h1>
          <h1 className="attempts">Try Again!</h1>
        </div>
      );
    }
  };
  const WinTitle = () => {
    if (matched.length === 8) {
      return (
        <div>
          <h1 className="attempts">YOU WIN</h1>
          <h3 className="attempts-h3">Press rest to play Again</h3>
        </div>
      );
    }
  };

  return (
    <div className="App">
      <a className="attempts">{`Failed Attempts:  ${RepeatationCount}`} </a>
      {LosingTitle()}
      {WinTitle()}
      <div className="cards">
        {PairOfPokemons.map((pokemon, index) => {
          let isFlipped = false;

          if (openedCard.includes(index)) isFlipped = true;
          if (matched.includes(pokemon.id)) isFlipped = true;
          return (
            <div
              className={`pokemon-card ${isFlipped ? "flipped disabled" : ""}`}
              key={index}
              onClick={() => flipCard(index)}
            >
              <div className="inner">
                <div className="front">
                  <img src={pokemon.image} alt={pokemon.name} width="150"></img>
                </div>
                <div className="back"></div>
              </div>
            </div>
          );
        })}
      </div>
      <button className="button-class" onClick={() => RestButton()}>
        Rest
      </button>
    </div>
  );
}

export default App;
