import axios from "axios";

const API_URL =
  "http://localhost:3000/cliente";

const getConfig = () => {

  const token =
    localStorage.getItem("token");

  return {
    headers: {
      Authorization:
        `Bearer ${token}`,
    },
  };
};

export const obtenerClientes =
  async () => {

    const response =
      await axios.get(
        API_URL,
        getConfig()
      );

    return response.data;
};

export const crearCliente =
  async (cliente: any) => {

    const response =
      await axios.post(
        API_URL,
        cliente,
        getConfig()
      );

    return response.data;
};

export const actualizarCliente =
  async (
    id: number,
    cliente: any
  ) => {

    const response =
      await axios.patch(
        `${API_URL}/${id}`,
        cliente,
        getConfig()
      );

    return response.data;
};

export const eliminarCliente =
  async (id: number) => {

    const response =
      await axios.delete(
        `${API_URL}/${id}`,
        getConfig()
      );

    return response.data;
};