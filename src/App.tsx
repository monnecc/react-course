import React from "react";
import "./App.css";

import Title from "./components/Title";
import Pokemon from "./components/Pokemon/Pokemon";

const all_pokemon = [
  {
    name: "Charizard",
    weight: 90,
    awesome: true,
    terrifying: false,
    abilities: ["Blaze", "Solar power", "Tough claws", "Drought"],
  },
  {
    name: "Bulbasaur",
    weight: 6.9,
    awesome: true,
    terrifying: false,
    abilities: ["Overgrow", "Chlorophyll"],
  },
  {
    name: "Mewtwo",
    weight: 122,
    awesome: true,
    terrifying: true,
    abilities: ["Pressure", "Unnerve", "Steadfast", "Insomnia"],
  },
  {
    name: "Mega beedrill",
    weight: 65,
    awesome: false,
    terrifying: true,
    abilities: ["Intimidate", "Unnerve"],
  },
];

function App() {
  return (
    <div className="App">
      <main className="container my-5">
        <div className="mb-4">
          <Title content="Some Simple Title" />
        </div>
        <div className="row">
          {all_pokemon.map((p) => {
            return (
              <div className="col-md-6 col-lg-4">
                <Pokemon
                  name={p.name}
                  weight={p.weight}
                  awesome={p.awesome}
                  terrifying={p.terrifying}
                  abilities={p.abilities}
                />
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default App;
