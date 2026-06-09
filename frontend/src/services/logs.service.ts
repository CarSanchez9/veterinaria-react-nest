import axios from "axios";

const API_URL =
  "http://localhost:3000/log-acceso";

export const obtenerLogs =
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

export const crearLog =
  async (log: any) => {

    const token =
      localStorage.getItem("token");

    const response =
      await axios.post(
        API_URL,
        log,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };

export const eliminarLog =
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