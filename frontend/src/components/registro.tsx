import React, { useState } from "react";

const Register = () => {
  const [Usuario, setUsuario] = useState("");
  const [Contraseña, setContraseña] = useState("");
  const [Nombres, setNombres] = useState("");
  const [Apellidos, setApellidos] = useState("");
  const [Correo, setCorreo] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña

  const handleSubmit = async (e : any) => {
    e.preventDefault();

    // Validación string | null;e los campos
    if (!Usuario || !Contraseña || !Nombres || !Apellidos || !Correo) {
      setError("Por favor, completa todos los campos");
      return;
    }

    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/; // Al menos 8 caracteres, una mayúscula, un número, sin caracteres especiales
    if (!passwordPattern.test(Contraseña)) {
      setError("La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:2402/api/Administrador/Administrador", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Authorization": "", // Añadir clave API si es necesario
        },
        body: JSON.stringify({ Nombres, Apellidos, Correo, Usuario, Contraseña }),
      });

      if (response.ok) {
        window.location.replace("/Login");
      } else {
        const result = await response.json();
        setError(result.error || "Error de Registro");
      }
    } catch (error) {
      console.error("Error en el Registro:", error);
      setError("Error de Registro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-cover"
      style={{ backgroundImage: 'url("/images/fond.png")' }}
    >
      <div className="bg-gray-800 text-white bg-opacity-80 rounded-lg shadow-lg p-6 md:p-8 max-w-lg w-full">
        <h2 className="text-lg md:text-xl font-bold text-center mb-4">Registro</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="Nombres" className="block text-gray-300">Nombres</label>
            <input
              type="text"
              id="Nombres"
              value={Nombres}
              onChange={(e) => setNombres(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
              placeholder="Nombres"
              autoComplete="given-name"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="Apellidos" className="block text-gray-300">Apellidos</label>
            <input
              type="text"
              id="Apellidos"
              value={Apellidos}
              onChange={(e) => setApellidos(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
              placeholder="Apellidos"
              autoComplete="family-name"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="Correo" className="block text-gray-300">Correo Electrónico</label>
            <input
              type="email"
              id="Correo"
              value={Correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
              placeholder="Correo electrónico"
              autoComplete="email"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="Usuario" className="block text-gray-300">Usuario</label>
            <input
              type="text"
              id="Usuario"
              value={Usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
              placeholder="Usuario"
              autoComplete="username"
            />
          </div>

          <div className="mb-4 relative">
            <label htmlFor="Contraseña" className="block text-gray-300">Contraseña</label>
            <input
              type={showPassword ? "text" : "password"}
              id="Contraseña"
              value={Contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500 pr-10"
              placeholder="Contraseña"
              autoComplete="new-password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <i className="fas fa-eye"></i> : <i className="fas fa-eye-slash"></i>}
            </button>
          </div>

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="terms"
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            <label htmlFor="terms" className="ml-2 text-gray-300">
              Acepto los términos y condiciones
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
            disabled={loading}
          >
            {loading ? "Registrando..." : "Registrar"}
          </button>

          <p className="text-center text-gray-400 mt-4 text-sm md:text-base">
            ¿Ya tienes cuenta?{" "}
            <a href="/Login" className="text-blue-500">Inicia sesión</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
