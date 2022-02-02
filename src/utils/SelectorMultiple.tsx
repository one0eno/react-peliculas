import './SelectorMultiple.css';
export default function SelectorMultiple(props: selectorMultipleProps) {
  const seleccionar = (item: selectorMultipleModel) => {
    const seleccionados = [...props.seleccionados, item];
    const noSeleccionados = props.noSeleccionados.filter((valor) => valor !== item);
    props.onChange(seleccionados, noSeleccionados);
  };

  const deseleccionar = (item: selectorMultipleModel) => {
    const noSeleccionados = [...props.noSeleccionados, item];
    const seleccionados = props.seleccionados.filter((valor) => valor !== item);
    props.onChange(seleccionados, noSeleccionados);
  };
  const seleccionarTodo = () => {
    const seleccionados = [...props.seleccionados, ...props.noSeleccionados];
    const noSelecionados: selectorMultipleModel[] = [];
    props.onChange(seleccionados, noSelecionados);
  };

  const deseleccionarTodo = () => {
    const seleccionados: selectorMultipleModel[] = [];
    const noSelecionados: selectorMultipleModel[] = [...props.seleccionados, ...props.noSeleccionados];
    props.onChange(seleccionados, noSelecionados);
  };

  return (
    <div className='selector-multiple'>
      <ul>
        {props.noSeleccionados.map((item) => {
          return (
            <li key={item.llave} onClick={() => seleccionar(item)}>
              {item.valor}
            </li>
          );
        })}
      </ul>
      <div className='selector-multiple-botones'>
        <button type='button' onClick={() => seleccionarTodo()}>
          {'>>'}
        </button>
        <button type='button' onClick={() => deseleccionarTodo()}>
          {'<<'}
        </button>
      </div>
      <ul>
        {props.seleccionados.map((item) => {
          return (
            <li key={item.llave} onClick={() => deseleccionar(item)}>
              {item.valor}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

interface selectorMultipleProps {
  seleccionados: selectorMultipleModel[];
  noSeleccionados: selectorMultipleModel[];
  onChange(seleccionados: selectorMultipleModel[], noSeleccionados: selectorMultipleModel[]): void;
}

export interface selectorMultipleModel {
  llave: number;
  valor: string;
}
