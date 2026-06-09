import axios from "axios";

const API_URL =
  "http://localhost:3000/venta";

export const obtenerVentas =
  async () => {

    const token =
      localStorage.getItem("token");

    const response =
      await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    return response.data;
  };

export const crearVenta =
  async (venta: any) => {

    const token =
      localStorage.getItem("token");

    const response =
      await axios.post(
        API_URL,
        venta,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };

export const actualizarVenta =
  async (
    id: number,
    venta: any
  ) => {

    const token =
      localStorage.getItem("token");

    const response =
      await axios.patch(
        `${API_URL}/${id}`,
        venta,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };

export const eliminarVenta =
  async (id: number) => {

    const token =
      localStorage.getItem("token");

    const response =
      await axios.delete(
        `${API_URL}/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };