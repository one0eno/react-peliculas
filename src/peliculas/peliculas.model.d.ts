import { actorPeliculaDTO } from '../actores/actores.model';
export interface pelicula {
  id: number;
  titulo: string;
  poster: string;
}

export interface landingPageDTO {
  encartelera?: pelicula[];
  proximosestrenos?: pelicula[];
}
export interface peliculasCreacionDTO {
  titulo: string;
  enCines: boolean;
  trailer: string;
  fechaLanzamiento?: Date;
  poster?: File;
  posterURL?: string;
  generosIds?: number[];
  cinesId?: number[];
  actores?: actorPeliculaDTO[];
}
