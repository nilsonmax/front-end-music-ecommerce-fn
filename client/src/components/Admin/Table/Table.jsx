import React, { useEffect, useState } from "react";

const Table = ({ dataRender, columnsRender }) => {
  const [imgTrue, setImgTrue] = useState(false);
  useEffect(() => {
    if (dataRender[0].column2.slice(0, 8) === "https://") {
      setImgTrue(true);
    }
  });
  return (
    <table class="table-auto">
      <thead>
        <tr>
          <th>Id</th>
          {columnsRender.map((name) => {
            return <th key={name.id}>{name}</th>;
          })}
          <th>Eliminar</th>
          <th>Editar</th>
        </tr>
      </thead>
      <tbody>
        {dataRender.map((data, key) => {
          return (
            <tr>
              <td>{key + 1}</td>
              <td>{data.column1}</td>
              <td>{imgTrue ? <img src={data.column2} /> : data.column2}</td>
              <td>{data.column3}</td>
              <td>{data.column4}</td>
              <td>Eliminar</td>
              <td>Editar</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
