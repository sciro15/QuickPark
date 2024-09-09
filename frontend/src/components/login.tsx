import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faApple, faFacebook } from "@fortawesome/free-brands-svg-icons"; // Importamos los íconos
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'; // Importa los estilos de FontAwesome
config.autoAddCss = false; // Desactiva la auto-adición de CSS para evitar problemas


const Login = () => {
  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed flex justify-center items-center"
    style={{backgroundImage:'url("/images/fond.png")'}}>
      <div className="bg-gray-800 text-white bg-opacity-80 rounded-lg shadow-lg p-10 max-w-md w-full">
        <div className="text-center mb-6">
          <img
            src="images/Logo.png" 
            alt="Logo QuickPark"
            className="mx-auto h-16"
          />
          <h2 className="text-2xl font-bold mt-4">Inicio de Sesión</h2>
        </div>
        <form>
          <div className="mb-4">
            <label className="block text-gray-300">Usuario</label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
              placeholder="Usuario"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Contraseña</label>
            <input
              type="password"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
              placeholder="Contraseña"
            />
          </div>
          <div className="flex justify-between mb-6">
            <a href="#" className="text-sm text-blue-500">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            Iniciar Sesión
          </button>
        </form>
        <div className="my-6 text-center">
          <p className="text-gray-400">Continuar con</p>
          <div className="flex justify-center space-x-4 mt-4">
            <button className="bg-white text-gray-900 p-2 rounded-full">
              <FontAwesomeIcon icon={faGoogle} size="lg" />
            </button>
            <button className="bg-white text-gray-900 p-2 rounded-full">
              <FontAwesomeIcon icon={faApple} size="lg" />
            </button>
            <button className="bg-white text-gray-900 p-2 rounded-full">
              <FontAwesomeIcon icon={faFacebook} size="lg" />
            </button>
          </div>
        </div>
        <p className="text-center text-gray-400">
          ¿No tienes cuenta?{" "}
          <a href="/registro" className="text-blue-500">
        Regístrate gratis
         </a>
        </p>
        <p className="text-center text-gray-400">
         ¿No tienes parqueadero registrado?{" "}
         <a href="/agregar-parq" className="text-blue-500">
         Agregar Parqueadero
        </a>
        </p>
      </div>
    </div>
  );
};

export default Login;