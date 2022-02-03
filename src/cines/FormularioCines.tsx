import { Formik, Form, FormikHelpers } from 'formik';
import React from 'react';
import { cineCreacionDTO } from './cines.model';
import * as Yup from 'yup';
import FormGroupText from '../utils/FormGroupText';
import Button from '../utils/Button';
import { Link } from 'react-router-dom';
import MapaFormulario from '../utils/MapaFormulario';
import { coordenadasDTO } from '../utils/coordenadasDTO';

interface formularioCinesProps {
  modelo: cineCreacionDTO;
  onSubmit(valores: cineCreacionDTO, acciones: FormikHelpers<cineCreacionDTO>): void;
}

export default function FormularioCines(props: formularioCinesProps) {
  function transformarCoordenadas(): coordenadasDTO[] | undefined {
    if (props.modelo.latitud && props.modelo.longitud) {
      const resp: coordenadasDTO = {
        lat: props.modelo.latitud,
        lng: props.modelo.longitud,
      };

      return [resp];
    }
    return undefined;
  }

  return (
    <Formik
      initialValues={props.modelo}
      onSubmit={props.onSubmit}
      validationSchema={Yup.object({
        nombre: Yup.string().required('Nombre es obligatorio').primeraLetraMayuscula(),
      })}
    >
      {(formikProps) => (
        <Form>
          <FormGroupText label='Nombre' campo='nombre' />

          <div style={{ marginBottom: '1rem' }}>
            <MapaFormulario campoLat='latitud' campoLng='longitud' coordenadas={transformarCoordenadas()} />
          </div>
          <Button disable={formikProps.isSubmitting} type='submit'>
            Salvar
          </Button>
          <Link to='/cines' className='btn btn-secondary'>
            Cancelar
          </Link>
        </Form>
      )}
    </Formik>
  );
}
