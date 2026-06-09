import { useEffect, useState } from "react";

import {
  obtenerClientes,
} from "../../../services/cliente.service";

import {
  obtenerMascotas,
  crearMascota,
} from "../../../services/mascota.service";

interface Cliente {
  idCliente: number;
  nombre: string;
  apellido: string;
  ci: string;
}

interface Mascota {
  idMascota?: number;
  nombre: string;
  especie: string;
  raza: string;
  edad: number;
  sexo: string;
  idCliente: number;
}

export default function MascotasView() {

  const [clientes, setClientes] =
    useState<Cliente[]>([]);

  const [mascotas, setMascotas] =
    useState<any[]>([]);

  const [buscarCi, setBuscarCi] =
    useState("");

  const [clienteEncontrado, setClienteEncontrado] =
    useState<Cliente | null>(null);

  const [nombre, setNombre] =
    useState("");

  const [especie, setEspecie] =
    useState("");

  const [raza, setRaza] =
    useState("");

  const [edad, setEdad] =
    useState("");

  const [sexo, setSexo] =
    useState("");

  useEffect(() => {
    cargarClientes();
    cargarMascotas();
  }, []);

  const cargarClientes =
    async () => {

      try {

        const data =
          await obtenerClientes();

        setClientes(data);

      } catch (error) {
        console.error(error);
      }
    };

  const cargarMascotas =
    async () => {

      try {

        const data =
          await obtenerMascotas();

        setMascotas(data);

      } catch (error) {
        console.error(error);
      }
    };

  const buscarPropietario =
    () => {

      const cliente =
        clientes.find(
          (c) => c.ci === buscarCi
        );

      setClienteEncontrado(
        cliente || null
      );
    };

  const guardarMascota =
    async () => {

      if (!clienteEncontrado) {

        alert(
          "Debe buscar un propietario"
        );

        return;
      }

      try {

        await crearMascota({
          nombre,
          especie,
          raza,
          edad:
            Number(edad),
          sexo,
          idCliente:
            clienteEncontrado.idCliente,
        });

        await cargarMascotas();

        setNombre("");
        setEspecie("");
        setRaza("");
        setEdad("");
        setSexo("");

      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div>

      <h1 className="text-3xl font-bold text-primary mb-8">
        Registrar Mascota
      </h1>

      <div className="bg-white shadow rounded-xl p-6 mb-6">

        <div className="flex gap-4">

          <input
            placeholder="CI del propietario"
            value={buscarCi}
            onChange={(e) =>
              setBuscarCi(
                e.target.value
              )
            }
            className="border p-3 rounded-lg flex-1"
          />

          <button
            onClick={buscarPropietario}
            className="bg-primary text-white px-6 rounded-lg"
          >
            Buscar
          </button>

        </div>

        {clienteEncontrado && (

          <p className="mt-4 text-green-600 font-semibold">

            Propietario:

            {" "}

            {clienteEncontrado.nombre}

            {" "}

            {clienteEncontrado.apellido}

          </p>

        )}

      </div>

      <div className="bg-white shadow rounded-xl p-6">

        <div className="grid grid-cols-2 gap-4">

          <input
            placeholder="Nombre mascota"
            value={nombre}
            onChange={(e) =>
              setNombre(
                e.target.value
              )
            }
            className="border p-3 rounded-lg"
          />

          <input
            placeholder="Especie"
            value={especie}
            onChange={(e) =>
              setEspecie(
                e.target.value
              )
            }
            className="border p-3 rounded-lg"
          />

          <input
            placeholder="Raza"
            value={raza}
            onChange={(e) =>
              setRaza(
                e.target.value
              )
            }
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            placeholder="Edad"
            value={edad}
            onChange={(e) =>
              setEdad(
                e.target.value
              )
            }
            className="border p-3 rounded-lg"
          />

          <select
            value={sexo}
            onChange={(e) =>
              setSexo(
                e.target.value
              )
            }
            className="border p-3 rounded-lg"
          >
            <option value="">
              Sexo
            </option>

            <option value="Macho">
              Macho
            </option>

            <option value="Hembra">
              Hembra
            </option>

          </select>

        </div>

        <button
          onClick={guardarMascota}
          className="mt-4 bg-primary text-white px-6 py-3 rounded-lg"
        >
          Guardar Mascota
        </button>

      </div>

      <div className="bg-white shadow rounded-xl p-6 mt-8">

        <h2 className="font-bold text-xl mb-4">
          Mascotas Registradas
        </h2>

        <table className="w-full">

          <thead>

            <tr>

              <th>Nombre</th>
              <th>Especie</th>
              <th>Raza</th>
              <th>Edad</th>

            </tr>

          </thead>

          <tbody>

            {mascotas.map(
              (m: any) => (

                <tr
                  key={m.idMascota}
                >
                  <td>
                    {m.nombre}
                  </td>

                  <td>
                    {m.especie}
                  </td>

                  <td>
                    {m.raza}
                  </td>

                  <td>
                    {m.edad}
                  </td>
                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}