import React, { useEffect, useState } from 'react';

const AgregarTarifasServicios: React.FC = () => {
  const [TarifaHora, setTarifaHora] = useState("");
  const [TarifaDia, setTarifaDia] = useState("");
  const [TarifaMensual, setTarifaMensual] = useState("");
  const [Descripcion, setDescripcion] = useState("");
  const [Servicios, setServicios] = useState<string[]>([]);
  const [Caracteristicas, setCaracteristicas] = useState<string[]>([]);

  // Servicios predefinidos
  const serviciosOpciones = ['Lavado de Autos', 'Vigilancia 24/7', 'Cargador Eléctrico', 'Valet Parking'];
  
  // Características predefinidas
  const caracteristicasOpciones = ['Techo Cubierto', 'Cámaras de Seguridad', 'Parqueo para Discapacitados', 'Espacios Amplios'];

  useEffect(() => {
    const storedData = localStorage.getItem('parqueaderoData');
    if (storedData) {
      const data = JSON.parse(storedData);
      setTarifaHora(data.TarifaHora || "");
      setTarifaDia(data.TarifaDia || "");
      setTarifaMensual(data.TarifaMensual || "");
      setDescripcion(data.Descripcion || "");
      setServicios(data.Servicios || []);
      setCaracteristicas(data.Caracteristicas || []);
    }
  }, []);

  const handleServiciosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setServicios(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  const handleCaracteristicasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCaracteristicas(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Crear un objeto para almacenar los datos
    const parqueaderoData = {
      TarifaHora,
      TarifaDia,
      TarifaMensual,
      Descripcion,
      Servicios,
      Caracteristicas,
    };
  
    // Obtener datos de la vista anterior desde localStorage
    const vistaAnteriorData = JSON.parse(localStorage.getItem('parqueaderoData') || '{}');
    
    // Combinamos los datos de ambas vistas
    const combinedData = {
      ...vistaAnteriorData,
      ...parqueaderoData,
    };

       
      
        // Enviar los datos desglosados al servidor en formato JSON
        try {
          const response = await fetch('http://localhost:2402/api/Parqueadero/parqueadero', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(combinedData), // Convertir los datos a JSON
          });
      
          if (!response.ok) {
            throw new Error('Error al enviar los datos');
          }
      
          const result = await response.json();
          console.log("Datos enviados:", combinedData); // Mostrar los datos enviados
          alert('Datos guardados correctamente en el servidor');
          console.log("Respuesta del servidor:", result);
        } catch (error) {
          console.error('Error en la solicitud:', error);
          alert('Error al guardar los datos en el servidor');
        }
};
  

  return (
    <div className="min-h-screen bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: 'url("/images/fond.png")' }}>
      <div className="bg-gray-800 text-white bg-opacity-80 rounded-lg shadow-lg p-6 md:p-10 max-w-6xl w-full">
        <h2 className="text-3xl font-bold mb-6">Agregar Tarifas y Servicios</h2>
        <div className="mb-8">
          <p className="text-gray-300 mb-4">
            Agrega las tarifas y servicios de tu parqueadero para que los usuarios puedan tener toda la información necesaria. Proporciona detalles sobre los costos por hora, día y mensualidad, además de los servicios y características que ofreces.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-gray-300 mb-2">Tarifa por Hora</label>
              <input
                type="number"
                id="TarifaHora"
                name="TarifaHora"
                value={TarifaHora}
                onChange={(e) => setTarifaHora(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none"
                placeholder="Tarifa por Hora"
              />
              <p>{TarifaHora && `Tarifa por Hora: ${TarifaHora}`}</p>
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Tarifa por Día</label>
              <input
                type="number"
                id="TarifaDia"
                name="TarifaDia"
                value={TarifaDia}
                onChange={(e) => setTarifaDia(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none"
                placeholder="Tarifa por Día"
              />
              <p>{TarifaDia && `Tarifa por Día: ${TarifaDia}`}</p>
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Tarifa Mensual</label>
              <input
                type="number"
                id="TarifaMensual"
                name="TarifaMensual"
                value={TarifaMensual}
                onChange={(e) => setTarifaMensual(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none"
                placeholder="Tarifa Mensual"
              />
              <p>{TarifaMensual && `Tarifa Mensual: ${TarifaMensual}`}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 mb-2">Descripción del Parqueadero</label>
              <textarea
                id="Descripcion"
                name="Descripcion"
                value={Descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none"
                placeholder="Escribe una descripción de tu parqueadero"
                rows={5}
              />
              <p>{Descripcion && `Descripción: ${Descripcion}`}</p>
            </div>
            
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 mb-2">Servicios</label>
              <div className="overflow-y-auto max-h-32 bg-gray-700 p-2 rounded">
                {serviciosOpciones.map((servicio) => (
                  <div key={servicio} className="mb-3">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        value={servicio}
                        checked={Servicios.includes(servicio)}
                        onChange={handleServiciosChange}
                        className="form-checkbox"
                      />
                      <span className="ml-2">{servicio}</span>
                    </label>
                  </div>
                ))}
              </div>
              <p>{Servicios.length > 0 && `Servicios seleccionados: ${Servicios.join(", ")}`}</p>
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Características</label>
              <div className="overflow-y-auto max-h-32 bg-gray-700 p-2 rounded">
                {caracteristicasOpciones.map((caracteristica) => (
                  <div key={caracteristica} className="mb-3">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        value={caracteristica}
                        checked={Caracteristicas.includes(caracteristica)}
                        onChange={handleCaracteristicasChange}
                        className="form-checkbox"
                      />
                      <span className="ml-2">{caracteristica}</span>
                    </label>
                  </div>
                ))}
              </div>
              <p>{Caracteristicas.length > 0 && `Características seleccionadas: ${Caracteristicas.join(", ")}`}</p>
            </div>
          </div>
          <div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
              Guardar Parqueadero
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgregarTarifasServicios;
