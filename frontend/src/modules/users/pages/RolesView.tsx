import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  obtenerRoles,
  crearRol,
  actualizarRol,
  eliminarRol,
} from "../../../services/roles.service";

interface Rol {
  idRol: number;
  nombre: string;
}

export default function RolesView() {

  const [roles, setRoles] =
    useState<Rol[]>([]);

  const [nombre, setNombre] =
    useState("");

  const [editando, setEditando] =
    useState<number | null>(null);

  useEffect(() => {
    cargarRoles();
  }, []);

  const cargarRoles =
    async () => {

      try {

        const data =
          await obtenerRoles();

        setRoles(data);

      } catch (error) {
        console.error(error);
      }
    };

  const guardarRol =
    async () => {

      if (!nombre.trim()) {
        alert("Ingrese un rol");
        return;
      }

      try {

        if (editando) {

          await actualizarRol(
            editando,
            {
              nombre,
            }
          );

        } else {

          await crearRol({
            nombre,
          });
        }

        limpiarFormulario();

        cargarRoles();

      } catch (error) {
        console.error(error);
      }
    };

  const editarRol =
    (rol: Rol) => {

      setNombre(
        rol.nombre
      );

      setEditando(
        rol.idRol
      );
    };

  const borrarRol =
    async (id: number) => {

      if (
        !confirm(
          "¿Eliminar rol?"
        )
      ) {
        return;
      }

      try {

        await eliminarRol(id);

        cargarRoles();

      } catch (error) {
        console.error(error);
      }
    };

  const limpiarFormulario =
    () => {

      setNombre("");

      setEditando(null);
    };

  return (
    <div>

      <h1 className="text-3xl font-bold text-primary mb-6">
        Gestión de Roles
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

      <div className="bg-white p-6 rounded-xl shadow-md mb-6">

        <h2 className="text-xl font-semibold mb-4">

          {editando
            ? "Editar Rol"
            : "Nuevo Rol"}

        </h2>

        <div className="flex gap-4">

          <input
            type="text"
            placeholder="Nombre del Rol"
            value={nombre}
            onChange={(e) =>
              setNombre(
                e.target.value
              )
            }
            className="border p-3 rounded-lg flex-1"
          />

          <button
            onClick={
              guardarRol
            }
            className="bg-primary text-white px-6 rounded-lg"
          >
            {editando
              ? "Actualizar"
              : "Guardar"}
          </button>

          <button
            onClick={
              limpiarFormulario
            }
            className="bg-gray-500 text-white px-6 rounded-lg"
          >
            Limpiar
          </button>

        </div>

      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-3">
                ID
              </th>

              <th className="p-3">
                Nombre
              </th>

              <th className="p-3">
                Acciones
              </th>

            </tr>

          </thead>

          <tbody>

            {roles.map(
              (rol) => (

                <tr
                  key={rol.idRol}
                  className="border-t"
                >

                  <td className="p-3">
                    {rol.idRol}
                  </td>

                  <td className="p-3">
                    {rol.nombre}
                  </td>

                  <td className="p-3">

                    <button
                      onClick={() =>
                        editarRol(
                          rol
                        )
                      }
                      className="bg-yellow-400 px-3 py-1 rounded mr-2"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() =>
                        borrarRol(
                          rol.idRol
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