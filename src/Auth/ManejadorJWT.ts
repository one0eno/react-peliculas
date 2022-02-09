import { respuestaAutenticacion, claim } from './Auth.model';

const llaveToken = 'token';
const llaveExpiracion = 'token-expiracion';

export function guardarTokenLocalStorage(autenticacion: respuestaAutenticacion) {
  localStorage.setItem(llaveToken, autenticacion.token);
  localStorage.setItem(llaveExpiracion, autenticacion.expiracion.toString());
}

export function obetenerClaims(): claim[] {
  const token = localStorage.getItem(llaveToken);
  if (!token) {
    return [];
  }
  const expiracion = localStorage.getItem(llaveExpiracion)!;
  const expiracionDate = new Date(expiracion);

  //si expira
  if (expiracionDate <= new Date()) {
    LogoOut();
    return [];
  }

  //tomamos los claims del token
  const dataToken = JSON.parse(atob(token.split('.')[1]));

  const respuesta: claim[] = [];

  for (const propiedad in dataToken) {
    respuesta.push({ nombre: propiedad, valor: dataToken[propiedad] });
  }

  return respuesta;
}

export function LogoOut() {
  localStorage.removeItem(llaveToken);
  localStorage.removeItem(llaveExpiracion);
}
