export interface Paginantion {
  offset: number;
}

export interface Response extends Paginantion {
  results: Result[];
}

export interface Result {
  name: string;
  url: string;
}

export interface Pic extends Paginantion {
  sprites: Sprites;
  cries: Cries;
}

export interface Cries {
  latest: string;
  legacy: string;
}

export interface Sprites {
  back_default: string;
  back_female: any;
  back_shiny: string;
  back_shiny_female: any;
  front_default: string;
  front_female: any;
  front_shiny: string;
  front_shiny_female: any;
}
