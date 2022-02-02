import { Field, useFormikContext } from 'formik';
import ReactMarkdown from 'react-markdown';
import './Formgroupmarkdown.css';

interface formGroupMarkDownProps {
  campo: string;
  label: string;
}

export default function FormGroupMarkDown(props: formGroupMarkDownProps) {
  const { values } = useFormikContext<any>();
  console.log(props.campo);
  return (
    <>
      <div className='form-group form-makdown'>
        <div>
          <label>{props.label}</label>
          <div>
            <Field name={props.campo} id={props.campo} as='textarea' className='form-textarea' />
          </div>
        </div>
        <div>
          <label>{props.label} (preview):</label>
          <div className='markdown-container'>
            <ReactMarkdown>{values[props.campo]}</ReactMarkdown>
          </div>
        </div>
      </div>
    </>
  );
}
