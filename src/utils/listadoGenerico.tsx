import { ReactElement } from 'react';
import { Cargando } from './cargando';

export default function ListadoGenerico(props: listadoGeneracionProps) {
  if (!props.listado) {
    if (props.cargandoUI) {
      return props.cargandoUI;
    }
    return <Cargando />;
  } else if (props.listado.length === 0) {
    if (props.listadoVacioUI) {
      return props.listadoVacioUI;
    }
    return <>No hay elementos para mostar</>;
  } else {
    return props.children;
  }
}

interface listadoGeneracionProps {
  listado: any;
  children: ReactElement;
  cargandoUI?: ReactElement;
  listadoVacioUI?: ReactElement;
}
