import { useEffect } from 'react';
import { useState } from 'react';

export default function Paginacion(props: paginacionProps) {
  const [listadoLinks, setListadoLinks] = useState<modeloLink[]>([]);
  useEffect(() => {
    const paginaAnteriorHabilitada = props.paginaActual !== 1;
    const paginaAnterior = props.paginaActual - 1;

    const links: modeloLink[] = [];

    links.push({
      texto: 'Anterior',
      habilitado: paginaAnteriorHabilitada,
      pagina: paginaAnterior,
      activo: false,
    });

    for (let i = 1; i < props.cantidadTotalDePaginas; i++) {
      if (i >= props.paginaActual - props.radio && i <= props.paginaActual + props.radio) {
        links.push({
          texto: `${i}`,
          activo: props.paginaActual === i,
          habilitado: true,
          pagina: i,
        });
      }
    }

    const paginaSiguienteHabilitada =
      props.paginaActual !== props.cantidadTotalDePaginas && props.cantidadTotalDePaginas > 0;
    const paginaSiguiente = props.paginaActual + 1;

    links.push({
      texto: 'Siguiente',
      pagina: paginaSiguiente,
      habilitado: paginaSiguienteHabilitada,
      activo: false,
    });

    setListadoLinks(links);
  }, [props.paginaActual, props.cantidadTotalDePaginas, props.radio]);

  const obtenerClase = (lnk: modeloLink) => {
    if (lnk.activo) {
      return 'active pointer';
    }
    if (!lnk.habilitado) {
      return 'disabled';
    }

    return 'pointer';
  };

  const seleccionarPagina = (lnk: modeloLink) => {
    if (lnk.pagina === props.paginaActual) {
      return;
    }
    if (!lnk.habilitado) {
      return;
    }
    props.onChange(lnk.pagina);
  };

  return (
    <>
      <nav>
        <ul className='pagination justify-content center'>
          {listadoLinks.map((lnk) => {
            return (
              <li
                key={lnk.texto}
                onClick={() => seleccionarPagina(lnk)}
                className={`page-item cursor ${obtenerClase(lnk)}`}
              >
                <span className='page-link'>{lnk.texto}</span>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

interface modeloLink {
  pagina: number;
  habilitado: boolean;
  texto: string;
  activo: boolean;
}

interface paginacionProps {
  paginaActual: number;
  cantidadTotalDePaginas: number;
  radio: number; //paginas que mostramos en el control de paginacion
  onChange(pagina: number): void;
}

Paginacion.defaultProps = {
  radio: 3,
};
