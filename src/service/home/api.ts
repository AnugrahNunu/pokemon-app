import axiosWithConfig from "../api";
import { Response, Pic } from "./type";

export const getPokemon = async (offset: number) => {
  try {
    const response = await axiosWithConfig.get(
      `pokemon?limit=10&offset=${offset}`
    );
    return response.data as Response | undefined;
  } catch (error) {
    console.error("API request failed:", error);
  }
};

export const getPokemonData = async (name: string) => {
  try {
    const response = await axiosWithConfig.get(`pokemon/${name}`);
    return response.data as Pic | undefined;
  } catch (error) {
    console.error("API request failed:", error);
  }
};
