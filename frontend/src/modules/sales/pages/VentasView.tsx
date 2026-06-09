import { useState } from "react";

interface DetalleVenta {
  producto: string;
  cantidad: number;
  precio: number;
  subtotal: number;
}

interface Venta {
  id: number;
  ciCliente: string;
  cliente: string;
  fecha: string;
  metodoPago: string;
  total: number;
  detalles: DetalleVenta[];
}

export default function VentasView() {

  const [ventas, setVentas] = useState<Venta[]>([]);

  const [detalle, setDetalle] = useState<DetalleVenta[]>([]);

  const [producto, setProducto] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [precio, setPrecio] = useState(0);

  const [formData, setFormData] = useState({
    ciCliente: "",
    cliente: "",
    metodoPago: "Efectivo",
  });

  const agregarProducto = () => {

    if (!producto || precio <= 0) {
      alert("Seleccione producto");
      return;
    }

    const nuevoDetalle: DetalleVenta = {
      producto,
      cantidad,
      precio,
      subtotal: cantidad * precio,
    };

    setDetalle([...detalle, nuevoDetalle]);

    setProducto("");
    setCantidad(1);
    setPrecio(0);
  };

  const eliminarDetalle = (index: number) => {

    setDetalle(
      detalle.filter((_, i) => i !== index)
    );
  };

  const total = detalle.reduce(
    (acc, item) => acc + item.subtotal,
    0
  );

  const registrarVenta = () => {

    if (!formData.ciCliente) {
      alert("Ingrese CI");
      return;
    }

    const nuevaVenta: Venta = {
      id: Date.now(),
      fecha: new Date().toLocaleDateString(),
      total,
      detalles: detalle,
      ...formData,
    };

    setVentas([...ventas, nuevaVenta]);

    setDetalle([]);

    setFormData({
      ciCliente: "",
      cliente: "",
      metodoPago: "Efectivo",
    });
  };

  return (
    <div>

      <h1 className="text-3xl font-bold text-primary mb-6">
        Ventas
      </h1>

      {/* DATOS CLIENTE */}

      <div className="bg-white p-6 rounded-xl shadow-md mb-6">

        <h2 className="text-xl font-semibold mb-4">
          Datos del Cliente
        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          <input
            type="text"
            placeholder="CI Cliente"
            value={formData.ciCliente}
            onChange={(e) =>
              setFormData({
                ...formData,
                ciCliente: e.target.value,
              })
            }
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Nombre Cliente"
            value={formData.cliente}
            onChange={(e) =>
              setFormData({
                ...formData,
                cliente: e.target.value,
              })
            }
            className="border p-3 rounded-lg"
          />

          <select
            value={formData.metodoPago}
            onChange={(e) =>
              setFormData({
                ...formData,
                metodoPago: e.target.value,
              })
            }
            className="border p-3 rounded-lg"
          >
            <option>Efectivo</option>
            <option>QR</option>
            <option>Tarjeta</option>
            <option>Transferencia</option>
          </select>

        </div>

      </div>

      {/* PRODUCTOS */}

      <div className="bg-white p-6 rounded-xl shadow-md mb-6">

        <h2 className="text-xl font-semibold mb-4">
          Agregar Producto
        </h2>

        <div className="grid md:grid-cols-4 gap-4">

          <input
            type="text"
            placeholder="Producto"
            value={producto}
            onChange={(e) =>
              setProducto(e.target.value)
            }
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            placeholder="Cantidad"
            value={cantidad}
            onChange={(e) =>
              setCantidad(Number(e.target.value))
            }
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            placeholder="Precio"
            value={precio}
            onChange={(e) =>
              setPrecio(Number(e.target.value))
            }
            className="border p-3 rounded-lg"
          />

          <button
            onClick={agregarProducto}
            className="bg-primary text-white rounded-lg"
          >
            Agregar
          </button>

        </div>

      </div>

      {/* DETALLE */}

      <div className="bg-white rounded-xl shadow-md mb-6 overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-3">Producto</th>
              <th className="p-3">Cantidad</th>
              <th className="p-3">Precio</th>
              <th className="p-3">Subtotal</th>
              <th className="p-3">Acciones</th>
            </tr>

          </thead>

          <tbody>

            {detalle.map((item, index) => (

              <tr key={index} className="border-t">

                <td className="p-3">
                  {item.producto}
                </td>

                <td className="p-3">
                  {item.cantidad}
                </td>

                <td className="p-3">
                  Bs. {item.precio}
                </td>

                <td className="p-3">
                  Bs. {item.subtotal}
                </td>

                <td className="p-3">

                  <button
                    onClick={() =>
                      eliminarDetalle(index)
                    }
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Eliminar
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* TOTAL */}

      <div className="bg-white p-6 rounded-xl shadow-md mb-6">

        <h2 className="text-2xl font-bold">
          Total: Bs. {total}
        </h2>

        <button
          onClick={registrarVenta}
          className="mt-4 bg-primary text-white px-6 py-3 rounded-lg"
        >
          Registrar Venta
        </button>

      </div>

      {/* HISTORIAL */}

      <div className="bg-white rounded-xl shadow-md overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-3">Fecha</th>
              <th className="p-3">Cliente</th>
              <th className="p-3">Método Pago</th>
              <th className="p-3">Total</th>
            </tr>

          </thead>

          <tbody>

            {ventas.map((venta) => (

              <tr
                key={venta.id}
                className="border-t"
              >
                <td className="p-3">
                  {venta.fecha}
                </td>

                <td className="p-3">
                  {venta.cliente}
                </td>

                <td className="p-3">
                  {venta.metodoPago}
                </td>

                <td className="p-3">
                  Bs. {venta.total}
                </td>
              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}