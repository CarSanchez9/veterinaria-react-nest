import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginBg from "../../../assets/cat.jpg";

import { login } from "../../../services/auth.service";
export default function LoginView() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [captchaChecked, setCaptchaChecked] = useState(false);


  const navigate = useNavigate();

  const getPasswordStrength = () => {
    if (password.length < 6) return "Débil";

    if (
      password.length >= 6 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password)
    ) {
      return "Intermedia";
    }

    if (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    ) {
      return "Fuerte";
    }

    return "";
  };

  const strength = getPasswordStrength();
  const handleLogin = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {
      const data =
        await login(
          email,
          password,
        );

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "usuario",
        data.usuario
      );

      localStorage.setItem(
        "rol",
        data.rol
      );

      navigate("/dashboard");

    } catch (error) {

      setError(
        "Correo o contraseña incorrectos"
      );

      console.error(error);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 font-poppins">

      {/* Imagen de fondo */}
      <div className="absolute inset-0">
        <img
          src={loginBg}
          alt="Fondo Login"
          className="w-full h-full object-cover blur-sm brightness-50"
        />
      </div>

      {/* Caja login */}
      <div className="relative z-10 max-w-md w-full bg-white/95 rounded-2xl shadow-2xl p-8">

        {/* Logo */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary">
            Veterinaria "Los 4 Amigos"
          </h1>

          <h2 className="mt-4 text-2xl font-bold text-gray-800">
            Iniciar Sesión
          </h2>

          <p className="text-gray-500 mt-2">
            Accede al sistema veterinario
          </p>
          {error && (
            <p className="text-red-500 mt-2 text-sm">
              {error}
            </p>
          )}
        </div>

        {/* Formulario */}
        <form onSubmit={handleLogin} className="space-y-5 mt-8">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico
            </label>

            <input
              type="email"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-sm text-gray-500"
              >
                {showPassword ? "Ocultar" : "Ver"}
              </button>
            </div>

            {/* Seguridad */}
            {password && (
              <p className="mt-2 text-sm">
                Seguridad:
                <span
                  className={`ml-2 font-semibold ${strength === "Débil"
                    ? "text-red-500"
                    : strength === "Intermedia"
                      ? "text-yellow-500"
                      : "text-green-600"
                    }`}
                >
                  {strength}
                </span>
              </p>
            )}
          </div>

          {/* CAPTCHA */}
          <div className="border rounded-lg p-4 flex items-center gap-3">
            <input
              type="checkbox"
              checked={captchaChecked}
              onChange={(e) =>
                setCaptchaChecked(e.target.checked)
              }
            />

            <span className="text-sm text-gray-700">
              No soy un robot
            </span>
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="w-full bg-secondary text-black font-semibold py-3 rounded-lg hover:opacity-90"
          >
            Ingresar
          </button>
        </form>

        {/* Registro */}
        <p className="text-center text-sm text-gray-500 mt-6">
          ¿No tienes cuenta?{" "}
          <Link
            to="/register"
            className="text-primary font-medium"
          >
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}