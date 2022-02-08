import React from 'react';
import FormularioCines from './FormularioCines';
import EditarEntidad from '../utils/EditarEntidad';
import { urlCines } from '../utils/endpoints';
import { cineCreacionDTO, cineDTO } from './cines.model';

export default function Editarcines() {
  return (
    <>
      <EditarEntidad<cineCreacionDTO, cineDTO> urlBase={urlCines} urlIndice={'/cines'} nombreEntidad='Cines'>
        {(entidad, editar) => (
          <FormularioCines
            modelo={entidad}
            onSubmit={async (valores) => {
              await editar(valores);
            }}
          />
        )}
      </EditarEntidad>
    </>
  );
}
