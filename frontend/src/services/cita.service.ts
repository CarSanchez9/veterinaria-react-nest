import axios from "axios";

const API_URL =
  "http://localhost:3000/cita";

const getHeaders = () => ({
  headers: {
    Authorization:
      `Bearer ${localStorage.getItem("token")}`,
  },
});

export const obtenerCitas =
  async () => {

    const response =
      await axios.get(
        API_URL,
        getHeaders()
      );

    return response.data;
};

export const crearCita =
  async (cita: any) => {

    const response =
      await axios.post(
        API_URL,
        cita,
        getHeaders()
      );

    return response.data;
};

export const eliminarCita =
  async (id: number) => {

    const response =
      await axios.delete(
        `${API_URL}/${id}`,
        getHeaders()
      );

    return response.data;
};