import api from "./api";

export const obtenerHistorias = async () => {
  const response = await api.get(
    "/historia-clinica"
  );

  return response.data;
};

export const crearHistoria = async (
  historia: any
) => {
  const response = await api.post(
    "/historia-clinica",
    historia
  );

  return response.data;
};

export const eliminarHistoria = async (
  id: number
) => {
  const response = await api.delete(
    `/historia-clinica/${id}`
  );

  return response.data;
};