import React from "react";


const Register = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed flex justify-center items-center"
      style={{ backgroundImage: 'url("/images/fond.png")' }} // Usa la misma imagen de fondo
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
        <form>
          {/* Campo de Nombre */}
          <div className="mb-4">
            <label className="block text-gray-300">Nombre</label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
              placeholder="Nombre completo"
            />
          </div>

          {/* Campo de Email */}
          <div className="mb-4">
            <label className="block text-gray-300">Correo Electrónico</label>
            <input
              type="email"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
              placeholder="Correo electrónico"
            />
          </div>

          {/* Campo de Contraseña */}
          <div className="mb-4">
            <label className="block text-gray-300">Contraseña</label>
            <input
              type="password"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
              placeholder="Contraseña"
            />
          </div>

          {/* Campo de Confirmación de Contraseña */}
          <div className="mb-4">
            <label className="block text-gray-300">Confirmar Contraseña</label>
            <input
              type="password"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
              placeholder="Confirmar contraseña"
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
            <label className="flex items-center mt-2">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-gray-300">Acepto la política de privacidad</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            Registrarse
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          ¿Ya tienes cuenta?{" "}
          <a href="/?" className="text-blue-500">
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
