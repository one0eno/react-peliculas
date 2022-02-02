import { pelicula } from './peliculas.model';
import PeliculaIndividual from './PeliculaIndividual';
import css from './listadoPeliculas.module.css';

import ListadoGenerico from '../utils/listadoGenerico';

export default function ListadoPeliculas(props: listadoPeliculasProps) {
  return (
    <ListadoGenerico listado={props.peliculas}>
      <div className={css.div}>
        {props.peliculas?.map((pelicula) => (
          <PeliculaIndividual key={pelicula.id} pelicula={pelicula} />
        ))}
      </div>
    </ListadoGenerico>
  );
}

interface listadoPeliculasProps {
  peliculas?: pelicula[];
}
