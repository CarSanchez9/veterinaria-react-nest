import { useEffect, useState } from "react";

import {
  obtenerClientes,
  crearCliente,
  actualizarCliente,
  eliminarCliente as eliminarClienteApi,
} from "../../../services/cliente.service";
import jsPDF from "jspdf";

import autoTable from "jspdf-autotable";

interface Cliente {
  idCliente?: number;
  nombre: string;
  apellido: string;
  ci: string;
  telefono: string;
  direccion: string;
}

export default function ClientesView() {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [ci, setCi] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");

  const [busquedaCi, setBusquedaCi] = useState("");

  const [editandoId, setEditandoId] =
    useState<number | null>(null);

  useEffect(() => {
    cargarClientes();
  }, []);

  const cargarClientes = async () => {
    try {
      const data =
        await obtenerClientes();

      setClientes(data);
    } catch (error) {
      console.error(error);
    }
  };

  const limpiarFormulario = () => {
    setNombre("");
    setApellido("");
    setCi("");
    setTelefono("");
    setDireccion("");
    setEditandoId(null);
  };

  const guardarCliente = async () => {
    try {
      if (
        !nombre ||
        !apellido ||
        !ci
      ) {
        return;
      }

      if (editandoId) {
        await actualizarCliente(
          editandoId,
          {
            nombre,
            apellido,
            ci,
            telefono,
            direccion,
          }
        );
      } else {
        await crearCliente({
          nombre,
          apellido,
          ci,
          telefono,
          direccion,
        });
      }

      await cargarClientes();

      limpiarFormulario();
    } catch (error) {
      console.error(error);
    }
  };

  const editarCliente = (
    cliente: Cliente
  ) => {
    setNombre(cliente.nombre);
    setApellido(cliente.apellido);
    setCi(cliente.ci);
    setTelefono(cliente.telefono);
    setDireccion(cliente.direccion);

    setEditandoId(
      cliente.idCliente!
    );
  };
  const generarReporteClientes = () => {

    const doc = new jsPDF();

    doc.text(
      "Reporte de Clientes",
      14,
      15
    );

    autoTable(doc, {
      head: [["ID", "Nombre", "CI"]],
      body: clientes.map((c) => [
        c.idCliente,
        c.nombre,
        c.ci,
      ]),
    });

    doc.save("clientes.pdf");
  };

  const eliminarCliente = async (
    id: number
  ) => {
    try {
      await eliminarClienteApi(id);

      await cargarClientes();
    } catch (error) {
      console.error(error);
    }
  };

  const clientesFiltrados =
    clientes.filter((c) =>
      c.ci.includes(busquedaCi)
    );

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-8">
        Registrar Cliente
      </h1>

      <input
        placeholder="Buscar por CI..."
        value={busquedaCi}
        onChange={(e) =>
          setBusquedaCi(
            e.target.value
          )
        }
        className="border p-3 rounded-lg mb-6 w-full"
      />

      <div className="bg-white shadow rounded-xl p-6 mb-8">
        <div className="grid grid-cols-2 gap-4">

          <input
            placeholder="Nombre"
            value={nombre}
            onChange={(e) =>
              setNombre(
                e.target.value
              )
            }
            className="border p-3 rounded-lg"
          />

          <input
            placeholder="Apellido"
            value={apellido}
            onChange={(e) =>
              setApellido(
                e.target.value
              )
            }
            className="border p-3 rounded-lg"
          />

          <input
            placeholder="CI"
            value={ci}
            onChange={(e) =>
              setCi(
                e.target.value
              )
            }
            className="border p-3 rounded-lg"
          />

          <input
            placeholder="Teléfono"
            value={telefono}
            onChange={(e) =>
              setTelefono(
                e.target.value
              )
            }
            className="border p-3 rounded-lg"
          />

          <input
            placeholder="Dirección"
            value={direccion}
            onChange={(e) =>
              setDireccion(
                e.target.value
              )
            }
            className="border p-3 rounded-lg col-span-2"
          />

        </div>

        <button
          onClick={guardarCliente}
          className="mt-4 bg-primary text-white px-6 py-3 rounded-lg"
        >
          {editandoId
            ? "Actualizar Cliente"
            : "Guardar Cliente"}
        </button>
      </div>
      <div>
        <button
          onClick={generarReporteClientes}
          className="bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Descargar Reporte PDF
        </button>
      </div>
      <div className="bg-white shadow rounded-xl p-6">
        <table className="w-full">

          <thead>
            <tr className="border-b text-left">
              <th>CI</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Teléfono</th>
              <th>Dirección</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {clientesFiltrados.map(
              (cliente) => (
                <tr
                  key={
                    cliente.idCliente
                  }
                  className="border-b"
                >
                  <td>
                    {cliente.ci}
                  </td>

                  <td>
                    {cliente.nombre}
                  </td>

                  <td>
                    {cliente.apellido}
                  </td>

                  <td>
                    {cliente.telefono}
                  </td>

                  <td>
                    {cliente.direccion}
                  </td>

                  <td className="space-x-3">
                    <button
                      onClick={() =>
                        editarCliente(
                          cliente
                        )
                      }
                      className="text-blue-600"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() =>
                        eliminarCliente(
                          cliente.idCliente!
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