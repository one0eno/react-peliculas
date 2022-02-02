import { ChangeEvent, useState } from 'react';
import { useFormikContext } from 'formik';

export default function FormGroupImagen(props: formGroupImagen) {
  const [imagenBase64, setImagenBase64] = useState('');
  const [imagenURL, setImagenURL] = useState(props.imagenURL);

  const { values } = useFormikContext<any>();

  const handelOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      const archivo = e.currentTarget.files[0];
      aBase64(archivo)
        .then((representacionBase64: any) => setImagenBase64(representacionBase64))
        .catch((error) => console.error(error));

      values[props.campo] = archivo;
      setImagenURL('');
    }
  };

  const aBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const divStyle = {
    marginTop: '10px',
  };
  const imgStyle = {
    width: '450px',
  };

  return (
    <>
      <div className='form-group'>
        <label>{props.label}</label>
        <div>
          <input type='file' accept='.jpg,.jpeg,.png' onChange={handelOnChange} title='imagen' />
        </div>
        {imagenBase64 ? (
          <div>
            <div style={divStyle}>
              <img style={imgStyle} src={imagenBase64} alt='imagen seleccionada' />
            </div>
          </div>
        ) : null}
        {imagenURL ? (
          <div>
            <div style={divStyle}>
              <img style={imgStyle} src={imagenURL} alt='imagen seleccionada' />
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

interface formGroupImagen {
  campo: string;
  label: string;
  imagenURL?: string;
}

FormGroupImagen.defaultProps = {
  imagenUrl: '',
};
