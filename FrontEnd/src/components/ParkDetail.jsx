// src/components/ParkDetail.jsx
import React, { useState, useEffect } from 'react';
import '../styles/global.css';

const ParkDetail = () => {
  // Estado para almacenar los datos del parqueadero
  const [parkData, setParkData] = useState(null);
  const [loading, setLoading] = useState(true); // Para manejar el estado de carga

  // Efecto para obtener los datos de la API cuando el componente se monta
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data from API...');
        const response = await fetch('http://localhost:2402/api/Parqueadero/parqueadero/21'); // Cambia la URL a la correcta
        const result = await response.json();
        console.log('Data received:', result);
        setParkData(result);
        setLoading(false); // Datos cargados, cambia el estado de carga
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Aunque haya error, cambia el estado de carga
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center p-4">Cargando datos...</p>; // Muestra mensaje mientras se cargan los datos
  }

  return (
    <div className="bg-gradient-to-r from-gray-100 to-green-100 min-h-screen flex flex-col items-center justify-center">
      <header className="w-full max-w-5xl flex flex-col md:flex-row justify-between p-4 bg-white shadow-md rounded-lg">
        <div className="text-lg font-bold mb-2 md:mb-0">Regresar</div>
        <nav className="space-x-4">
          <a href="#" className="text-gray-700 hover:text-blue-500">NAVEGAR</a>
          <a href="#" className="text-gray-700 hover:text-blue-500">CONTACTO</a>
        </nav>
      </header>

      <div className="bg-white max-w-5xl mt-6 rounded-lg shadow-lg p-8">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-2/3 mb-6 md:mb-0">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">{parkData.Nombre}</h1>
            <p className="text-sm md:text-base text-gray-600 mb-4">{parkData.Descripcion}</p>
          </div>
          <div className="md:w-1/3 mb-6 md:mb-0">
            <img
              src={parkData.ImagenPortada || '/default-image.jpg'}
              alt="Imagen del Parqueadero"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        </div>

        <div className="bg-[#0ACF9B] text-white rounded-lg p-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold mb-2">TARIFAS</h2>
              <p className="text-sm md:text-base">Hora: ${parkData.TarifaHora} COP</p>
              <p className="text-sm md:text-base">Día completo: ${parkData.TarifaDia} COP</p>
              <p className="text-sm md:text-base">Mensualidad: ${parkData.TarifaMensual} COP</p>
              <p className="text-sm md:text-base">
                Consulta nuestras promociones y descuentos especiales en nuestra página web o en nuestros oficiales.
              </p>
            </div>

            <div>
              <h2 className="text-lg md:text-xl font-bold mb-2">Características</h2>
              <ul className="list-disc ml-4 text-sm md:text-base">
                {parkData.Caracteristicas.map((caracteristica, index) => (
                  <li key={index}>{caracteristica}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-lg md:text-xl font-bold mb-2">Servicios adicionales</h2>
              <ul className="list-disc ml-4 text-sm md:text-base">
                {parkData.Servicios.map((servicio, index) => (
                  <li key={index}>{servicio}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg md:text-xl font-bold mb-2">CONTACTANOS</h2>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/3 mb-6 md:mb-0">
              <p className="text-sm md:text-base">Dirección: {parkData.Direccion}</p>
              <p className="text-sm md:text-base">Teléfono: {parkData.Telefono}</p>
              <p className="text-sm md:text-base">Correo electrónico: {parkData.Correo}</p>
            </div>

            <div className="md:w-1/3">
              <img
                src="/default-contact-image.jpg"
                alt="Imagen de contacto"
                className="w-full h-auto rounded-lg shadow-md mt-4 md:mt-0"
              />
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-6 p-4 text-center bg-white shadow-md rounded-lg">
        <div className="flex justify-center space-x-4 mt-2">
          <a href="https://facebook.com" className="text-gray-700 hover:text-blue-500">
            <i className="fab fa-facebook-f text-2xl"></i>
          </a>
          <a href="https://twitter.com" className="text-gray-700 hover:text-blue-500">
            <i className="fab fa-twitter text-2xl"></i>
          </a>
          <a href="https://instagram.com" className="text-gray-700 hover:text-blue-500">
            <i className="fab fa-instagram text-2xl"></i>
          </a>
        </div>
        <p className="text-sm text-gray-600 mt-2">Copyright © 2024. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ParkDetail;
