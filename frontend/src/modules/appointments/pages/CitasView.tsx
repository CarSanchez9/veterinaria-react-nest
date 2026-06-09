import {
  useEffect,
  useState,
} from "react";

import {
  obtenerCitas,
  crearCita,
  eliminarCita,
} from "../../../services/cita.service";

export default function CitasView() {

  const [citas, setCitas] =
    useState<any[]>([]);

  const [fechaHora, setFechaHora] =
    useState("");

  const [motivo, setMotivo] =
    useState("");

  const [idMascota, setIdMascota] =
    useState("");

  const [idVeterinario,
    setIdVeterinario] =
    useState("");

  useEffect(() => {
    cargarCitas();
  }, []);

  const cargarCitas =
    async () => {

      try {

        const data =
          await obtenerCitas();

        setCitas(data);

      } catch (error) {
        console.error(error);
      }
    };

  const guardarCita =
    async () => {

      try {

        await crearCita({
          fechaHora,
          motivo,
          idMascota:
            Number(idMascota),

          idVeterinario:
            Number(idVeterinario),
        });

        setFechaHora("");
        setMotivo("");
        setIdMascota("");
        setIdVeterinario("");

        cargarCitas();

      } catch (error) {
        console.error(error);
      }
    };

  const borrarCita =
    async (id: number) => {

      if (
        !confirm(
          "¿Eliminar cita?"
        )
      )
        return;

      try {

        await eliminarCita(id);

        cargarCitas();

      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Gestión de Citas
      </h1>

      <div className="bg-white p-6 rounded-xl shadow mb-8">

        <div className="grid grid-cols-2 gap-4">

          <input
            type="datetime-local"
            value={fechaHora}
            onChange={(e) =>
              setFechaHora(
                e.target.value
              )
            }
            className="border p-3 rounded-lg"
          />

          <input
            placeholder="Motivo"
            value={motivo}
            onChange={(e) =>
              setMotivo(
                e.target.value
              )
            }
            className="border p-3 rounded-lg"
          />

          <input
            placeholder="ID Mascota"
            value={idMascota}
            onChange={(e) =>
              setIdMascota(
                e.target.value
              )
            }
            className="border p-3 rounded-lg"
          />

          <input
            placeholder="ID Veterinario"
            value={idVeterinario}
            onChange={(e) =>
              setIdVeterinario(
                e.target.value
              )
            }
            className="border p-3 rounded-lg"
          />

        </div>

        <button
          onClick={guardarCita}
          className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Registrar Cita
        </button>

      </div>

      <div className="bg-white p-6 rounded-xl shadow">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th>ID</th>

              <th>Fecha</th>

              <th>Motivo</th>

              <th>Mascota</th>

              <th>Veterinario</th>

              <th>Acciones</th>

            </tr>

          </thead>

          <tbody>

            {citas.map(
              (cita) => (

                <tr
                  key={
                    cita.idCita
                  }
                  className="border-b"
                >

                  <td>
                    {cita.idCita}
                  </td>

                  <td>
                    {cita.fechaHora}
                  </td>

                  <td>
                    {cita.motivo}
                  </td>

                  <td>
                    {
                      cita.idMascota
                    }
                  </td>

                  <td>
                    {
                      cita.idVeterinario
                    }
                  </td>

                  <td>

                    <button
                      onClick={() =>
                        borrarCita(
                          cita.idCita
                        )
                      }
                      className="text-red-600"
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