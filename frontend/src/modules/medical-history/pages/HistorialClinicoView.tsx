import { useEffect, useState } from "react";
import axios from "axios";

interface HistoriaClinica {
  idHistoria: number;
  diagnostico: string;
  tratamiento: string;
  observaciones: string;
  mascota: {
    idMascota: number;
    nombre: string;
    especie: string;
    raza: string;
  };
}

export default function HistorialClinicoView() {
  const [historias, setHistorias] = useState<HistoriaClinica[]>([]);
  const [buscarMascota, setBuscarMascota] = useState("");

  const cargarHistorias = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:3000/historia-clinica",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setHistorias(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cargarHistorias();
  }, []);

  const historiasFiltradas = historias.filter((h) =>
    h.mascota?.nombre
      .toLowerCase()
      .includes(buscarMascota.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-6">
        Historial Clínico
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <input
          type="text"
          placeholder="Buscar mascota..."
          value={buscarMascota}
          onChange={(e) =>
            setBuscarMascota(e.target.value)
          }
          className="border p-3 rounded-lg w-full"
        />
      </div>

      <div className="space-y-6">
        {historiasFiltradas.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow">
            No existen historias clínicas.
          </div>
        ) : (
          historiasFiltradas.map((historia) => (
            <div
              key={historia.idHistoria}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h2 className="text-2xl font-bold text-primary mb-4">
                {historia.mascota?.nombre}
              </h2>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <p>
                    <strong>Especie:</strong>{" "}
                    {historia.mascota?.especie}
                  </p>

                  <p>
                    <strong>Raza:</strong>{" "}
                    {historia.mascota?.raza}
                  </p>
                </div>
              </div>

              <div className="border rounded-lg p-4 mb-4">
                <h3 className="font-bold text-lg mb-2">
                  Diagnóstico
                </h3>

                <p>
                  {historia.diagnostico}
                </p>
              </div>

              <div className="border rounded-lg p-4 mb-4">
                <h3 className="font-bold text-lg mb-2">
                  Tratamiento
                </h3>

                <p>
                  {historia.tratamiento}
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-bold text-lg mb-2">
                  Observaciones
                </h3>

                <p>
                  {historia.observaciones}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}