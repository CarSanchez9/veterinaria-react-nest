import axios from "axios";

const API_URL =
  "http://localhost:3000/rol";

export const obtenerRoles =
  async () => {

    const token =
      localStorage.getItem("token");

    const response =
      await axios.get(
        API_URL,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };

export const crearRol =
  async (rol: any) => {

    const token =
      localStorage.getItem("token");

    const response =
      await axios.post(
        API_URL,
        rol,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };

export const actualizarRol =
  async (
    id: number,
    rol: any
  ) => {

    const token =
      localStorage.getItem("token");

    const response =
      await axios.patch(
        `${API_URL}/${id}`,
        rol,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };

export const eliminarRol =
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