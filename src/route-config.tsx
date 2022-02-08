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
  { path: '/generos/crear', componente: CrearGenero, esAdmin: true },
  { path: '/generos/:id(\\d+)', componente: EditarGenero, esAdmin: true },
  { path: '/generos', componente: IndiceGeneros, exact: true, esAdmin: true },

  { path: '/actores/crear', componente: Crearactores, esAdmin: true },
  { path: '/actores/:id(\\d+)', componente: Editaractores, esAdmin: true },
  { path: '/actores', componente: Indiceactores, exact: true, esAdmin: true },

  { path: '/cines/crear', componente: Crearcines, esAdmin: true },
  { path: '/cines/:id(\\d+)', componente: Editarcines, esAdmin: true },
  { path: '/cines', componente: Indicecines, exact: true, esAdmin: true },

  { path: '/peliculas/:id(\\d+)', componente: DetallePeliculas },
  { path: '/peliculas/crear', componente: CrearPeliculas, esAdmin: true },
  { path: '/peliculas/editar/:id(\\d+)', componente: EditarPeliculas, esAdmin: true },
  { path: '/peliculas/filtrar', componente: FiltroPeliculas },

  { path: '/', componente: LandingPage, exact: true },

  { path: '*', componente: RedirectLanding, exact: true },
];

export default rutas;
