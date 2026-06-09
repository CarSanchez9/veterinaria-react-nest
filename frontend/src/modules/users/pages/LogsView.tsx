import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import {
  obtenerLogs,
  eliminarLog,
} from "../../../services/logs.service";

interface Log {
  idLog: number;
  fecha: string;
  idUsuario: number;
  accion: string;
  ip: string;
}

export default function LogsView() {

  const [logs, setLogs] =
    useState<Log[]>([]);

  const [busqueda, setBusqueda] =
    useState("");

  useEffect(() => {
    cargarLogs();
  }, []);

  const cargarLogs =
    async () => {

      try {

        const data =
          await obtenerLogs();

        setLogs(data);

      } catch (error) {
        console.error(error);
      }
    };
  const generarReporteLogs = () => {

    const doc = new jsPDF();

    doc.setFontSize(16);

    doc.text(
      "Reporte de Logs de Acceso",
      14,
      15
    );

    autoTable(doc, {
      startY: 25,

      head: [[
        "ID",
        "Fecha",
        "Usuario",
        "Acción",
        "IP"
      ]],

      body: logsFiltrados.map(
        (log) => [
          log.idLog,
          new Date(
            log.fecha
          ).toLocaleString(),
          log.idUsuario,
          log.accion,
          log.ip,
        ]
      ),
    });

    doc.save(
      "reporte_logs.pdf"
    );
  };


  const borrarLog =
    async (id: number) => {

      if (
        !confirm(
          "¿Eliminar registro?"
        )
      ) {
        return;
      }

      try {

        await eliminarLog(id);

        cargarLogs();

      } catch (error) {
        console.error(error);
      }
    };

  const logsFiltrados =
    logs.filter(
      (log) =>
        log.accion
          .toLowerCase()
          .includes(
            busqueda.toLowerCase()
          ) ||
        String(log.idUsuario)
          .includes(busqueda)
    );

  return (
    <div>

      <h1 className="text-3xl font-bold text-primary mb-6">
        Logs de Acceso
      </h1>

      <div className="flex gap-4 mb-6">

        <Link
          to="/dashboard/users/usuario"
          className="bg-primary text-white px-5 py-2 rounded-lg"
        >
          Usuarios
        </Link>

        <Link
          to="/dashboard/users/roles"
          className="bg-blue-500 text-white px-5 py-2 rounded-lg"
        >
          Roles
        </Link>

        <Link
          to="/dashboard/users/logs"
          className="bg-purple-500 text-white px-5 py-2 rounded-lg"
        >
          Logs
        </Link>

      </div>

      <div className="bg-white p-6 rounded-xl shadow mb-6">

        <input
          type="text"
          placeholder="Buscar acción o usuario..."
          value={busqueda}
          onChange={(e) =>
            setBusqueda(
              e.target.value
            )
          }
          className="border p-3 rounded-lg w-full"
        />

      </div>
      <div className="flex justify-end mb-4">

        <button
          onClick={() => window.print()}
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Reporte PDF
        </button>
        <button
          onClick={generarReporteLogs}
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Descargar PDF
        </button>

      </div>
      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-3">
                ID
              </th>

              <th className="p-3">
                Fecha
              </th>

              <th className="p-3">
                Usuario
              </th>

              <th className="p-3">
                Acción
              </th>

              <th className="p-3">
                IP
              </th>

              <th className="p-3">
                Acciones
              </th>

            </tr>

          </thead>

          <tbody>

            {logsFiltrados.map(
              (log) => (

                <tr
                  key={log.idLog}
                  className="border-t"
                >

                  <td className="p-3">
                    {log.idLog}
                  </td>

                  <td className="p-3">
                    {
                      new Date(
                        log.fecha
                      ).toLocaleString()
                    }
                  </td>

                  <td className="p-3">
                    {log.idUsuario}
                  </td>

                  <td className="p-3">
                    {log.accion}
                  </td>

                  <td className="p-3">
                    {log.ip}
                  </td>

                  <td className="p-3">

                    <button
                      onClick={() =>
                        borrarLog(
                          log.idLog
                        )
                      }
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Eliminar
                    </button>

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}