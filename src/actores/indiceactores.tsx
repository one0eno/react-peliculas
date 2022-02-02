import React from 'react';
import { Link } from 'react-router-dom';

export const Indiceactores = () => {
  return (
    <>
      <div>Actores</div>
      <Link to='actores/crear'>Crear Actor</Link>
    </>
  );
};
