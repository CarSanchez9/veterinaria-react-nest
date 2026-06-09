import { Link } from "react-router-dom";
import petsImage from "../../../assets/cat3.jpeg";

export default function HomeView() {
  return (
    <div className="min-h-screen bg-lightbg font-poppins">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-10 py-6 bg-white shadow-sm">

        {/* Logo */}
        <div className="text-3xl font-bold text-primary">
          Veterinaria "Los 4 amigos"
        </div>


        {/* Login derecha */}
        <Link
          to="/login"
          className="bg-secondary text-white px-6 py-2 rounded-full hover:opacity-90"
        >
          Login
        </Link>
      </nav>

      {/* HERO */}
      <div className="flex flex-wrap">

        {/* Texto izquierda */}
        <div className="w-full md:w-9/12">
          <div className="container mx-auto h-full p-10">

            <header className="flex items-center h-full mt-10">
              <div>

                <p className="text-primary font-medium mb-4">
                  Clínica Veterinaria & Spa
                </p>

                <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                  Cuidado experto para
                  <span className="text-primary">
                    {" "}tus mejores amigos
                  </span>
                </h1>

                <div className="w-24 h-2 bg-primary my-6 rounded"></div>

                <p className="text-lg text-gray-600 mb-8">
                  Servicios médicos veterinarios,
                  vacunas, emergencias y spa para
                  mascotas en un solo lugar.
                </p>


              </div>
            </header>
          </div>
        </div>

        {/* Imagen derecha */}
        <div className="w-full md:w-3/12">
          <img
            src={petsImage}
            alt="Mascotas"
            className="w-full h-[500px] object-cover rounded-bl-[70px]"
          />
        </div>
      </div>

      {/* SERVICIOS */}
      <section className="px-10 py-16">
        <h2 className="text-3xl font-bold text-center text-primary mb-10">
          Nuestros Servicios
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white shadow-md rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-3">
              Consultas Médicas
            </h3>
            <p className="text-gray-600">
              Diagnóstico profesional y atención
              especializada para tus mascotas.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-3">
              Vacunación
            </h3>
            <p className="text-gray-600">
              Programas completos de vacunación
              y prevención.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-3">
              Spa & Venta de productos
            </h3>
            <p className="text-gray-600">
              Baño, corte y cuidado premium
              para tu mascota.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}