import axios from "axios";

const API_URL =
  "http://localhost:3000/tratamiento";

const getHeaders = () => ({
  headers: {
    Authorization:
      `Bearer ${localStorage.getItem("token")}`,
  },
});

export const obtenerTratamientos =
  async () => {

    const response =
      await axios.get(
        API_URL,
        getHeaders()
      );

    return response.data;
};

export const crearTratamiento =
  async (tratamiento: any) => {

    const response =
      await axios.post(
        API_URL,
        tratamiento,
        getHeaders()
      );

    return response.data;
};

export const eliminarTratamiento =
  async (id: number) => {

    const response =
      await axios.delete(
        `${API_URL}/${id}`,
        getHeaders()
      );

    return response.data;
};