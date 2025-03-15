import { useEffect, useState } from "react";
import { getPokemonDetail } from "../../service/detaill/api";
import { Root } from "../../service/detaill/type";

export const useDetailPokemon = (name: string) => {
  const [pokemonDetail, setPokemonDetail] = useState<Root | undefined>();

  const fetchPokemonDetail = async () => {
    try {
      const response = await getPokemonDetail(name);
      setPokemonDetail(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (name) fetchPokemonDetail();
  }, [name]);

  return { pokemonDetail };
};
