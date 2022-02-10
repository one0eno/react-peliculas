import axios, { AxiosResponse } from 'axios';
import { useEffect, useState, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import confirmar from './Confirmar';
import ListadoGenerico from './listadoGenerico';
import Paginacion from './Paginacion';

export default function IndiceEntidad<T>(props: indiceEntidadProps<T>) {
  const [entidades, setEntidades] = useState<T[]>([]);
  const [totalDePaginas, setTotalDePaginas] = useState(0);
  const [recordsPorPagina, setRecordsPorPagina] = useState(10);
  const [pagina, setPagina] = useState(1);

  useEffect(() => {
    cargarDatos();
  }, [pagina, recordsPorPagina]);

  const cargarDatos = () => {
    //alert(props.urlBase);
    axios
      .get(props.urlBase, {
        params: {
          pagina,
          recordsPorPagina,
        },
      })
      .then((respuesta: AxiosResponse<T[]>) => {
        //console.log(respuesta.data);
        //recuperamos del header
        const taotalDeRegistros = parseInt(respuesta.headers['cantidadtotalregistros'], 10);
        setTotalDePaginas(Math.ceil(taotalDeRegistros / recordsPorPagina));
        setEntidades(respuesta.data);
      });
  };

  const borrar = async (id: number) => {
    try {
      await axios.delete(`${props.urlBase}/${id}`);
      cargarDatos();
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const botones = (urlEditar: string, id: number) => {
    return (
      <>
        <Link className='btn btn-success' to={`${urlEditar}`}>
          Editar
        </Link>{' '}
        <Button className='btn btn-danger' onClick={() => confirmar(() => borrar(id))}>
          Borrar
        </Button>
      </>
    );
  };
  return (
    <>
      <div>{props.titulo}</div>

      {props.urlCrear ? (
        <Link className='btn btn-primary' to={`${props.urlCrear}`}>
          Crear {props.nombreEntidad}
        </Link>
      ) : null}

      <div className='row'>
        <div className='col-1'>
          <div className='form-group'>
            <select
              defaultValue={10}
              className='form-control'
              title='Registros por pagina'
              onChange={(e) => {
                setPagina(1);
                setRecordsPorPagina(parseInt(e.currentTarget.value, 10));
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
        <div className='col-10'>
          <Paginacion
            cantidadTotalDePaginas={totalDePaginas}
            paginaActual={pagina}
            onChange={(nuevaPagina) => setPagina(nuevaPagina)}
          />
        </div>
      </div>

      <ListadoGenerico listado={entidades}>
        <table className='table table-striped'>{props.children(entidades!, botones)}</table>
      </ListadoGenerico>
    </>
  );
}

interface indiceEntidadProps<T> {
  urlBase: string;
  titulo: string;

  urlCrear?: string;
  nombreEntidad?: string;
  children(entidades: T[], botones: (urlEditar: string, id: number) => ReactElement): ReactElement;
}
