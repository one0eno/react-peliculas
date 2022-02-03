import React from 'react';
import { Formik, FormikHelpers, Form } from 'formik';
import { actorCreacionDTO } from './actores.model';
import FormGroupText from '../utils/FormGroupText';
import Button from '../utils/Button';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import FormGroupFecha from '../utils/FormGroupFecha';
import FormGroupImagen from '../utils/FormGroupImagen';
import FormGroupMarkDown from '../utils/FormGroupMarkdown';

interface formularioDeActores {
  modelo: actorCreacionDTO;
  onSubmit(valores: actorCreacionDTO, acciones: FormikHelpers<actorCreacionDTO>): void;
}
export default function FormularioActores(props: formularioDeActores) {
  return (
    <Formik
      initialValues={props.modelo}
      onSubmit={props.onSubmit}
      validationSchema={Yup.object({
        nombre: Yup.string().required('El nombre es requerido').primeraLetraMayuscula(),
        fechaNacimiento: Yup.date().nullable().required('Campo requerido'),
      })}
    >
      {(formikProps) => (
        <Form>
          <FormGroupText campo='nombre' label='Nombre' />
          <FormGroupFecha campo='fechaNacimiento' label='Fecha Nacimiento' />
          <FormGroupImagen campo='foto' label='Foto' imagenURL={props.modelo.fotoURL} />
          <FormGroupMarkDown campo='biografia' label='Biografia' />
          <Button disable={formikProps.isSubmitting} type='submit'>
            Guardar
          </Button>
          <Link className='btn btn-secondary' to='/actores'>
            Cancelar
          </Link>
        </Form>
      )}
    </Formik>
  );
}
