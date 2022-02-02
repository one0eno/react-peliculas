import { Form, Formik, FormikHelpers } from 'formik';

import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import Button from '../../utils/Button';
import FormGroupText from '../../utils/FormGroupText';
import { generaoCreacionDTO } from './generos.model';

interface formularioGenerosProps {
  modelo: generaoCreacionDTO;
  onSubmit(valores: generaoCreacionDTO, accion: FormikHelpers<generaoCreacionDTO>): void;
}
export default function FormularioGeneros(props: formularioGenerosProps) {
  return (
    <Formik
      initialValues={props.modelo}
      onSubmit={props.onSubmit}
      validationSchema={Yup.object({
        nombre: Yup.string()
          .required('Campo requerido')
          .primeraLetraMayuscula()
          .max(50, 'El genero no puede tener mas de 50 caracteres'),
      })}
    >
      {(formikProps) => (
        <Form>
          <FormGroupText campo='nombre' label='Nombre' />
          <Button disabled={formikProps.isSubmitting} type='submit'>
            Guardar
          </Button>
          <Link className='btn btn-secondary' to='/generos'>
            Cancelar
          </Link>
        </Form>
      )}
    </Formik>
  );
}
