import React from 'react';
import FormularioCines from './FormularioCines';

export default function Editarcines() {
  return (
    <>
      <h3>EditarCines</h3>
      <FormularioCines
        modelo={{ nombre: '', latitud: -3.638218, longitud: 40.988825 }}
        onSubmit={(valores) => console.log(valores)}
      />
    </>
  );
}
