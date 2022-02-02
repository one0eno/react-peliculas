import { generoDTO } from './generos.model';
import { urlGeneros } from '../../utils/endpoints';

import IndiceEntidad from '../../utils/IndiceEntiedad';

export default function IndiceGeneros() {
  return (
    <IndiceEntidad<generoDTO> urlBase={urlGeneros} titulo='Generos' urlCrear='/generos/crear' nombreEntidad='Género'>
      {(generos, botones) => (
        <>
          <thead>
            <tr>
              <th></th>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody>
            {generos?.map((genero) => {
              return (
                <tr key={genero.id}>
                  <td>{botones(`/generos/${genero.id}`, genero.id)}</td>
                  <td>{genero.nombre}</td>
                </tr>
              );
            })}
          </tbody>
        </>
      )}
    </IndiceEntidad>
  );
}
