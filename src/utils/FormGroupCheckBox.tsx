import { Field } from 'formik';

export default function FormGroupCheckBox(props: formGroupCheckProps) {
  return (
    <>
      <div className='form-group from-check'>
        <Field className='form-check-input' id={props.campo} name={props.campo} type='checkbox' />
        <label htmlFor={props.campo}>{props.label}</label>
      </div>
    </>
  );
}

interface formGroupCheckProps {
  label: string;
  campo: string;
}
