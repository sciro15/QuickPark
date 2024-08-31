import React from "react";

const AgregarParqueadero = () => {
  return (
    <div className="min-h-screen bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: 'url("/images/fond.png")' }}>
      <div className="bg-gray-800 text-white bg-opacity-80 rounded-lg shadow-lg p-10 max-w-6xl w-full flex">
        {/* Sección izquierda con el formulario */}
        <div className="w-2/3 pr-10">
          <h2 className="text-3xl font-bold mb-6">Registrar Parqueadero</h2>
          <p className="text-gray-300 mb-6">
          Agrega tu parqueadero y hazlo visible para miles de usuarios en nuestra plataforma..
          </p>
          <form>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-gray-300">Nombre Parqueadero</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none"
                  placeholder="Nombre Parqueadero"
                />
              </div>
              <div>
                <label className="block text-gray-300">Dirección</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none"
                  placeholder="Dirección"
                />
              </div>
              <div>
                <label className="block text-gray-300">Ciudad</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none"
                  placeholder="Ciudad"
                />
              </div>
              <div>
                <label className="block text-gray-300">Código Postal</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none"
                  placeholder="Código Postal"
                />
              </div>
              <div>
                <label className="block text-gray-300">Número de Contacto</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none"
                  placeholder="Número de Contacto"
                />
              </div>
              <div>
                <label className="block text-gray-300">Correo Electrónico</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none"
                  placeholder="Correo Electrónico"
                />
              </div>
              <div>
                <label className="block text-gray-300">Precio por Hora</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none"
                  placeholder="Precio por Hora"
                />
              </div>
              <div>
                <label className="block text-gray-300">Subir Imagen</label>
                <input
                  type="file"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none"
                />
              </div>
            </div>
            <div className="mb-6">
              <input type="checkbox" id="terms" className="mr-2" />
              <label htmlFor="terms" className="text-gray-300">
                Aceptar términos y condiciones
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
            >
              Registrar Parqueadero
            </button>
          </form>
        </div>

        {/* Sección derecha con la imagen */}
        <div className="w-1/3">
          <img
            src="images/img-parq.png"
            alt="Imagen del Parqueadero"
            className="h-full w-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default AgregarParqueadero;
