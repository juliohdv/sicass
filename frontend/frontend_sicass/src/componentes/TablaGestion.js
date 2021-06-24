import React from "react";
import MaterialTable from "material-table";
export default function Tabla(props) {
  return (
    <div>
      <div className="pt-3">
        <MaterialTable
          columns={props.columna}
          data={props.dato}
          title={props.titulo}
          options={{
            actionsColumnIndex: -1,
          }}
          actions={[
            {
              icon: "edit",
              tooltip: "Editar elemento",
              onClick: (event, rowData) => alert("Has presionado editar el elemento"),
            },
            {
              icon: "delete",
              tooltip: "Eliminar elemento",
              onClick: (event, rowData) =>
                window.confirm("Has presionado eliminar elemento"),
            },
          ]}
          localization={{
            header: {
              actions: "Acciones",
            },
          }}
        />
      </div>
    </div>
  );
}

