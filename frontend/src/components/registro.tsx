import React, { useState } from "react";


const Register = () => {
  const [Usuario, setUsuario] = useState("");
  const [Contraseña, setContraseña] = useState("");
  const [Nombres, setNombres] = useState("");
  const [Apellidos, setApellidos] = useState("");
  const [Correo, setCorreo] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Entró en handleSubmit");
    if (!Usuario || !Contraseña || !Nombres || !Apellidos || !Correo ) {
      setError("Por favor, completa los campos");
      return;
    }
    setLoading(true);
    setError(""); // Limpiar error antes de la solicitud

    try {
      const response = await fetch("http://localhost:2402/api/personas/personas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "", // Añadir la clave API en el header
        },
        body: JSON.stringify({ Nombres,Apellidos,Correo,Usuario,Contraseña }),
      });

      if (response.ok) {
        window.location.replace("/Login"); // Redirigir al usuario después del Registro exitoso
      } else {
        const result = await response.json();
        setError(typeof result.error === 'string' ? result.error : "Error de Registro");
      }
    } catch (error) {
      console.error("Error en el Registro:", error);
      setError("Error de Regiostro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed flex justify-center items-center"
      style={{ backgroundImage: 'url("/images/fond.png")' }} 
    >
      <div className="bg-gray-800 text-white bg-opacity-90 rounded-lg shadow-lg p-10 max-w-lg w-full">
        <div className="text-center mb-6">
          <img
            src="images/Logo.png" 
            alt="Logo QuickPark"
            className="mx-auto h-16"
          />
          <h2 className="text-2xl font-bold mt-4">Registro</h2>
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Campo de Nombre */}
          <div className="mb-4">
            <label className="block text-gray-300">Nombres</label>
            <input
              type="text"
              id="Nombre"
              name="Nombres"
              value={Nombres}
              onChange={(e) => setNombres(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
              placeholder="Nombres"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300">Apellidos</label>
            <input
              type="text"
              id="Apellidos"
              name="Apellidos"
              value={Apellidos}
              onChange={(e) => setApellidos(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
              placeholder="Apellidos"
            />
          </div>

          {/* Campo de Email */}
          <div className="mb-4">
            <label className="block text-gray-300">Correo Electrónico</label>
            <input
              type="email"
              id="Correo"
              name="Correo"
              value={Correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
              placeholder="Correo electrónico"
            />
          </div>
          {/* Campo de Email */}
          <div className="mb-4">
            <label className="block text-gray-300">Usuario</label>
            <input
              type="text"
              id="Usuario"
              name="Usuario"
              value={Usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
              placeholder="Usuario"
            />
          </div>
          {/* Campo de Contraseña */}
          <div className="mb-4">
            <label className="block text-gray-300">Contraseña</label>
            <input
              type="password"
              id="Contraseña"
              name="Contraseña"
              value={Contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
              placeholder="Contraseña"
            />
          </div>   

          {/* Checkboxes para aceptar términos */}
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-gray-300">Acepto los términos y condiciones</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
            >
            {loading ? "Registrando..." : "Registrar"}
          
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          ¿Ya tienes cuenta?{" "}
          <a href="/Login?" className="text-blue-500">
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
