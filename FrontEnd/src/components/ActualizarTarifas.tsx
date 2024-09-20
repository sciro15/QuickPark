import React, { useEffect, useState } from 'react';

const ActualizarTarifasServicios: React.FC = () => {
  const [TarifaHora, setTarifaHora] = useState("");
  const [TarifaDia, setTarifaDia] = useState("");
  const [TarifaMensual, setTarifaMensual] = useState("");
  const [Descripcion, setDescripcion] = useState("");
  const [Servicios, setServicios] = useState<string[]>([]);
  const [Caracteristicas, setCaracteristicas] = useState<string[]>([]);
  const [AdministradorID, setAdministradorID] = useState<string | null>(null);

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
      setAdministradorID(data.AdministradorID || null);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parqueaderoData = JSON.parse(localStorage.getItem('parqueaderoData') || '{}');
    const updatedData = {
      TarifaHora,
      TarifaDia,
      TarifaMensual,
      Descripcion,
      Servicios,
      Caracteristicas,
      AdministradorID,
    };

    try {
      const response = await fetch(`http://localhost:2402/api/Parqueadero/parqueadero/${parqueaderoData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error('Error al actualizar los datos');

      alert('Datos actualizados correctamente.');
      window.location.href = `/Folleto?id=${parqueaderoData.id}`;
    } catch (error) {
      console.error('Error en la actualización:', error);
      alert('Error al actualizar los datos. Intenta nuevamente.');
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: 'url("/images/fond.png")' }}>
      <div className="bg-gray-800 text-white bg-opacity-80 rounded-lg shadow-lg p-6 md:p-10 max-w-6xl w-full">
        <h2 className="text-3xl font-bold mb-6">Actualizar Tarifas y Servicios</h2>

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

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded"
          >
            Actualizar Tarifas
          </button>
        </form>
      </div>
    </div>
  );
};

export default ActualizarTarifasServicios;
