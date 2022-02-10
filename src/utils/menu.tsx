import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AutenticacionContext from '../Auth/AutenticacionContext';
import Autorizado from '../Auth/Autorizado';
import { LogoOut } from '../Auth/ManejadorJWT';
import Button from './Button';

export default function Menu() {
  //const claseActiva = 'active';

  const { actualizar, claims } = useContext(AutenticacionContext);

  function obtenerNombreUsuario(): string {
    return claims.filter((x) => x.nombre === 'email')[0]?.valor;
  }
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className='container-fluid'>
        <div className='collapse navbar-collapse' style={{ display: 'flex', justifyContent: 'space-between' }}>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <NavLink className='navbar-brand' activeClassName='claseActiva' to='/'>
                React Peliculas
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' activeClassName='claseActiva' to='/peliculas/filtrar'>
                Filtro pelicula
              </NavLink>
            </li>

            <li className='nav-item'>
              <NavLink className='nav-link' activeClassName='claseActiva' to='/peliculas/reserva'>
                Entradas
              </NavLink>
            </li>

            <Autorizado
              role='admin'
              autorizado={
                <>
                  <li className='nav-item'>
                    <NavLink className='nav-link' activeClassName='claseActiva' to='/generos'>
                      Géneros
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
                  <li className='nav-item'>
                    <NavLink className='nav-link' activeClassName='claseActiva' to='/usuarios'>
                      Usuarios
                    </NavLink>
                  </li>
                </>
              }
            />
          </ul>
          <div className='d-flex'>
            <Autorizado
              autorizado={
                <>
                  <span className='nav-link'>Hola, {obtenerNombreUsuario()}</span>
                  <Button
                    onClick={() => {
                      LogoOut();
                      actualizar([]);
                    }}
                    className='nav-link btn btn-link'
                  >
                    LogOut
                  </Button>
                </>
              }
              noAutorizado={
                <>
                  <Link to='registro' className='nav-link btn btn-link'>
                    Registro
                  </Link>
                  <Link to='/login' className='nav-link btn btn-link'>
                    Login
                  </Link>
                </>
              }
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
