import { Link } from "react-router-dom";

export default function UsuariosView() {

  return (
    <div>

      <h1 className="text-3xl font-bold text-primary mb-6">
        Gestión de Usuarios
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

      {/* AQUÍ TU CRUD DE USUARIOS */}

    </div>
  );
}