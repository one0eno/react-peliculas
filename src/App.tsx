import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Menu from './utils/menu';
import rutas from './route-config';
import configurarsValidaciones from './validaciones';
import './App.css';
import AutenticacionContext from './Auth/AutenticacionContext';
import { useState, useEffect } from 'react';
import { claim } from './Auth/Auth.model';
import { obetenerClaims } from './Auth/ManejadorJWT';
import { configurarInterceptor } from './utils/Interceptores';
configurarsValidaciones();
configurarInterceptor();

function App() {
  const [claims, setClaims] = useState<claim[]>([
    //{ nombre: 'email', valor: 'jorge@hotmail.com' },
    // { nombre: 'role', valor: 'admin' },
  ]);

  useEffect(() => {
    setClaims(obetenerClaims());
  }, []);
  const actualizar = (claims: claim[]) => {
    setClaims(claims);
  };

  function esAdmin() {
    return claims.findIndex((claim) => claim.nombre === 'role' && claim.valor === 'admin') > -1;
  }
  return (
    <>
      <BrowserRouter>
        <AutenticacionContext.Provider value={{ claims, actualizar }}>
          <Menu />
          <div className='container'>
            <Switch>
              {rutas.map((ruta) => (
                <Route key={ruta.path} path={ruta.path} exact={ruta.exact}>
                  {ruta.esAdmin && !esAdmin() ? (
                    <>No tiene permiso para acceder a este componente</>
                  ) : (
                    <ruta.componente />
                  )}
                </Route>
              ))}
            </Switch>
          </div>
        </AutenticacionContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
