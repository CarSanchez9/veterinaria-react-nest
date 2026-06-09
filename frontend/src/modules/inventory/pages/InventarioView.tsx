import { useEffect, useState } from "react";

import {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from "../../../services/producto.service";

interface Producto {
  idProducto: number;
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
}

export default function InventarioView() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [busqueda, setBusqueda] = useState("");

  const [formData, setFormData] = useState({
    nombre: "",
    categoria: "",
    precio: 0,
    stock: 0,
  });

  const [editando, setEditando] =
    useState<number | null>(null);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const data =
        await obtenerProductos();

      setProductos(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "number"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const guardarProducto = async () => {
    try {
      if (
        !formData.nombre ||
        !formData.categoria
      ) {
        alert(
          "Complete los campos obligatorios"
        );
        return;
      }

      if (editando) {
        await actualizarProducto(
          editando,
          formData
        );
      } else {
        await crearProducto(formData);
      }

      await cargarProductos();

      limpiarFormulario();
    } catch (error) {
      console.error(error);
    }
  };

  const editarProducto = (
    producto: Producto
  ) => {
    setFormData({
      nombre: producto.nombre,
      categoria: producto.categoria,
      precio: Number(producto.precio),
      stock: producto.stock,
    });

    setEditando(
      producto.idProducto
    );
  };

  const eliminarProductoHandler =
    async (id: number) => {
      if (
        !confirm(
          "¿Eliminar producto?"
        )
      )
        return;

      try {
        await eliminarProducto(id);

        await cargarProductos();
      } catch (error) {
        console.error(error);
      }
    };

  const limpiarFormulario = () => {
    setFormData({
      nombre: "",
      categoria: "",
      precio: 0,
      stock: 0,
    });

    setEditando(null);
  };

  const productosFiltrados =
    productos.filter((producto) =>
      producto.nombre
        .toLowerCase()
        .includes(
          busqueda.toLowerCase()
        )
    );

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-6">
        Inventario
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) =>
            setBusqueda(
              e.target.value
            )
          }
          className="w-full border p-3 rounded-lg"
        />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {editando
            ? "Editar Producto"
            : "Registrar Producto"}
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <select
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >
            <option value="">
              Seleccionar categoría
            </option>

            <option>
              Medicamento
            </option>

            <option>
              Vacuna
            </option>

            <option>
              Alimento
            </option>

            <option>
              Accesorio
            </option>
          </select>

          <input
            type="number"
            name="precio"
            placeholder="Precio"
            value={formData.precio}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />
        </div>

        <div className="flex gap-3 mt-5">
          <button
            onClick={
              guardarProducto
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
                Nombre
              </th>

              <th className="p-3">
                Categoría
              </th>

              <th className="p-3">
                Precio
              </th>

              <th className="p-3">
                Stock
              </th>

              <th className="p-3">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody>
            {productosFiltrados.length ===
            0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center p-5"
                >
                  No existen
                  productos
                </td>
              </tr>
            ) : (
              productosFiltrados.map(
                (
                  producto
                ) => (
                  <tr
                    key={
                      producto.idProducto
                    }
                    className="border-t"
                  >
                    <td className="p-3">
                      {
                        producto.nombre
                      }
                    </td>

                    <td className="p-3">
                      {
                        producto.categoria
                      }
                    </td>

                    <td className="p-3">
                      Bs.{" "}
                      {
                        producto.precio
                      }
                    </td>

                    <td className="p-3">
                      {
                        producto.stock
                      }
                    </td>

                    <td className="p-3 text-center space-x-2">
                      <button
                        onClick={() =>
                          editarProducto(
                            producto
                          )
                        }
                        className="bg-secondary px-3 py-1 rounded"
                      >
                        Editar
                      </button>

                      <button
                        onClick={() =>
                          eliminarProductoHandler(
                            producto.idProducto
                          )
                        }
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}