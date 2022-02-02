import React from 'react';
import { Link } from 'react-router-dom';

export default function Indicecines() {
  return (
    <>
      <div>Cines</div>
      <Link to='cines/crear'>Crear Cine</Link>
    </>
  );
}
