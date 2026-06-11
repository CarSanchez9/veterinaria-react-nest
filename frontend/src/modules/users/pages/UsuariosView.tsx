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
  const [mostrarPassword, setMostrarPassword] =
    useState(false);
  const obtenerFortaleza = (
    password: string
  ) => {

    if (password.length < 6) {
      return {
        texto: "🔴 Débil",
        color: "text-red-500",
      };
    }

    const tieneMayuscula =
      /[A-Z]/.test(password);

    const tieneMinuscula =
      /[a-z]/.test(password);

    const tieneNumero =
      /[0-9]/.test(password);

    const tieneEspecial =
      /[^A-Za-z0-9]/.test(password);

    if (
      password.length >= 8 &&
      tieneMayuscula &&
      tieneMinuscula &&
      tieneNumero &&
      tieneEspecial
    ) {
      return {
        texto: "🟢 Fuerte",
        color: "text-green-600",
      };
    }

    return {
      texto: "🟡 Intermedia",
      color: "text-yellow-500",
    };
  };

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

  const guardarUsuario = async () => {

    try {

      if (!formData.username || !formData.email) {
        alert("Todos los campos son obligatorios");
        return;
      }

      if (!editando && !formData.password) {
        alert("La contraseña es obligatoria");
        return;
      }

      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(formData.email)) {
        alert("Debe ingresar un correo válido");
        return;
      }

      if (!editando) {

        const fortaleza =
          obtenerFortaleza(formData.password);

        if (fortaleza.texto !== "🟢 Fuerte") {

          alert(
            "La contraseña debe ser fuerte. Ejemplo: Carlos123@"
          );

          return;
        }
      }

      if (editando) {

        const datosActualizar: any = {
          username: formData.username,
          email: formData.email,
          idRol: formData.idRol,
        };

        if (formData.password.trim() !== "") {
          datosActualizar.password =
            formData.password;
        }

        await actualizarUsuario(
          editando,
          datosActualizar
        );

      } else {

        await crearUsuario(formData);

      }

      limpiarFormulario();

      await cargarUsuarios();

      alert(
        editando
          ? "Usuario actualizado correctamente"
          : "Usuario registrado correctamente"
      );

    } catch (error: any) {

      console.error(error);

      if (error.response?.data?.message) {

        const mensajes =
          Array.isArray(
            error.response.data.message
          )
            ? error.response.data.message.join("\n")
            : error.response.data.message;

        alert(mensajes);

      } else {

        alert("Error al guardar usuario");

      }

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
          <div className="relative">

            <input
              type={
                mostrarPassword
                  ? "text"
                  : "password"
              }
              name="password"
              placeholder="Password"
              value={
                formData.password
              }
              onChange={
                handleChange
              }
              className="border p-3 rounded-lg w-full pr-12"
            />

            <button
              type="button"
              onClick={() =>
                setMostrarPassword(
                  !mostrarPassword
                )
              }
              className="absolute right-3 top-3"
            >
              {mostrarPassword
                ? "🙈"
                : "👁️"}
            </button>

          </div>
          {formData.password && (
            <p
              className={`mt-2 font-semibold ${obtenerFortaleza(formData.password).color
                }`}
            >
              Fortaleza:{" "}
              {obtenerFortaleza(formData.password).texto}
            </p>
          )}

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
              Recepcionista
            </option>

            <option value={3}>
              Veterinario
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