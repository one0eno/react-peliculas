export interface claim {
  nombre: string;
  valor: string;
}

export interface crednecialesUsuario {
  email: string;
  password: string;
}

export interface respuestaAutenticacion {
  token: string;
  expiracion: Date;
}
