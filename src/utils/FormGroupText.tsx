import { ErrorMessage, Field } from 'formik';
import React from 'react';
import MostrarErrorCampo from './MostrarErrorCampo';

export default function FormGroupText(props: formGroupTextProps) {
  return (
    <>
      <div className='form-group'>
        {props.label ? <label htmlFor='nombre'>{props.label}</label> : null}
        <Field name={props.campo} className='form-control' />
        <ErrorMessage name={props.campo}>{(mensaje) => <MostrarErrorCampo mensaje={mensaje} />}</ErrorMessage>
      </div>
    </>
  );
}

interface formGroupTextProps {
  campo: string;
  label?: string;
  placeholder?: string;
}
