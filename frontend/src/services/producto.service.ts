import axios from "axios";

const API_URL =
    "http://localhost:3000/producto";

const getHeaders = () => {
    const token =
        localStorage.getItem("token");

    return {
        Authorization: `Bearer ${token}`,
    };
};

export const obtenerProductos =
    async () => {
        const response =
            await axios.get(API_URL, {
                headers: getHeaders(),
            });


        return response.data;


    };

export const crearProducto =
    async (producto: any) => {
        const response =
            await axios.post(
                API_URL,
                producto,
                {
                    headers: getHeaders(),
                }
            );


        return response.data;


    };

export const actualizarProducto =
    async (
        id: number,
        producto: any
    ) => {
        const response =
            await axios.patch(
                `${API_URL}/${id}`,
                producto,
                {
                    headers: getHeaders(),
                }
            );


        return response.data;


    };

export const eliminarProducto =
    async (id: number) => {
        const response =
            await axios.delete(
                `${API_URL}/${id}`,
                {
                    headers: getHeaders(),
                }
            );


        return response.data;


    };
