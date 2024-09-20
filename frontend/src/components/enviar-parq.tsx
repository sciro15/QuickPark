import React, { useEffect, useState } from 'react';

const AgregarTarifasServicios: React.FC = () => {
  const [TarifaHora, setTarifaHora] = useState("");
  const [TarifaDia, setTarifaDia] = useState("");
  const [TarifaMensual, setTarifaMensual] = useState("");
  const [Descripcion, setDescripcion] = useState("");
  const [Servicios, setServicios] = useState<string[]>([]);
  const [Caracteristicas, setCaracteristicas] = useState<string[]>([]);
  const [AdministradorID, setAdministradorID] = useState<string | null>(null);
  const [ImagenPortada, setImagenPortada] = useState<File | null>(null);

  const serviciosOpciones = ['Lavado de Autos', 'Vigilancia 24/7', 'Cargador Eléctrico', 'Valet Parking'];
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

    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        if (parsedUserData && parsedUserData.id) {
          setAdministradorID(parsedUserData.id);
        }
      } catch (error) {
        console.error('Error al parsear userData:', error);
      }
    }
  }, []);

  const handleServiciosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setServicios(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  const handleCaracteristicasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCaracteristicas(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImagenPortada(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parqueaderoData = {
      TarifaHora,
      TarifaDia,
      TarifaMensual,
      Descripcion,
      Servicios: JSON.stringify(Servicios),
      Caracteristicas: JSON.stringify(Caracteristicas),
      AdministradorID,
    };

    const vistaAnteriorData = JSON.parse(localStorage.getItem('parqueaderoData') || '{}');
    const combinedData = {
      ...vistaAnteriorData,
      ...parqueaderoData,
    };

    localStorage.setItem('parqueaderoData', JSON.stringify(combinedData));

    try {
      const formData = new FormData();
      for (const key in combinedData) {
        formData.append(key, combinedData[key]);
      }
      if (ImagenPortada) {
        formData.append('ImagenPortada', ImagenPortada);
      }

      const response = await fetch('http://localhost:2402/api/Parqueadero/parqueadero', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        console.error('Error en la respuesta del servidor:', errorDetails);
        throw new Error('Error al enviar los datos');
      }

      const result = await response.json();
      alert('Datos guardados correctamente en el servidor');
      
      localStorage.removeItem('parqueaderoData');
      window.location.href = '/agregar-parq';
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error al guardar los datos en el servidor');
    }
  };

  const handleVolver = () => {
    window.location.href = '/agregar-parq';
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: 'url("/images/fond.png")' }}>
      <div className="bg-gray-800 text-white bg-opacity-80 rounded-lg shadow-lg p-6 md:p-10 max-w-6xl w-full">
        <h2 className="text-3xl font-bold mb-6">Agregar Tarifas y Servicios</h2>

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
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Imagen de Portada</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none"
              />
              {ImagenPortada && <p className="mt-2 text-gray-300">Imagen seleccionada: {ImagenPortada.name}</p>}
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
            </div>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleVolver}
              className="py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded flex items-center text-lg"
            >
              Volver
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded flex items-center text-lg"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgregarTarifasServicios;
