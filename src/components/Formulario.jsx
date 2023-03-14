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
  { value: "notebook", label: "notebook", porcentaje: 50 },
  { value: "Acc. buceo", label: "Acc. buceo", porcentaje: 30 },
  {
    value: "Acc. de camara fotografíca",
    label: "Acc. de camara fotografíca",
    porcentaje: 20,
  },
  {
    value: "Acc. de computación",
    label: "Acc. de computación",
    porcentaje: 60,
  },
  { value: "Acc. de fotografía", label: "Acc. de computación", porcentaje: 70 },
];

export const Formulario = () => {
  const dispatch = useDispatch();
  const [paisSelect, setPaisSelect] = React.useState("");
  const [origen, setOrigen] = React.useState("");
  const [allCategoria, setAllCategoria] = React.useState(null);
  const [valores, SetValores] = React.useState({
    USD: parseInt(""),
    peso: parseInt(""),
  });
  const { Message, All } = useSelector((state) => state.calculadora);

  console.log(valores);

  return (
    <form className="calculadoraForm">
      <Select
        defaultValue={0}
        options={pais}
        placeholder="Select::"
        className="pais"
        onChange={({ value }) => setPaisSelect(value)}
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
              placeholder=":: Origen ::"
              onChange={({ value }) => setOrigen(value)}
            />
          </div>

          <div>
            <Select
              options={categoria}
              placeholder=":: Categoria de producto ::"
              defaultValue=":: Categoria de producto ::"
              className="appear animate__animated animate__bounceInUp"
              onChange={({ value, porcentaje }) =>
                setAllCategoria({
                  concepto: value,
                  valor: valores.USD,
                  peso: valores.peso,
                  inpuesto: valores.USD * (porcentaje / 100),
                  valorOrigen: origen === "Miami" ? 18 : 35,
                })
              }
              isDisabled={
                valores?.USD === 0 ||
                isNaN(valores?.USD) ||
                isNaN(valores?.peso) ||
                valores?.peso === 0 ||
                origen === ""
                  ? true
                  : false
              }
            />
          </div>
          {Message.status && (
            <h4 className="Formulario__Datos_Incompletos">{Message.message}</h4>
          )}

          <div className="CalculadoracontentBtn animate__animated animate__bounceInUp">
            <button
              className="btn"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                if (
                  paisSelect === "" ||
                  valores.USD === 0 ||
                  valores.peso === 0 ||
                  origen === "" ||
                  allCategoria === null
                ) {
                  dispatch(setMessage());
                  return;
                }

                dispatch(addValoresENvios(allCategoria));
                SetValores({
                  USD: parseInt(""),
                  peso: parseInt(""),
                });
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
