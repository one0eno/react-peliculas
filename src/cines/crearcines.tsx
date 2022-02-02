import React from 'react';
import FormularioCines from './FormularioCines';

export const Crearcines = () => {
  return (
    <>
      <h3>Cines</h3>
      <FormularioCines modelo={{ nombre: '' }} onsubmit={(valores) => console.log(valores)} />
    </>
  );
};
