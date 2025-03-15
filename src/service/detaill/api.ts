import axiosWithConfig from "../api";
import { Root } from "./type";

export const getPokemonDetail = async (name: string) => {
  try {
    const response = await axiosWithConfig.get(`pokemon/${name}`);

    return response.data as Root | undefined;
  } catch (error) {
    console.error("API request failed:", error);
  }
};
