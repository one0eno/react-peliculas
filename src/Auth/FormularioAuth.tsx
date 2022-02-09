import { crednecialesUsuario } from './Auth.model';
import { Form, FormikHelpers, Formik } from 'formik';
import * as Yup from 'yup';
import FormGroupText from '../utils/FormGroupText';
import Button from '../utils/Button';
import { Link } from 'react-router-dom';
export default function FormularioAuth(props: formularioAuthProps) {
  return (
    <Formik
      initialValues={props.modelo}
      onSubmit={props.onSubmit}
      validationSchema={Yup.object({
        email: Yup.string().required('Este campo es requerido').email('El email no parece valido'),
        password: Yup.string().required('Este campo es requerido'),
      })}
    >
      {(formikprops) => (
        <Form>
          <FormGroupText label='Email' campo='email' />
          <FormGroupText label='Password' campo='password' type='password' />

          <Button disable={formikprops.isSubmitting} type='submit'>
            Enviar
          </Button>
          <Link className='btn btn-secondary' to='/'>
            Cancelar
          </Link>
        </Form>
      )}
    </Formik>
  );
}

interface formularioAuthProps {
  modelo: crednecialesUsuario;
  onSubmit(valores: crednecialesUsuario, acciones: FormikHelpers<crednecialesUsuario>): void;
}
