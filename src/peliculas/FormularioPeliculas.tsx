import { Form, Formik, FormikHelpers } from 'formik';
import { peliculasCreacionDTO } from './peliculas.model';
import * as Yup from 'yup';
import FormGroupText from '../utils/FormGroupText';
import FormGroupCheckBox from '../utils/FormGroupCheckBox';
import FormGroupFecha from '../utils/FormGroupFecha';
import FormGroupImagen from '../utils/FormGroupImagen';
import Button from '../utils/Button';
import { Link } from 'react-router-dom';
import SelectorMultiple from '../utils/SelectorMultiple';
import { generoDTO } from './generos/generos.model';
import { useState } from 'react';
import { selectorMultipleModel } from '../utils/SelectorMultiple';
import { cineDTO } from '../cines/cines.model';
import TypeAheadActores from '../actores/TypeAheadActores';
import { actorPeliculaDTO } from '../actores/actores.model';

const mapear = (arreglo: { id: number; nombre: string }[]): selectorMultipleModel[] => {
  if (arreglo) {
    return arreglo.map((valor) => {
      return { llave: valor.id, valor: valor.nombre };
    });
  }
  return [];
};

export default function FormularioPeliculas(props: formularioPeliculasProps) {
  const [generosSeleccionados, setGenerosSeleccionados] = useState(mapear(props.generosSeleccionados));
  const [generosNoSeleccionados, setGenerosNoSeleccionados] = useState(mapear(props.generosNoSeleccionados));

  const [cinesSeleccionados, setCinesSeleccionados] = useState(mapear(props.cinesSeleccionados));
  const [cinesNoSeleccionados, setCinesNoSeleccionados] = useState(mapear(props.cinesNoSeleccionados));

  const [actoresSeleccionados, setActoresSelecionados] = useState<actorPeliculaDTO[]>(props.actoresSeleccionaos);

  return (
    <>
      <Formik
        initialValues={props.modelo}
        onSubmit={(valores, acciones) => {
          console.log(valores);
          valores.generosIds = generosSeleccionados.map((valor) => valor.llave);
          valores.cinesId = cinesSeleccionados.map((valor) => valor.llave);
          valores.actores = actoresSeleccionados;
          props.onSubmit(valores, acciones);
        }}
        validationSchema={Yup.object({
          titulo: Yup.string().required('Campo Requerido').primeraLetraMayuscula(),
        })}
      >
        {(formikProps) => (
          <Form>
            <FormGroupText label='Titulo' campo='titulo' />
            <FormGroupText label='Resumen' campo='resumen' />
            <FormGroupCheckBox label='En cines' campo='enCines' />
            <FormGroupText label='Trailer' campo='trailer' />
            <FormGroupFecha label='Fecha lanzamiento' campo='fechaLanzamiento' />
            <FormGroupImagen campo='poster' label='Poster' imagenURL={props.modelo.posterURL} />
            <div className='form-group'>
              <label>G??neros</label>
              <SelectorMultiple
                seleccionados={generosSeleccionados}
                noSeleccionados={generosNoSeleccionados}
                onChange={(seleccionados, noSeleccionados) => {
                  setGenerosNoSeleccionados(noSeleccionados);
                  setGenerosSeleccionados(seleccionados);
                }}
              />
            </div>
            <div className='form-group'>
              <label>Cines</label>
              <SelectorMultiple
                seleccionados={cinesSeleccionados}
                noSeleccionados={cinesNoSeleccionados}
                onChange={(seleccionados, noSeleccionados) => {
                  setCinesNoSeleccionados(noSeleccionados);
                  setCinesSeleccionados(seleccionados);
                }}
              />
            </div>
            <div className='form-group'>
              <TypeAheadActores
                onAdd={(actores) => {
                  setActoresSelecionados(actores);
                }}
                onRemove={(actor) => {
                  const actores = actoresSeleccionados.filter((o) => o !== actor);
                  setActoresSelecionados(actores);
                }}
                actores={actoresSeleccionados}
                listadoUI={(actor: actorPeliculaDTO) => (
                  <>
                    {actor.nombre} /{' '}
                    <input
                      placeholder='Personaje'
                      type='text'
                      value={actor.personaje}
                      onChange={(e) => {
                        const indice = actoresSeleccionados.findIndex((o) => o.id === actor.id);
                        const actores = [...actoresSeleccionados];
                        actores[indice].personaje = e.currentTarget.value;
                        setActoresSelecionados(actores);
                      }}
                    />
                  </>
                )}
              />
            </div>

            <Button disabled={formikProps.isSubmitting} type='submit'>
              Guardar
            </Button>
            <Link to='/' className='btn btn-secondarey'>
              Cancelar
            </Link>
          </Form>
        )}
      </Formik>
    </>
  );
}

interface formularioPeliculasProps {
  modelo: peliculasCreacionDTO;
  onSubmit(valores: peliculasCreacionDTO, acciones: FormikHelpers<peliculasCreacionDTO>): void;
  generosSeleccionados: generoDTO[];
  generosNoSeleccionados: generoDTO[];
  cinesSeleccionados: cineDTO[];
  cinesNoSeleccionados: cineDTO[];
  actoresSeleccionaos: actorPeliculaDTO[];
}
