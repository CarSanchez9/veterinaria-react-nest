import { useState } from "react";

interface Consulta {
  id: number;
  ciPropietario: string;
  nombreMascota: string;
  fecha: string;
  temperatura: string;
  frecuenciaCardiaca: string;
  frecuenciaRespiratoria: string;
  pulso: string;
  tipoAlimentacion: string;
  evacuacion: string;
  sintoma: string;
  diagnostico: string;
  tratamiento: string;
  costoConsulta: string;
}

export default function ConsultasView() {
  const [consultas, setConsultas] = useState<Consulta[]>([]);

  const [buscarCI, setBuscarCI] = useState("");

  const [formData, setFormData] = useState({
    ciPropietario: "",
    nombreMascota: "",
    fecha: "",
    temperatura: "",
    frecuenciaCardiaca: "",
    frecuenciaRespiratoria: "",
    pulso: "",
    tipoAlimentacion: "",
    evacuacion: "",
    sintoma: "",
    diagnostico: "",
    tratamiento: "",
    costoConsulta: "",
  });

  const [editando, setEditando] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement |
      HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const guardarConsulta = () => {
    if (
      !formData.ciPropietario ||
      !formData.nombreMascota ||
      !formData.fecha
    ) {
      alert("Complete los campos obligatorios");
      return;
    }

    if (editando !== null) {
      setConsultas(
        consultas.map((c) =>
          c.id === editando
            ? { ...c, ...formData }
            : c
        )
      );

      setEditando(null);
    } else {
      const nuevaConsulta: Consulta = {
        id: Date.now(),
        ...formData,
      };

      setConsultas([...consultas, nuevaConsulta]);
    }

    limpiarFormulario();
  };

  const editarConsulta = (consulta: Consulta) => {
    setFormData({
      ciPropietario: consulta.ciPropietario,
      nombreMascota: consulta.nombreMascota,
      fecha: consulta.fecha,
      temperatura: consulta.temperatura,
      frecuenciaCardiaca: consulta.frecuenciaCardiaca,
      frecuenciaRespiratoria: consulta.frecuenciaRespiratoria,
      pulso: consulta.pulso,
      tipoAlimentacion: consulta.tipoAlimentacion,
      evacuacion: consulta.evacuacion,
      sintoma: consulta.sintoma,
      diagnostico: consulta.diagnostico,
      tratamiento: consulta.tratamiento,
      costoConsulta: consulta.costoConsulta,
    });

    setEditando(consulta.id);
  };

  const eliminarConsulta = (id: number) => {
    if (confirm("¿Eliminar consulta?")) {
      setConsultas(
        consultas.filter((c) => c.id !== id)
      );
    }
  };

  const limpiarFormulario = () => {
    setFormData({
      ciPropietario: "",
      nombreMascota: "",
      fecha: "",
      temperatura: "",
      frecuenciaCardiaca: "",
      frecuenciaRespiratoria: "",
      pulso: "",
      tipoAlimentacion: "",
      evacuacion: "",
      sintoma: "",
      diagnostico: "",
      tratamiento: "",
      costoConsulta: "",
    });
  };

  const consultasFiltradas = consultas.filter(
    (consulta) =>
      consulta.ciPropietario.includes(buscarCI)
  );

  return (
    <div>

      <h1 className="text-3xl font-bold text-primary mb-6">
        Consulta Médica
      </h1>

      {/* BUSCADOR */}
      <div className="bg-white p-4 rounded-xl shadow-md mb-6">

        <h2 className="font-semibold mb-3">
          Buscar Paciente
        </h2>

        <input
          type="text"
          placeholder="Buscar por CI del propietario"
          value={buscarCI}
          onChange={(e) =>
            setBuscarCI(e.target.value)
          }
          className="border p-3 rounded-lg w-full md:w-96"
        />
      </div>

      {/* FORMULARIO */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">

        <h2 className="text-xl font-semibold mb-4">
          {editando
            ? "Editar Consulta"
            : "Nueva Consulta"}
        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          <input
            type="text"
            name="ciPropietario"
            placeholder="CI Propietario"
            value={formData.ciPropietario}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="nombreMascota"
            placeholder="Nombre Mascota"
            value={formData.nombreMascota}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            name="temperatura"
            placeholder="Temperatura °C"
            value={formData.temperatura}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            name="frecuenciaCardiaca"
            placeholder="F/C"
            value={formData.frecuenciaCardiaca}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            name="frecuenciaRespiratoria"
            placeholder="F/R"
            value={formData.frecuenciaRespiratoria}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            name="pulso"
            placeholder="Pulso"
            value={formData.pulso}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="tipoAlimentacion"
            placeholder="Tipo Alimentación"
            value={formData.tipoAlimentacion}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="evacuacion"
            placeholder="Evacuación"
            value={formData.evacuacion}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

        </div>

        <textarea
          name="sintoma"
          placeholder="Síntomas"
          value={formData.sintoma}
          onChange={handleChange}
          className="border p-3 rounded-lg w-full mt-4"
          rows={3}
        />

        <textarea
          name="diagnostico"
          placeholder="Diagnóstico Presuntivo"
          value={formData.diagnostico}
          onChange={handleChange}
          className="border p-3 rounded-lg w-full mt-4"
          rows={3}
        />

        <textarea
          name="tratamiento"
          placeholder="Tratamiento"
          value={formData.tratamiento}
          onChange={handleChange}
          className="border p-3 rounded-lg w-full mt-4"
          rows={3}
        />

        <input
          type="number"
          name="costoConsulta"
          placeholder="Costo Consulta (Bs.)"
          value={formData.costoConsulta}
          onChange={handleChange}
          className="border p-3 rounded-lg w-full mt-4"
        />

        <div className="flex gap-3 mt-5">

          <button
            onClick={guardarConsulta}
            className="bg-primary text-white px-6 py-3 rounded-lg"
          >
            {editando
              ? "Actualizar"
              : "Registrar"}
          </button>

          <button
            onClick={limpiarFormulario}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg"
          >
            Limpiar
          </button>

        </div>
      </div>

      {/* TABLA */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-3">CI</th>
              <th className="p-3">Mascota</th>
              <th className="p-3">Fecha</th>
              <th className="p-3">Diagnóstico</th>
              <th className="p-3">Costo</th>
              <th className="p-3">Acciones</th>
            </tr>

          </thead>

          <tbody>

            {consultasFiltradas.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center p-5"
                >
                  No existen consultas
                </td>
              </tr>
            ) : (
              consultasFiltradas.map((consulta) => (
                <tr
                  key={consulta.id}
                  className="border-t"
                >
                  <td className="p-3">
                    {consulta.ciPropietario}
                  </td>

                  <td className="p-3">
                    {consulta.nombreMascota}
                  </td>

                  <td className="p-3">
                    {consulta.fecha}
                  </td>

                  <td className="p-3">
                    {consulta.diagnostico}
                  </td>

                  <td className="p-3">
                    Bs. {consulta.costoConsulta}
                  </td>

                  <td className="p-3 text-center space-x-2">

                    <button
                      onClick={() =>
                        editarConsulta(consulta)
                      }
                      className="bg-secondary px-3 py-1 rounded"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() =>
                        eliminarConsulta(
                          consulta.id
                        )
                      }
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Eliminar
                    </button>

                  </td>
                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}