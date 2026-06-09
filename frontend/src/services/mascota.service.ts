import axios from "axios";

const API_URL =
  "http://localhost:3000/mascota";

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

export const obtenerMascotas =
  async () => {

    const response =
      await axios.get(
        API_URL,
        getConfig()
      );

    return response.data;
};

export const crearMascota =
  async (mascota: any) => {

    const response =
      await axios.post(
        API_URL,
        mascota,
        getConfig()
      );

    return response.data;
};