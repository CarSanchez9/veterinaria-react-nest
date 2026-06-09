import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { obtenerClientes } from "../../../services/cliente.service";
import { obtenerMascotas } from "../../../services/mascota.service";
import { obtenerCitas } from "../../../services/cita.service";
import { obtenerVentas } from "../../../services/venta.service";
import { obtenerProductos } from "../../../services/producto.service";

export default function DashboardHome() {

  const [estadisticas, setEstadisticas] = useState([
    {
      modulo: "Clientes",
      cantidad: 0,
    },
    {
      modulo: "Mascotas",
      cantidad: 0,
    },
    {
      modulo: "Citas",
      cantidad: 0,
    },
    {
      modulo: "Ventas",
      cantidad: 0,
    },
    {
      modulo: "Productos",
      cantidad: 0,
    },
  ]);

  useEffect(() => {

    cargarDatos();

  }, []);

  const cargarDatos = async () => {

    try {

      const clientes =
        await obtenerClientes();

      const mascotas =
        await obtenerMascotas();

      const citas =
        await obtenerCitas();

      const ventas =
        await obtenerVentas();

      const productos =
        await obtenerProductos();

      setEstadisticas([
        {
          modulo: "Clientes",
          cantidad: clientes.length,
        },
        {
          modulo: "Mascotas",
          cantidad: mascotas.length,
        },
        {
          modulo: "Citas",
          cantidad: citas.length,
        },
        {
          modulo: "Ventas",
          cantidad: ventas.length,
        },
        {
          modulo: "Productos",
          cantidad: productos.length,
        },
      ]);

    } catch (error) {

      console.error(
        "Error cargando estadísticas:",
        error
      );

    }
  };

  return (
    <div>

      <h1 className="text-3xl font-bold text-primary mb-6">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-5 gap-4 mb-8">

        {estadisticas.map((item) => (

          <div
            key={item.modulo}
            className="bg-white rounded-xl shadow p-5"
          >

            <h3 className="text-gray-500">
              {item.modulo}
            </h3>

            <p className="text-3xl font-bold">
              {item.cantidad}
            </p>

          </div>

        ))}

      </div>

      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-2xl font-bold mb-4">
          Estadísticas Generales
        </h2>

        <ResponsiveContainer
          width="100%"
          height={400}
        >

          <BarChart
            data={estadisticas}
          >

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="modulo"
            />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="cantidad"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}