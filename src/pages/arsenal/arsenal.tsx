import React, { useEffect, useState } from "react";
import Card from "../../components/card/card";

const Arsenal: React.FC = ({}) => {
  const [caughtPokemons, setCaughtPokemons] = useState<
    { name: string; nickname: string; sprite: string; cries: string }[]
  >([]);

  useEffect(() => {
    const storedPokemons = JSON.parse(
      localStorage.getItem("myPokemons") || "[]"
    );
    setCaughtPokemons(storedPokemons);
  }, []);

  const removePokemon = (nickname: string) => {
    const updatedPokemons = caughtPokemons.filter(
      (pokemon) => pokemon.nickname !== nickname
    );
    setCaughtPokemons(updatedPokemons);
    localStorage.setItem("myPokemons", JSON.stringify(updatedPokemons));
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center pt-20 pb-30">
      <h1 className="text-white text-sm md:text-2xl mb-4">
        My Pokémon Arsenal
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 px-5">
        {caughtPokemons.map((pokemon, index) => (
          <Card key={index} data={pokemon} onRemove={removePokemon} />
        ))}
      </div>
    </div>
  );
};

export default Arsenal;
