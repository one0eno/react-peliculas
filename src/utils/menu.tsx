import { NavLink } from 'react-router-dom';

export default function Menu() {
  //const claseActiva = 'active';
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className='container-fluid'>
        <NavLink className='navbar-brand' activeClassName='claseActiva' to='/'>
          React{' '}
        </NavLink>
        <div className='collapse navbar-collapse'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <NavLink className='nav-link' activeClassName='claseActiva' to='/generos'>
                Géneros
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' activeClassName='claseActiva' to='/peliculas/filtrar'>
                Filtro pelicula
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' activeClassName='claseActiva' to='/cines'>
                Cines
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' activeClassName='claseActiva' to='/actores'>
                Actores
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' activeClassName='claseActiva' to='/peliculas/crear'>
                Crear Pelicula
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
