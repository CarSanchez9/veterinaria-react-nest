import { useEffect, useState } from "react";

import {
  obtenerTratamientos,
  crearTratamiento,
  eliminarTratamiento,
} from "../../../services/tratamiento.service";

interface Tratamiento {
  idTratamiento: number;
  medicamento: string;
  dosis: string;
  duracion: string;
  idHistoria: number;
}

export default function TratamientoView() {

  const [tratamientos, setTratamientos] =
    useState<Tratamiento[]>([]);

  const [medicamento, setMedicamento] =
    useState("");

  const [dosis, setDosis] =
    useState("");

  const [duracion, setDuracion] =
    useState("");

  const [idHistoria, setIdHistoria] =
    useState("");

  const cargarTratamientos =
    async () => {

      try {

        const data =
          await obtenerTratamientos();

        setTratamientos(data);

      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    cargarTratamientos();
  }, []);

  const guardarTratamiento =
    async () => {

      try {

        await crearTratamiento({
          medicamento,
          dosis,
          duracion,
          idHistoria:
            Number(idHistoria),
        });

        setMedicamento("");
        setDosis("");
        setDuracion("");
        setIdHistoria("");

        cargarTratamientos();

      } catch (error) {
        console.log(error);
      }
    };

  const borrarTratamiento =
    async (id: number) => {

      if (
        !window.confirm(
          "¿Eliminar tratamiento?"
        )
      ) {
        return;
      }

      await eliminarTratamiento(id);

      cargarTratamientos();
    };

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Tratamientos
      </h1>

      <div className="bg-white p-6 rounded-xl shadow mb-8">

        <div className="grid grid-cols-2 gap-4">

          <input
            placeholder="Medicamento"
            value={medicamento}
            onChange={(e) =>
              setMedicamento(
                e.target.value
              )
            }
            className="border p-3 rounded"
          />

          <input
            placeholder="Dosis"
            value={dosis}
            onChange={(e) =>
              setDosis(
                e.target.value
              )
            }
            className="border p-3 rounded"
          />

          <input
            placeholder="Duración"
            value={duracion}
            onChange={(e) =>
              setDuracion(
                e.target.value
              )
            }
            className="border p-3 rounded"
          />

          <input
            placeholder="ID Historia"
            value={idHistoria}
            onChange={(e) =>
              setIdHistoria(
                e.target.value
              )
            }
            className="border p-3 rounded"
          />

        </div>

        <button
          onClick={
            guardarTratamiento
          }
          className="mt-4 bg-primary text-white px-6 py-3 rounded"
        >
          Guardar
        </button>

      </div>

      <div className="bg-white rounded-xl shadow p-6">

        <table className="w-full">

          <thead>

            <tr>

              <th>ID</th>

              <th>Medicamento</th>

              <th>Dosis</th>

              <th>Duración</th>

              <th>Historia</th>

              <th>Acciones</th>

            </tr>

          </thead>

          <tbody>

            {tratamientos.map(
              (t) => (
                <tr
                  key={
                    t.idTratamiento
                  }
                >
                  <td>
                    {
                      t.idTratamiento
                    }
                  </td>

                  <td>
                    {t.medicamento}
                  </td>

                  <td>
                    {t.dosis}
                  </td>

                  <td>
                    {t.duracion}
                  </td>

                  <td>
                    {t.idHistoria}
                  </td>

                  <td>

                    <button
                      onClick={() =>
                        borrarTratamiento(
                          t.idTratamiento
                        )
                      }
                      className="text-red-500"
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