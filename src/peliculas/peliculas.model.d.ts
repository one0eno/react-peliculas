import { actorPeliculaDTO, actorDTO } from '../actores/actores.model';
import { cineDTO } from '../cines/cines.model';
import { generoDTO } from './generos/generos.model';
export interface peliculaDTO {
  id: number;
  titulo: string;
  poster: string;
  resumen: string;
  enCines: boolean;
  trailer: string;
  fechaLanzamiento?: Date;
  cines: cineDTO[];
  actores: actorPeliculaDTO[];
  generos: generoDTO[];
}

export interface landingPageDTO {
  enCartelera?: peliculaDTO[];
  proximosEstrenos?: peliculaDTO[];
}
export interface peliculasCreacionDTO {
  titulo: string;
  resumen: string;
  enCines: boolean;
  trailer: string;
  fechaLanzamiento?: Date;
  poster?: File;
  posterURL?: string;
  generosIds?: number[];
  cinesId?: number[];
  actores?: actorPeliculaDTO[];
}

export interface peliculasPostGetDTO {
  generos: generoDTO[];
  cines: cineDTO[];
}

export interface peliculasPutGetDTO {
  pelicula: peliculaDTO;
  generosSeleccionados: generoDTO[];
  generosNoSeleccionados: generoDTO[];
  cinesSeleccionados: cineDTO[];
  cinesNoSeleccionados: cineDTO[];
  actores: actorPeliculaDTO[];
}
