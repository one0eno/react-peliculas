import FormularioPeliculas from './FormularioPeliculas';
import { generoDTO } from './generos/generos.model';
import { cineDTO } from '../cines/cines.model';

export default function CrearPeliculas() {
  const generosSeleccionados: generoDTO[] = [{ id: 3, nombre: 'Comedia' }];

  const generosNoSeleccioandos: generoDTO[] = [
    { id: 1, nombre: 'Acción' },
    { id: 2, nombre: 'Terror' },
  ];

  const cines: cineDTO[] = [
    { id: 1, nombre: 'Agora' },
    { id: 2, nombre: 'PAZ' },
  ];

  return (
    <>
      <h3>Crear peliculas</h3>
      <FormularioPeliculas
        cinesNoSeleccionados={cines}
        cinesSeleccionados={[]}
        generosNoSeleccionados={generosSeleccionados}
        generosSeleccionados={generosNoSeleccioandos}
        modelo={{ titulo: '', enCines: false, trailer: '' }}
        onSubmit={(valores) => console.log(valores)}
        actoresSeleccionaos={[]}
      />
    </>
  );
}
