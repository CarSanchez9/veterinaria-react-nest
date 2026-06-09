import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function DashboardLayout() {

  const navigate = useNavigate();

  const [usuario, setUsuario] =
    useState("");

  const [rol, setRol] =
    useState("");

  useEffect(() => {

    setUsuario(
      localStorage.getItem("usuario") || ""
    );

    setRol(
      localStorage.getItem("rol") || ""
    );

  }, []);

  const cerrarSesion = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("usuario");

    localStorage.removeItem("rol");

    navigate("/login");
  };

  return (

    <div className="min-h-screen flex bg-gray-100">

      {/* SIDEBAR */}
      <aside className="bg-white w-72 shadow-md border-r flex flex-col">

        <div className="p-6 border-b">

          <h1 className="text-2xl font-bold text-primary">
            VetCare
          </h1>

          <p className="text-sm text-gray-500">
            Panel administrativo
          </p>

        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">

          <Link
            to="/dashboard"
            className="block px-4 py-3 rounded-lg bg-primary text-white font-medium"
          >
            🏠 Panel General
          </Link>

          {rol === "ADMIN" && (

            <Link
              to="/dashboard/users"
              className="block px-4 py-3 rounded-lg hover:bg-gray-100"
            >
              👤 Gestionar Usuarios
            </Link>

          )}

          {(rol === "ADMIN" ||
            rol === "RECEPCIONISTA") && (

              <Link
                to="/dashboard/clientes"
                className="block px-4 py-3 rounded-lg hover:bg-gray-100"
              >
                👥 Registrar Cliente
              </Link>

            )}

          {(rol === "ADMIN" ||
            rol === "RECEPCIONISTA" ||
            rol === "VETERINARIO") && (

              <Link
                to="/dashboard/mascotas"
                className="block px-4 py-3 rounded-lg hover:bg-gray-100"
              >
                🐾 Registrar Mascota
              </Link>

            )}

          {(rol === "ADMIN" ||
            rol === "RECEPCIONISTA" ||
            rol === "VETERINARIO") && (

              <Link
                to="/dashboard/citas"
                className="block px-4 py-3 rounded-lg hover:bg-gray-100"
              >
                📅 Citas
              </Link>

            )}

          {(rol === "ADMIN" ||
            rol === "VETERINARIO") && (

              <Link
                to="/dashboard/consultas"
                className="block px-4 py-3 rounded-lg hover:bg-gray-100"
              >
                🩺 Consulta Médica
              </Link>

            )}

          {(rol === "ADMIN" ||
            rol === "VETERINARIO") && (

              <Link
                to="/dashboard/tratamientos"
                className="block px-4 py-3 rounded-lg hover:bg-gray-100"
              >
                💊 Tratamientos
              </Link>

            )}

          {(rol === "ADMIN" ||
            rol === "VETERINARIO") && (

              <Link
                to="/dashboard/vacunas"
                className="block px-4 py-3 rounded-lg hover:bg-gray-100"
              >
                💉 Vacunas
              </Link>

            )}

          {(rol === "ADMIN" ||
            rol === "VETERINARIO") && (

              <Link
                to="/dashboard/historial"
                className="block px-4 py-3 rounded-lg hover:bg-gray-100"
              >
                📄 Historial Clínico
              </Link>

            )}

          {(rol === "ADMIN" ||
            rol === "VETERINARIO") && (

              <Link
                to="/dashboard/inventario"
                className="block px-4 py-3 rounded-lg hover:bg-gray-100"
              >
                📦 Inventario
              </Link>

            )}

          {(rol === "ADMIN" ||
            rol === "RECEPCIONISTA") && (

              <Link
                to="/dashboard/ventas"
                className="block px-4 py-3 rounded-lg hover:bg-gray-100"
              >
                💰 Ventas
              </Link>

            )}

        </nav>

        <div className="border-t p-4">

          <button
            onClick={cerrarSesion}
            className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600"
          >
            🚪 Cerrar sesión
          </button>

        </div>

      </aside>

      {/* CONTENIDO */}

      <div className="flex-1 flex flex-col">

        <header className="bg-white shadow-sm px-8 py-4 flex justify-end items-center">

          <div className="flex items-center gap-4">

            <div className="text-right">

              <p className="font-semibold text-gray-800">
                {usuario}
              </p>

              <p className="text-sm text-gray-500">
                {rol}
              </p>

            </div>

            <img
              src="https://i.pravatar.cc/100"
              alt="usuario"
              className="w-10 h-10 rounded-full"
            />

          </div>

        </header>

        <main className="p-8 flex-1">

          <Outlet />

        </main>

      </div>

    </div>

  );
}