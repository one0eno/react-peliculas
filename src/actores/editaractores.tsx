import React from 'react';
import EditarEntidad from '../utils/EditarEntidad';
import FormularioActores from './FormularioActores';
import { actorCreacionDTO, actorDTO } from './actores.model';
import { urlActores } from '../utils/endpoints';
import { convertirActorAFormData } from '../FormDataUtils';

export const Editaractores = () => {
  const transformar = (actor: actorDTO) => {
    return {
      nombre: actor.nombre,
      fotoURL: actor.foto,
      fechaNacimiento: new Date(actor.fechaNacimiento),
      biografia: actor.biografia,
    };
  };

  return (
    <>
      <EditarEntidad<actorCreacionDTO, actorDTO>
        urlBase={urlActores}
        urlIndice='/actores'
        nombreEntidad='Actores'
        transformarFormData={convertirActorAFormData}
        transformar={transformar}
      >
        {(entidad, editar) => (
          <FormularioActores
            modelo={entidad}
            onSubmit={async (valores) => {
              await editar(valores);
            }}
          />
        )}
      </EditarEntidad>
    </>
  );
};
