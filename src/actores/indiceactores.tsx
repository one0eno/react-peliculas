import { actorDTO } from './actores.model';
import { urlActores } from '../utils/endpoints';

import IndiceEntidad from '../utils/IndiceEntiedad';

export const Indiceactores = () => {
  return (
    <IndiceEntidad<actorDTO> urlBase={urlActores} titulo='Actores' urlCrear='/actores/crear' nombreEntidad='Actores'>
      {(actores, botones) => (
        <>
          <thead>
            <tr>
              <th></th>
              <th>Nombre</th>
              <th>Fecha Nacimiento</th>
            </tr>
          </thead>
          <tbody>
            {actores?.map((actor) => {
              return (
                <tr key={actor.id}>
                  <td>{botones(`/actores/${actor.id}`, actor.id)}</td>
                  <td>{actor.nombre}</td>
                  <td>{actor.fechaNacimiento}</td>
                </tr>
              );
            })}
          </tbody>
        </>
      )}
    </IndiceEntidad>
  );
};
