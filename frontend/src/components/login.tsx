import React, { useState } from "react";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

const Ingreso = () => {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!usuario || !contrasena) {
      setError("Por favor, completa ambos campos");
      return;
    }

    setLoading(true);
    setError(""); // Limpiar el mensaje de error antes de la solicitud

    try {
      const response = await fetch("http://localhost:2402/api/login/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Usuario: usuario, Contraseña: contrasena }),
        credentials: "include", // Para enviar cookies de sesión si las hay
      });

      if (response.ok) {
        const data = await response.json();

        // Guardar el token JWT en localStorage o sessionStorage
        localStorage.setItem("token", data.token);

        // Redirigir al usuario después de un inicio de sesión exitoso
        window.location.replace("/");
      } else {
        const result = await response.json();
        setError(result.message || "Error de autenticación");
      }
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      setError("Error de autenticación");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed flex justify-center items-center"
      style={{ backgroundImage: 'url("/images/fond.png")' }}
    >
      <div className="bg-gray-800 text-white bg-opacity-80 rounded-lg shadow-lg p-8 md:p-10 max-w-xs sm:max-w-md md:max-w-lg w-full">
        <div className="text-center mb-6">
          <img src="/images/Logo.png" alt="Logo QuickPark" className="mx-auto h-16" />
          <h2 className="text-xl md:text-2xl font-bold mt-4">Inicio de Sesión</h2>
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="usuario" className="block text-gray-300">
              Usuario
            </label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
              placeholder="Usuario"
              autoComplete="username"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="contrasena" className="block text-gray-300">
              Contraseña
            </label>
            <input
              type="password"
              id="contrasena"
              name="contrasena"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
              placeholder="Contraseña"
              autoComplete="current-password"
            />
          </div>
          <div className="flex justify-between mb-6 text-sm">
            <a href="#" className="text-blue-500">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
            disabled={loading}
          >
            {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-4 text-sm md:text-base">
          ¿No tienes cuenta?{" "}
          <a href="/registro" className="text-blue-500">
            Regístrate gratis
          </a>
        </p>
      </div>
    </div>
  );
};

export default Ingreso;