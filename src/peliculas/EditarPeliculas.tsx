import { cineDTO } from '../cines/cines.model';
import FormularioPeliculas from './FormularioPeliculas';
import { generoDTO } from './generos/generos.model';
import { actorPeliculaDTO } from '../actores/actores.model';

export default function EditarPeliculas() {
  const generos: generoDTO[] = [
    { id: 1, nombre: 'Acción' },
    { id: 2, nombre: 'Terror' },
    { id: 3, nombre: 'Comedia' },
  ];

  const cinesSeleccionados: cineDTO[] = [{ id: 1, nombre: 'Agora' }];

  const cinesNoSeleccionados: cineDTO[] = [{ id: 2, nombre: 'PAZ' }];

  const actoresSeleccionados: actorPeliculaDTO[] = [
    {
      id: 3,
      nombre: 'Tarantino',
      personaje: '',
      foto: 'https://m.media-amazon.com/images/M/MV5BMTgyMjI3ODA3Nl5BMl5BanBnXkFtZTcwNzY2MDYxOQ@@._V1_UX214_CR0,0,214,317_AL_.jpg',
    },
  ];
  return (
    <>
      <h3>Editar peliculas</h3>
      <FormularioPeliculas
        actoresSeleccionaos={actoresSeleccionados}
        cinesSeleccionados={cinesSeleccionados}
        cinesNoSeleccionados={cinesNoSeleccionados}
        generosNoSeleccionados={generos}
        generosSeleccionados={[]}
        modelo={{ titulo: '', enCines: false, trailer: '' }}
        onSubmit={(valores) => console.log(valores)}
      />
    </>
  );
}
