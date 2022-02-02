import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Menu from './utils/menu';
import rutas from './route-config';
import configurarsValidaciones from './validaciones';
import './App.css';
configurarsValidaciones();

function App() {
  return (
    <>
      <BrowserRouter>
        <Menu />
        <div className='container'>
          <Switch>
            {rutas.map((ruta) => (
              <Route key={ruta.path} path={ruta.path} exact={ruta.exact}>
                <ruta.componente />
              </Route>
            ))}
          </Switch>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
