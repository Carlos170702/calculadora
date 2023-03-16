import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { addValoresENvios, reset, setMessage } from "../store/calculadoraSlice";
import { Presupuestos } from "./Presupuestos";

const Origen = [
  { value: "Miami", label: "Miami" },
  { value: "China", label: "China" },
];

const pais = [
  { value: "Argentina", label: "Argentina" },
  { value: "Republica Dominicana", label: "Republica Dominicana" },
];

const categoria = [
  {
    value: "notebook",
    label: "notebook",
    porcentaje: 50,
    porcentajeRepublica: 10,
  },
  {
    value: "Acc. buceo",
    label: "Acc. buceo",
    porcentaje: 30,
    porcentajeRepublica: 10,
  },
  {
    value: "Acc. de camara fotografíca",
    label: "Acc. de camara fotografíca",
    porcentaje: 20,
    porcentajeRepublica: 10,
  },
  {
    value: "Acc. de computación",
    label: "Acc. de computación",
    porcentaje: 60,
    porcentajeRepublica: 10,
  },
  {
    value: "Acc. de fotografía",
    label: "Acc. de computación",
    porcentaje: 70,
    porcentajeRepublica: 10,
  },
];

export const Formulario = () => {
  const dispatch = useDispatch();
  const [paisSelect, setPaisSelect] = React.useState("");
  const [origen, setOrigen] = React.useState("");
  const [categori, setCategori] = React.useState("");
  const [valores, SetValores] = React.useState({
    USD: "",
    peso: "",
  });
  const { Message, All } = useSelector((state) => state.calculadora);

  const handleCalcular = () => {
    if (
      paisSelect === "" ||
      valores.USD === "" ||
      valores.peso === "" ||
      origen === "" ||
      categori === ""
    ) {
      dispatch(setMessage());
      return;
    }

    SetValores({ USD: "", peso: "" });

    return {
      concepto: categori?.value,
      valor: valores.USD,
      peso: valores.peso,
      inpuesto: valores.USD * handleValorInpuestos(),
      valorOrigen: handleValorOrigen(),
    };
  };

  const handleDesableCategory = () => {
    return valores?.USD === 0 ||
      valores?.USD === "" ||
      valores?.peso === "" ||
      origen === ""
      ? true
      : false;
  };

  const handleAddGlobalStore = (data) => {
    dispatch(addValoresENvios(data));
  };

  //* aqui es donde tu configuraras lo de el flete man pero antes de eso necesitas agregar los nuevos origenes al array de ariva origen
  const handleValorOrigen = () => {
    //* aqui es donde haces la condicion de que pais es el que seleccion y de ahi hacer condicion de el origen para que le pongas el valor dependiendo al origen
    if (paisSelect === "Argentina") {
      return origen === "Miami" ? 18 : 35; //* aqui es donde le pondras es valor 
    }

    if (paisSelect === "Republica Dominicana") {
      return 3.99;
    }
  };

  const handleValorInpuestos = () => {
    if (paisSelect === "Republica Dominicana") {
      return categori?.porcentajeRepublica / 100;
    }

    if (paisSelect === "Argentina") {
      return categori?.porcentaje / 100;
    }
  };

  return (
    <form className="calculadoraForm">
      <Select
        options={pais}
        placeholder="Select::"
        className="pais"
        isClearable
        onChange={(e) => setPaisSelect(e?.value)}
      />

      {!!paisSelect && (
        <>
          <div className="calculadoraDatos animate__animated animate__bounceInUp">
            <input
              id="USD"
              type="number"
              placeholder="Ingresa el valor en USD"
              onChange={(e) =>
                SetValores({
                  ...valores,
                  USD: parseInt(e.target.value),
                })
              }
              value={valores.USD}
            />
            <input
              type="number"
              placeholder="Ingresa el peso en KG de importación"
              onChange={(e) =>
                SetValores({
                  ...valores,
                  peso: parseInt(e.target.value),
                })
              }
              value={valores.peso}
            />
            <Select
              options={Origen}
              placeholder=":: Origen :: "
              onChange={({ value }) => setOrigen(value)}
            />
          </div>

          <div>
            <Select
              options={categoria}
              placeholder=":: Categoria de producto ::"
              defaultValue=":: Categoria de producto ::"
              className="appear animate__animated animate__bounceInUp"
              onChange={(e) => {
                setCategori(e);
              }}
              isDisabled={handleDesableCategory()}
            />
          </div>
          {Message.status && (
            <h4 className="Formulario__Datos_Incompletos animate__animated animate__bounceInRight">
              {Message.message}
            </h4>
          )}

          <div className="CalculadoracontentBtn animate__animated animate__bounceInUp">
            <button
              className="btn"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                const response = handleCalcular();
                !!response && handleAddGlobalStore(response);
              }}
            >
              Agregar Item
            </button>

            <button
              className="btn"
              onClick={(e) => {
                e.preventDefault();
                dispatch(reset());
                setPaisSelect("");
              }}
            >
              Reiniciar
            </button>
          </div>

          {All.length > 0 && <Presupuestos />}
        </>
      )}
    </form>
  );
};
