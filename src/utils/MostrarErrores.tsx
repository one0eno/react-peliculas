export default function MostrarErrores(props: mostrarErroresProps) {
  return (
    <>
      {props.errores ? (
        <ul style={{ listStyleType: 'none' }}>
          {props.errores.map((error) => {
            return (
              <li className='alert alert-danger' key={error}>
                {error}
              </li>
            );
          })}
        </ul>
      ) : (
        ''
      )}
    </>
  );
}

interface mostrarErroresProps {
  errores: string[];
}
