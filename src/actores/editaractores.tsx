import React from 'react';
import FormularioActores from './FormularioActores';

export const Editaractores = () => {
  return (
    <>
      <div>Editar actores</div>
      <FormularioActores
        modelo={{
          nombre: 'Tom holland',
          fechaNacimiento: new Date('1996-06-01T:00:00:00'),
          fotoURL:
            'https://m.media-amazon.com/images/M/MV5BMTg3MDc0MjY0OV5BMl5BanBnXkFtZTcwNzU1MDAxOA@@._V1_UY317_CR10,0,214,317_AL_.jpg',
        }}
        onsubmit={(valores) => console.log(valores)}
      />
    </>
  );
};
