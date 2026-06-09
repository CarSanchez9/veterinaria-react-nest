import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomeView from "../modules/public/pages/HomeView";
import LoginView from "../modules/auth/pages/LoginView";

import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../modules/dashboard/pages/DashboardHome";
import ClientesView from "../modules/clients/pages/ClientesView";
import MascotasView from "../modules/pets/pages/MascotasView";
import CitasView from "../modules/appointments/pages/CitasView";
import ConsultasView from "../modules/consultations/pages/ConsultasView";
import TratamientoView from "../modules/treatments/pages/TratamientoView";
import VacunasView from "../modules/vaccines/pages/VacunasView";
import HistorialClinicoView from "../modules/medical-history/pages/HistorialClinicoView";
import InventarioView from "../modules/inventory/pages/InventarioView";
import VentasView from "../modules/sales/pages/VentasView";
import LogsView from "../modules/users/pages/LogsView";
import RolesView from "../modules/users/pages/RolesView";
import UsuariosView from "../modules/users/pages/UsuariosView";
import GestionUsuariosView from "../modules/users/GestionUsuariosView";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<HomeView />} />

        <Route path="/login" element={<LoginView />} />

        <Route
          path="/dashboard"
          element={<DashboardLayout />}
        >
          <Route
            index
            element={<DashboardHome />}
          />

          <Route
            path="clientes"
            element={<ClientesView />}
          />

          <Route
            path="mascotas"
            element={<MascotasView />}
          />

          <Route
            path="citas"
            element={<CitasView />}
          />

          <Route
            path="consultas"
            element={<ConsultasView />}
          />

          <Route
            path="tratamientos"
            element={<TratamientoView />}
          />

          <Route
            path="vacunas"
            element={<VacunasView />}
          />

          <Route
            path="historial"
            element={<HistorialClinicoView />}
          />

          <Route
            path="inventario"
            element={<InventarioView />}
          />

          <Route
            path="ventas"
            element={<VentasView />}
          />
          <Route
            path="users"
            element={<GestionUsuariosView />}
          />
          <Route
            path="users/usuario"
            element={<UsuariosView />}
          />

          <Route
            path="users/roles"
            element={<RolesView />}
          />

          <Route
            path="users/logs"
            element={<LogsView />}
          />
        </Route>


      </Routes>
    </BrowserRouter>
  );
}