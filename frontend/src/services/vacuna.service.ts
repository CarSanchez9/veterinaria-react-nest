import axios from "axios";

const API_URL =
  "http://localhost:3000/vacuna";

export const obtenerVacunas =
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

export const crearVacuna =
  async (vacuna: any) => {
    const token =
      localStorage.getItem("token");

    const response =
      await axios.post(
        API_URL,
        vacuna,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };

export const actualizarVacuna =
  async (
    id: number,
    vacuna: any
  ) => {
    const token =
      localStorage.getItem("token");

    const response =
      await axios.patch(
        `${API_URL}/${id}`,
        vacuna,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };

export const eliminarVacuna =
  async (id: number) => {
    const token =
      localStorage.getItem("token");

    const response =
      await axios.delete(
        `${API_URL}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };