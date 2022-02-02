import EditarEntidad from '../../utils/EditarEntidad';
import { urlGeneros } from '../../utils/endpoints';
import FormularioGeneros from './FormularioGeneros';
import { generaoCreacionDTO, generoDTO } from './generos.model';

export default function EditarGenero() {
  return (
    <>
      <EditarEntidad<generaoCreacionDTO, generoDTO> urlBase={urlGeneros} urlIndice='/generos' nombreEntidad='Generos'>
        {(entidad, editar) => (
          <FormularioGeneros
            modelo={entidad}
            onSubmit={async (valores) => {
              await editar(valores);
            }}
          />
        )}
      </EditarEntidad>
    </>
  );
}
