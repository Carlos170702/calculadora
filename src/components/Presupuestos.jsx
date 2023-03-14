import * as React from "react";
import { useSelector } from "react-redux";
import CurrencyFormat from "react-currency-format";

// css
import "./css/Presupuestos.css";

export const Presupuestos = () => {
  const { All } = useSelector((state) => state.calculadora);

  const [datos, setDatos] = React.useState({
    inpuestos: 0,
    flete: 0,
    seguro: 0,
    PesoKG: 0,
    total: 0,
  });

  const calcularTotal = () => {
    const inpuestos = All.reduce(
      (valorAnterior, ValorActual) => valorAnterior + ValorActual.inpuesto,
      0
    );
    const flete = All.reduce(
      (valorAnterior, ValorActual) =>
        valorAnterior + ValorActual.peso * ValorActual.valorOrigen,
      0
    );
    const seguro = All.reduce(
      (valorAnterior, ValorActual) => valorAnterior + ValorActual.valor * 0.01,
      0
    );

    const PesoKG = All.reduce(
      (valorAnterior, ValorActual) => valorAnterior + ValorActual.peso,
      0
    );

    setDatos({
      inpuestos,
      flete,
      seguro,
      PesoKG,
      total: inpuestos + seguro + flete
    });
  };

  React.useEffect(() => {
    calcularTotal();
  }, [All]);

  return (
    <div className=" scroll animate__animated animate__bounceInUp">
      <div className="data">
        <table className="presupuestos__table">
          <thead className="presupuestostHead">
            <tr>
              <th className="center">concepto</th>
              <th>Valor (US$)</th>
              <th>peso (Kg)</th>
              <th>inpuestos</th>
            </tr>
          </thead>
          <tbody className="presupuestostBody">
            {All.map(({ concepto, inpuesto, peso, valor }, index) => {
              return (
                <tr
                  key={index}
                  className="animate__animated animate__backInLeft"
                >
                  <td className="center">{concepto}</td>
                  <td>{valor}</td>
                  <td>{peso}</td>
                  <td> {inpuesto.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
          <hr
            color="black"
            style={{ height: "2px", marginTop: "5px", marginBottom: "10px" }}
          />
          <tfoot className="presupuestostFoot">
            <tr>
              <th></th>
              <th></th>
              <th>inpuestos</th>
              <th>
                <CurrencyFormat
                  value={datos.inpuestos.toFixed(2)}
                  displayType={"text"}
                />{" "}
                US$
              </th>
            </tr>
            <tr>
              <th></th>
              <th></th>
              <th>Seguro internacional 1%</th>
              <th>
                <CurrencyFormat
                  value={datos.seguro.toFixed(2)}
                  displayType={"text"}
                />{" "}
                US$
              </th>
            </tr>
            <tr>
              <th></th>
              <th></th>
              <th>flete</th>
              <th>
                <CurrencyFormat value={datos.flete} displayType={"text"} /> US$
              </th>
            </tr>
          </tfoot>
        </table>
      </div>

      <h5 className="textPEsoTotal">
        Peso a cobrar: <span>{datos.PesoKG} Kg</span>
      </h5>
      <p className="textExtra">
        ( Se utiliza el mayor de estos valores para el calculo del Envio )
      </p>
      <h5 className="textDineroTotal">Total a cobrar: {datos.total.toFixed(2)} US$</h5>
    </div>
  );
};
