import React, { useState, useEffect } from 'react';
import '../styles/global.css';

const ParkDetail = () => {
  const [parkData, setParkData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getIdFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    console.log('ID from URL:', id);
    return id;
  };

  useEffect(() => {
    const fetchData = async () => {
      const id = getIdFromUrl();
      if (!id) {
        console.error('No se encontró el parámetro id en la URL.');
        setLoading(false);
        return;
      }

      try {
        console.log('Fetching data from API...');
        const response = await fetch(`http://localhost:2402/api/Parqueadero/parqueadero/${id}`);
        const result = await response.json();
        console.log('Data received:', result);
        setParkData(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center p-4">Cargando datos...</p>;
  }

  const caracteristicas = Array.isArray(parkData.Caracteristicas)
    ? parkData.Caracteristicas
    : typeof parkData.Caracteristicas === 'string'
    ? JSON.parse(parkData.Caracteristicas)
    : [];

  const servicios = Array.isArray(parkData.Servicios)
    ? parkData.Servicios
    : typeof parkData.Servicios === 'string'
    ? JSON.parse(parkData.Servicios)
    : [];

  return (
    <div className="bg-gradient-to-r from-gray-100 to-green-100 min-h-screen flex flex-col items-center justify-center">
      <header className="w-full max-w-5xl flex flex-col md:flex-row justify-between p-4 bg-white shadow-md rounded-lg">
        <div className="text-lg font-bold mb-2 md:mb-0">
          <a href="/">Regresar</a>
        </div>
        <nav className="space-x-4">
          <a 
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(parkData.Direccion)}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-700 hover:text-blue-500"
          >
            NAVEGAR
          </a>
          
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
              src={`http://localhost:2402/uploads/${parkData.ImagenPortada}`}
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
                {caracteristicas.length > 0 ? (
                  caracteristicas.map((caracteristica, index) => (
                    <li key={index}>{caracteristica}</li>
                  ))
                ) : (
                  <li>No hay características disponibles</li>
                )}
              </ul>
            </div>

            <div>
              <h2 className="text-lg md:text-xl font-bold mb-2">Servicios adicionales</h2>
              <ul className="list-disc ml-4 text-sm md:text-base">
                {servicios.length > 0 ? (
                  servicios.map((servicio, index) => (
                    <li key={index}>{servicio}</li>
                  ))
                ) : (
                  <li>No hay servicios disponibles</li>
                )}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkDetail;
