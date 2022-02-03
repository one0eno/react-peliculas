import { cineDTO } from './cines.model';
import { urlCines } from '../utils/endpoints';

import IndiceEntidad from '../utils/IndiceEntiedad';

export default function Indicecines() {
  return (
    <IndiceEntidad<cineDTO> urlBase={urlCines} titulo='Cines' urlCrear='/cines/crear' nombreEntidad='Cines'>
      {(cines, botones) => (
        <>
          <thead>
            <tr>
              <th></th>
              <th>Nombre</th>
              <th>Latitud</th>
              <th>Longitud</th>
            </tr>
          </thead>
          <tbody>
            {cines?.map((cine) => {
              return (
                <tr key={cine.id}>
                  <td>{botones(`/actores/${cine.id}`, cine.id)}</td>
                  <td>{cine.nombre}</td>
                  <td>{cine.latitud}</td>
                  <td>{cine.longitud}</td>
                </tr>
              );
            })}
          </tbody>
        </>
      )}
    </IndiceEntidad>
  );
}
