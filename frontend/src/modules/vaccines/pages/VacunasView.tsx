import {
  useEffect,
  useState,
} from "react";

import {
  obtenerVentas,
  crearVenta,
  actualizarVenta,
  eliminarVenta,
} from "../../../services/venta.service";

interface Venta {
  idVenta: number;
  fechaVenta: string;
  cantidad: number;
  total: number;
  idCliente: number;
  idProducto: number;
}

export default function VentasView() {

  const [ventas, setVentas] =
    useState<Venta[]>([]);

  const [editando, setEditando] =
    useState<number | null>(null);

  const [formData, setFormData] =
    useState({
      fechaVenta: "",
      cantidad: 1,
      total: 0,
      idCliente: 0,
      idProducto: 0,
    });

  useEffect(() => {
    cargarVentas();
  }, []);

  const cargarVentas =
    async () => {
      try {

        const data =
          await obtenerVentas();

        setVentas(data);

      } catch (error) {
        console.error(error);
      }
    };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "number"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const guardarVenta =
    async () => {

      try {

        if (editando) {

          await actualizarVenta(
            editando,
            formData
          );

        } else {

          await crearVenta(
            formData
          );

        }

        limpiarFormulario();
        cargarVentas();

      } catch (error) {
        console.error(error);
      }
    };

  const editarVenta =
    (venta: Venta) => {

      setEditando(
        venta.idVenta
      );

      setFormData({
        fechaVenta:
          venta.fechaVenta
            ?.split("T")[0] || "",

        cantidad:
          venta.cantidad,

        total:
          Number(
            venta.total
          ),

        idCliente:
          venta.idCliente,

        idProducto:
          venta.idProducto,
      });
    };

  const eliminarRegistro =
    async (
      id: number
    ) => {

      if (
        !confirm(
          "¿Eliminar venta?"
        )
      )
        return;

      await eliminarVenta(id);

      cargarVentas();
    };

  const limpiarFormulario =
    () => {

      setEditando(null);

      setFormData({
        fechaVenta: "",
        cantidad: 1,
        total: 0,
        idCliente: 0,
        idProducto: 0,
      });
    };

  return (
    <div>

      <h1 className="text-3xl font-bold text-primary mb-6">
        Gestión de Ventas
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-md mb-6">

        <h2 className="text-xl font-semibold mb-4">

          {editando
            ? "Editar Venta"
            : "Registrar Venta"}

        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="date"
            name="fechaVenta"
            value={
              formData.fechaVenta
            }
            onChange={
              handleChange
            }
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            name="cantidad"
            placeholder="Cantidad"
            value={
              formData.cantidad
            }
            onChange={
              handleChange
            }
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            name="total"
            placeholder="Total"
            value={
              formData.total
            }
            onChange={
              handleChange
            }
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            name="idCliente"
            placeholder="ID Cliente"
            value={
              formData.idCliente
            }
            onChange={
              handleChange
            }
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            name="idProducto"
            placeholder="ID Producto"
            value={
              formData.idProducto
            }
            onChange={
              handleChange
            }
            className="border p-3 rounded-lg"
          />

        </div>

        <div className="flex gap-3 mt-5">

          <button
            onClick={
              guardarVenta
            }
            className="bg-primary text-white px-6 py-3 rounded-lg"
          >
            {editando
              ? "Actualizar"
              : "Registrar"}
          </button>

          <button
            onClick={
              limpiarFormulario
            }
            className="bg-gray-500 text-white px-6 py-3 rounded-lg"
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
                Fecha
              </th>

              <th className="p-3">
                Cantidad
              </th>

              <th className="p-3">
                Total
              </th>

              <th className="p-3">
                Cliente
              </th>

              <th className="p-3">
                Producto
              </th>

              <th className="p-3">
                Acciones
              </th>
            </tr>

          </thead>

          <tbody>

            {ventas.map(
              (venta) => (

                <tr
                  key={
                    venta.idVenta
                  }
                  className="border-t"
                >

                  <td className="p-3">
                    {
                      venta.fechaVenta
                    }
                  </td>

                  <td className="p-3">
                    {
                      venta.cantidad
                    }
                  </td>

                  <td className="p-3">
                    Bs. {
                      venta.total
                    }
                  </td>

                  <td className="p-3">
                    {
                      venta.idCliente
                    }
                  </td>

                  <td className="p-3">
                    {
                      venta.idProducto
                    }
                  </td>

                  <td className="p-3 space-x-2">

                    <button
                      onClick={() =>
                        editarVenta(
                          venta
                        )
                      }
                      className="bg-secondary px-3 py-1 rounded"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() =>
                        eliminarRegistro(
                          venta.idVenta
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