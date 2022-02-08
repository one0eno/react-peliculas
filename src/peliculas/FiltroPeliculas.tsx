import { Formik, Form, Field } from 'formik';
import Button from '../utils/Button';
import { generoDTO } from './generos/generos.model';
import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { urlGeneros, urlPeliculas } from '../utils/endpoints';
import { peliculaDTO } from './peliculas.model';
import ListadoPeliculas from './ListadoPeliculas';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import Paginacion from '../utils/Paginacion';

interface filtroPeliculasForm {
  titulo: string;
  generoId: number;
  proximosEstrenos: boolean;
  enCines: boolean;
  pagina: number;
  recordsPorPagina: number;
}
export default function FiltroPeliculas() {
  const valorInicial: filtroPeliculasForm = {
    titulo: '',
    generoId: 0,
    proximosEstrenos: false,
    enCines: false,
    pagina: 1,
    recordsPorPagina: 1,
  };

  const [generos, setGeneros] = useState<generoDTO[]>([]);
  const [peliculas, setPelicula] = useState<peliculaDTO[]>([]);
  const history = useHistory();
  //const { titulo, generoId, proximosEstrenos, enCines, pagina, recordsPorPagina }: any = useParams();
  const query = new URLSearchParams(useLocation().search);
  const [totalPaginas, setTotalDePaginas] = useState<any>();

  const ModificarUrl = (valores: filtroPeliculasForm) => {
    const queryString: string[] = [];

    if (valores.titulo) queryString.push(`titulo=${valores.titulo}`);
    if (valores.enCines) queryString.push(`enCines=${valores.enCines}`);
    if (valores.generoId) queryString.push(`generoId=${valores.generoId}`);
    if (valores.proximosEstrenos) queryString.push(`proximosEstrenos=${valores.proximosEstrenos}`);

    queryString.push(`pagina=${valores.pagina}`);

    history.push(`/peliculas/filtrar?${queryString.join('&')}`);
  };

  useEffect(() => {
    axios.get(`${urlGeneros}/todos`).then((response: AxiosResponse<generoDTO[]>) => {
      setGeneros(response.data);
    });
  }, []);
  useEffect(() => {
    if (query.get('titulo')) valorInicial.titulo = query.get('titulo')!;
    if (query.get('generoId')) valorInicial.generoId = parseInt(query.get('generoId')!, 10);
    if (query.get('enCines')) valorInicial.enCines = true;
    if (query.get('proximosEstrenos')) valorInicial.proximosEstrenos = true;
    if (query.get('pagina')) valorInicial.pagina = parseInt(query.get('pagina')!, 10);

    buscarPeliculas(valorInicial);
  }, []);

  const buscarPeliculas = (filtro: filtroPeliculasForm) => {
    ModificarUrl(filtro);
    axios.get(`${urlPeliculas}/filtrar`, { params: filtro }).then((response: AxiosResponse<peliculaDTO[]>) => {
      const totalRegistros = parseInt(response.headers['cantidadtotalregistros'], 10);
      setTotalDePaginas(Math.ceil(totalRegistros / valorInicial.recordsPorPagina));

      setPelicula(response.data);
    });
  };

  return (
    <>
      <div>Filtro peliculas</div>

      <Formik
        initialValues={valorInicial}
        onSubmit={(valores) => {
          valores.pagina = 1;
          buscarPeliculas(valores);
        }}
      >
        {(formikProps) => (
          <>
            <Form>
              <div className='form-inline'>
                <div className='form-group mb-2'>
                  <label htmlFor='titulo' className='sr-only'>
                    Titulo
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='titulo'
                    placeholder='Titulo'
                    {...formikProps.getFieldProps('titulo')}
                  />
                </div>
                <div className='form-group mx-sm-3 mb-2'>
                  <select className='form-control' title='generos' {...formikProps.getFieldProps('generoId')}>
                    <option value={0}>Seleccione un genero</option>
                    {generos.map((genero) => {
                      return (
                        <option key={genero.id} value={genero.id}>
                          {genero.nombre}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className='form-group mx-sm-3 mb-2'>
                  <Field className='form-check-input' name='proximosEstrenos' id='proximosEstrenos' type='checkbox' />
                  <label className='form-check-label' htmlFor='proximosEstrenos'>
                    Próximos estrenos
                  </label>
                </div>
                <div className='form-group mx-sm-3 mb-2'>
                  <Field className='form-check-input' name='enCines' id='enCines' type='checkbox' />
                  <label className='form-check-label' htmlFor='enCines'>
                    En cines
                  </label>
                </div>
                <Button className='btn btn-primary mb-2 mx-sm-3' onClick={() => formikProps.submitForm()}>
                  Buscar
                </Button>
                <Button
                  className='btn btn-danger mb-2 mx-sm-3'
                  onClick={() => {
                    formikProps.setValues(valorInicial);
                    buscarPeliculas(valorInicial);
                  }}
                >
                  Limpiar
                </Button>
              </div>
            </Form>
            <ListadoPeliculas peliculas={peliculas} />
            <Paginacion
              cantidadTotalDePaginas={totalPaginas}
              paginaActual={formikProps.values.pagina}
              onChange={(nuevaPagina) => {
                formikProps.values.pagina = nuevaPagina;
                buscarPeliculas(formikProps.values);
              }}
            />
          </>
        )}
      </Formik>
    </>
  );
}
