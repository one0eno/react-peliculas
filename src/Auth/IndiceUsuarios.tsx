import { urlCuentas } from '../utils/endpoints';
import IndiceEntidad from '../utils/IndiceEntiedad';
import { usuarioDTO } from './Auth.model';
import Button from '../utils/Button';
import axios from 'axios';
import Swal from 'sweetalert2';
import { title } from 'process';
import icon from 'leaflet/dist/images/marker-icon.png';
import confirmar from '../utils/Confirmar';

export default function IndiceUsuarios() {
  const hacerAdmin = async (userId: string) => {
    try {
      await axios.post(`${urlCuentas}/hacerAdmin`, JSON.stringify(userId), {
        headers: { 'Content-type': 'application/json' },
      });

      Swal.fire({ title: 'Añadido', text: 'Se ha añadido como admin al usuario', icon: 'success' });
    } catch (error) {
      Swal.fire({ title: 'Error', text: 'Se ha producido un error', icon: 'error' });
      console.log(error.response.data);
    }
  };

  const removerAdmin = async (userId: string) => {
    try {
      await axios.post(`${urlCuentas}/removerAdmin`, JSON.stringify(userId));
      Swal.fire({ title: 'Añadido', text: 'Se ha eliminado como admin al usuario', icon: 'success' });
    } catch (error) {
      Swal.fire({ title: 'Error', text: 'Se ha producido un error', icon: 'error' });
      console.log(error.response.data);
    }
  };

  return (
    <IndiceEntidad<usuarioDTO> urlBase={`${urlCuentas}/listadoUsuarios`} titulo='Usuario'>
      {(usuarios, botones) => (
        <>
          <thead>
            <tr>
              <th></th>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody>
            {usuarios?.map((usuario) => {
              return (
                <tr key={usuario.id}>
                  <td>
                    <Button
                      onClick={() =>
                        confirmar(
                          async () => await hacerAdmin(usuario.id),
                          `¿Quiere hacer a ${usuario.email} administrador?`,
                          'Si'
                        )
                      }
                    >
                      Hacer Admin
                    </Button>{' '}
                    <Button
                      className='btn btn-danger'
                      onClick={() =>
                        confirmar(
                          async () => await removerAdmin(usuario.id),
                          `¿Quiere eliminar a ${usuario.email} como administrador?`,
                          'Eliminar'
                        )
                      }
                    >
                      Eliminar Admin
                    </Button>
                  </td>
                  <td>{usuario.email}</td>
                </tr>
              );
            })}
          </tbody>
        </>
      )}
    </IndiceEntidad>
  );
}
