import React from 'react';
import FormularioActores from './FormularioActores';

export const Crearactores = () => {
  return (
    <>
      <div>Crear actor</div>
      <FormularioActores
        modelo={{ nombre: '', fechaNacimiento: new Date() }}
        onsubmit={(valores) => console.log(valores)}
      />
    </>
  );
};
