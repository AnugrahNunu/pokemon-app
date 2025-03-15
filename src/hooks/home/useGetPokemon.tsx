import { useEffect, useState } from "react";
import { getPokemon, getPokemonData } from "../../service/home/api";
import {
  Paginantion,
  Response,
  Result,
  Pic,
  Sprites,
} from "../../service/home/type";

export const useGetPokemon = () => {
  const [pokemon, setPokemon] = useState<(Result & { sprites?: Sprites })[]>();
  const [pagination, setPagination] = useState<Paginantion>({
    offset: 0,
  });

  const fetchPokemon = async () => {
    try {
      const response: Response | undefined = await getPokemon(
        pagination.offset
      );
      if (response?.results) {
        const pokemonWithSprites = await Promise.all(
          response.results.map(async (pokemon) => {
            const pokemonData: Pic | undefined = await getPokemonData(
              pokemon.name
            );
            return { ...pokemon, sprites: pokemonData?.sprites };
          })
        );
        setPokemon(pokemonWithSprites);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, [pagination]);

  return { pokemon, pagination, setPagination };
};
