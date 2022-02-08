import IndiceGeneros from './peliculas/generos/indiceGeneros';
import LandingPage from './LandingPage';
import CrearGenero from './peliculas/generos/CrearGenero';
import EditarGenero from './peliculas/generos/EditarGenero';
import { Crearactores } from './actores/crearactores';
import { Editaractores } from './actores/editaractores';
import { Indiceactores } from './actores/indiceactores';
import { Crearcines } from './cines/crearcines';

import Indicecines from './cines/indicecines';
import CrearPeliculas from './peliculas/CrearPelicula';
import EditarPeliculas from './peliculas/EditarPeliculas';
import FiltroPeliculas from './peliculas/FiltroPeliculas';
import Editarcines from './cines/editarcines';
import RedirectLanding from './utils/RedirectLanding';
import DetallePeliculas from './peliculas/DetallePeliculas';

const rutas = [
  { path: '/generos/crear', componente: CrearGenero },
  { path: '/generos/:id(\\d+)', componente: EditarGenero },
  { path: '/generos', componente: IndiceGeneros, exact: true },

  { path: '/actores/crear', componente: Crearactores },
  { path: '/actores/:id(\\d+)', componente: Editaractores },
  { path: '/actores', componente: Indiceactores, exact: true },

  { path: '/cines/crear', componente: Crearcines },
  { path: '/cines/:id(\\d+)', componente: Editarcines },
  { path: '/cines', componente: Indicecines, exact: true },

  { path: '/peliculas/:id(\\d+)', componente: DetallePeliculas },
  { path: '/peliculas/crear', componente: CrearPeliculas },
  { path: '/peliculas/editar/:id(\\d+)', componente: EditarPeliculas },
  { path: '/peliculas/filtrar', componente: FiltroPeliculas },

  { path: '/', componente: LandingPage, exact: true },

  { path: '*', componente: RedirectLanding, exact: true },
];

export default rutas;
