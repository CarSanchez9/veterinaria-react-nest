import { useEffect, useState } from "react";

import {
  obtenerUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
} from "../../../services/usuarios.service";

interface Usuario {
  idUsuario: number;
  username: string;
  email: string;
  password?: string;
  idRol: number;
}

export default function UsuarioView() {

  const [usuarios, setUsuarios] =
    useState<Usuario[]>([]);

  const [busqueda, setBusqueda] =
    useState("");

  const [editando, setEditando] =
    useState<number | null>(null);

  const [formData, setFormData] =
    useState({
      username: "",
      email: "",
      password: "",
      idRol: 1,
    });

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios =
    async () => {
      try {

        const data =
          await obtenerUsuarios();

        setUsuarios(data);

      } catch (error) {
        console.error(error);
      }
    };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement
    >
  ) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "idRol"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const guardarUsuario =
    async () => {

      try {

        if (
          !formData.username ||
          !formData.email
        ) {
          alert("Complete los campos");
          return;
        }

        if (editando) {

          await actualizarUsuario(
            editando,
            formData
          );

        } else {

          await crearUsuario(
            formData
          );
        }

        limpiarFormulario();

        cargarUsuarios();

      } catch (error) {
        console.error(error);
      }
    };

  const editarUsuario =
    (usuario: Usuario) => {

      setFormData({
        username:
          usuario.username,

        email:
          usuario.email,

        password: "",

        idRol:
          usuario.idRol,
      });

      setEditando(
        usuario.idUsuario
      );
    };

  const borrarUsuario =
    async (id: number) => {

      if (
        !confirm(
          "¿Eliminar usuario?"
        )
      )
        return;

      try {

        await eliminarUsuario(id);

        cargarUsuarios();

      } catch (error) {
        console.error(error);
      }
    };

  const limpiarFormulario =
    () => {

      setFormData({
        username: "",
        email: "",
        password: "",
        idRol: 1,
      });

      setEditando(null);
    };

  const usuariosFiltrados =
    usuarios.filter(
      (usuario) =>
        usuario.username
          .toLowerCase()
          .includes(
            busqueda.toLowerCase()
          ) ||
        usuario.email
          .toLowerCase()
          .includes(
            busqueda.toLowerCase()
          )
    );

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Gestión de Usuarios
      </h1>

      <div className="bg-white p-6 rounded-xl shadow mb-6">

        <input
          type="text"
          placeholder="Buscar usuario..."
          value={busqueda}
          onChange={(e) =>
            setBusqueda(
              e.target.value
            )
          }
          className="border p-3 rounded-lg w-full"
        />

      </div>

      <div className="bg-white p-6 rounded-xl shadow mb-6">

        <h2 className="text-xl font-semibold mb-4">

          {editando
            ? "Editar Usuario"
            : "Nuevo Usuario"}

        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={
              formData.username
            }
            onChange={
              handleChange
            }
            className="border p-3 rounded-lg"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={
              formData.email
            }
            onChange={
              handleChange
            }
            className="border p-3 rounded-lg"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={
              formData.password
            }
            onChange={
              handleChange
            }
            className="border p-3 rounded-lg"
          />

          <select
            name="idRol"
            value={
              formData.idRol
            }
            onChange={
              handleChange
            }
            className="border p-3 rounded-lg"
          >
            <option value={1}>
              Admin
            </option>

            <option value={2}>
              Veterinario
            </option>

            <option value={3}>
              Recepcionista
            </option>

          </select>

        </div>

        <div className="flex gap-3 mt-4">

          <button
            onClick={
              guardarUsuario
            }
            className="bg-primary text-white px-6 py-2 rounded"
          >
            {editando
              ? "Actualizar"
              : "Guardar"}
          </button>

          <button
            onClick={
              limpiarFormulario
            }
            className="bg-gray-500 text-white px-6 py-2 rounded"
          >
            Limpiar
          </button>

        </div>

      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-3">
                ID
              </th>

              <th className="p-3">
                Usuario
              </th>

              <th className="p-3">
                Email
              </th>

              <th className="p-3">
                Rol
              </th>

              <th className="p-3">
                Acciones
              </th>
            </tr>

          </thead>

          <tbody>

            {usuariosFiltrados.map(
              (usuario) => (

                <tr
                  key={
                    usuario.idUsuario
                  }
                  className="border-t"
                >

                  <td className="p-3">
                    {
                      usuario.idUsuario
                    }
                  </td>

                  <td className="p-3">
                    {
                      usuario.username
                    }
                  </td>

                  <td className="p-3">
                    {
                      usuario.email
                    }
                  </td>

                  <td className="p-3">
                    {
                      usuario.idRol
                    }
                  </td>

                  <td className="p-3">

                    <button
                      onClick={() =>
                        editarUsuario(
                          usuario
                        )
                      }
                      className="bg-yellow-400 px-3 py-1 rounded mr-2"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() =>
                        borrarUsuario(
                          usuario.idUsuario
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