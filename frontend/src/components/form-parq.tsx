import React, { useState } from 'react';

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

  // Manejar selección de checkboxes
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para manejar el envío de datos
    console.log({ TarifaHora, TarifaDia, TarifaMensual, Descripcion, Servicios, Caracteristicas });
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: 'url("/images/fond.png")' }}>
      <div className="bg-gray-800 text-white bg-opacity-80 rounded-lg shadow-lg p-6 md:p-10 max-w-4xl w-full">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Agregar Tarifas y Servicios</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Campo de Tarifas */}
          <div className="mb-6">
            <label className="block text-gray-300">Tarifas</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-300">Por Hora</label>
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
                <label className="block text-gray-300">Por Día</label>
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
                <label className="block text-gray-300">Mensualidad</label>
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
          </div>

          {/* Campo de Descripción */}
          <div className="mb-6 col-span-1 md:col-span-2">
            <label className="block text-gray-300">Descripción del Parqueadero</label>
            <textarea
              id="Descripcion"
              name="Descripcion"
              value={Descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none"
              placeholder="Descripción"
            />
          </div>

          {/* Servicios */}
          <div className="mb-6 col-span-1 md:col-span-2">
            <label className="block text-gray-300 mb-2">Servicios</label>
            <div className="overflow-y-auto max-h-32 bg-gray-700 p-2 rounded">
              {serviciosOpciones.map((servicio) => (
                <div key={servicio} className="mb-3"> {/* Espaciado ajustado aquí */}
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

          {/* Características */}
          <div className="mb-6 col-span-1 md:col-span-2">
            <label className="block text-gray-300 mb-2">Características</label>
            <div className="overflow-y-auto max-h-32 bg-gray-700 p-2 rounded">
              {caracteristicasOpciones.map((caracteristica) => (
                <div key={caracteristica} className="mb-3"> {/* Espaciado ajustado aquí */}
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

          {/* Botón para enviar */}
          <div className="col-span-1 md:col-span-2">
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
