import { Formik, Form, Field } from 'formik';
import Button from '../utils/Button';
import { generoDTO } from './generos/generos.model';

interface filtroPeliculasForm {
  titulo: string;
  generoId: number;
  proximosEstrenos: boolean;
  enCines: boolean;
}
export default function FiltroPeliculas() {
  const valorInicial: filtroPeliculasForm = {
    titulo: '',
    generoId: 0,
    proximosEstrenos: false,
    enCines: false,
  };

  const generos: generoDTO[] = [
    { id: 1, nombre: 'Accion' },
    { id: 2, nombre: 'Terror' },
  ];

  return (
    <>
      <div>Filtro peliculas</div>

      <Formik initialValues={valorInicial} onSubmit={(valores) => console.log(valores)}>
        {(formikProps) => (
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
                Guardar
              </Button>
              <Button className='btn btn-danger mb-2 mx-sm-3' onClick={() => formikProps.setValues(valorInicial)}>
                Limpiar
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
