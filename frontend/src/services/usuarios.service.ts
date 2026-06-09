// src/services/usuario.service.ts

import axios from "axios";

const API_URL = "http://localhost:3000/usuario";

export const obtenerUsuarios = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const crearUsuario = async (usuario: any) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    API_URL,
    usuario,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const actualizarUsuario = async (
  id: number,
  usuario: any
) => {
  const token = localStorage.getItem("token");

  const response = await axios.patch(
    `${API_URL}/${id}`,
    usuario,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const eliminarUsuario = async (
  id: number
) => {
  const token = localStorage.getItem("token");

  const response = await axios.delete(
    `${API_URL}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};