import React, { useEffect, useRef, useState } from 'react';

interface Parqueadero {
  id: string; // Incluye el id
  Nombre: string;
  Direccion: string;
  Telefono: string;
  Correo: string;
  TarifaHora: string;
  TarifaDia: string;
  TarifaMensual: string;
  Descripcion: string;
  Servicios: string[];
  Caracteristicas: string[];
}

interface Props {
  parqueadero: Parqueadero;
}

const ActualizarParqueaderoYServicios: React.FC<Props> = ({ parqueadero }) => {
  const [Nombre, setNombre] = useState('');
  const [Direccion, setDireccion] = useState('');
  const [Telefono, setTelefono] = useState('');
  const [Correo, setCorreo] = useState('');
  const [TarifaHora, setTarifaHora] = useState('');
  const [TarifaDia, setTarifaDia] = useState('');
  const [TarifaMensual, setTarifaMensual] = useState('');
  const [Descripcion, setDescripcion] = useState('');
  const [Servicios, setServicios] = useState<string[]>([]);
  const [Caracteristicas, setCaracteristicas] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const direccionInputRef = useRef<HTMLInputElement | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);

  const serviciosOpciones = ['Lavado de Autos', 'Vigilancia 24/7', 'Cargador Eléctrico', 'Valet Parking'];
  const caracteristicasOpciones = ['Techo Cubierto', 'Cámaras de Seguridad', 'Parqueo para Discapacitados', 'Espacios Amplios'];

  useEffect(() => {
    if (parqueadero) {
      setNombre(parqueadero.Nombre);
      setDireccion(parqueadero.Direccion);
      setTelefono(parqueadero.Telefono);
      setCorreo(parqueadero.Correo);
      setTarifaHora(parqueadero.TarifaHora);
      setTarifaDia(parqueadero.TarifaDia);
      setTarifaMensual(parqueadero.TarifaMensual);
      setDescripcion(parqueadero.Descripcion);
      setServicios(parqueadero.Servicios);
      setCaracteristicas(parqueadero.Caracteristicas);
    }
  }, [parqueadero]);

  useEffect(() => {
    const initMap = () => {
      if (!window.google) {
        console.error('Google Maps JavaScript API is not loaded');
        return;
      }

      const mapElement = document.getElementById('map');
      if (mapElement) {
        const map = new window.google.maps.Map(mapElement, {
          zoom: 13,
          center: { lat: -34.397, lng: 150.644 },
        });

        mapRef.current = map;

        const placeInput = direccionInputRef.current;
        if (placeInput) {
          const autocomplete = new window.google.maps.places.Autocomplete(placeInput);
          autocomplete.addListener('place_changed', async () => {
            const place = autocomplete.getPlace();
            if (!place.geometry || !place.geometry.location) {
              console.error('No se ha encontrado una ubicación válida');
              return;
            }

            if (markerRef.current) {
              markerRef.current.setMap(null);
            }

            const newMarker = new window.google.maps.Marker({
              position: place.geometry.location,
              map,
            });

            markerRef.current = newMarker;

            setDireccion(place.formatted_address || '');
            map.setCenter(place.geometry.location);
            map.setZoom(13);
          });
        }
      }
    };

    const loadMapScript = () => {
      const existingScript = document.getElementById('googleMapsScript');
      if (!existingScript) {
        const script = document.createElement('script');
        script.id = 'googleMapsScript';
        script.src = 'https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places&callback=initMap';
        script.async = true;
        script.defer = true;
        script.onload = () => initMap();
        document.body.appendChild(script);
      } else {
        initMap();
      }
    };

    loadMapScript();
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
  
    if (!Nombre || !Direccion || !Telefono || !Correo || !TarifaHora || !TarifaDia || !TarifaMensual || !Descripcion) {
      setError('Por favor, completa todos los campos.');
      return;
    }
  
    setLoading(true);
    setError('');
  
    try {
      const parqueaderoData = {
        id: parqueadero.id, // Incluye el ID
        Nombre,
        Direccion,
        Telefono,
        Correo,
        TarifaHora,
        TarifaDia,
        TarifaMensual,
        Descripcion,
        Servicios,
        Caracteristicas,
        // No incluyas AdministradoID
      };
  
      const response = await fetch(`http://localhost:2402/api/Parqueadero/parqueadero/${parqueadero.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parqueaderoData),
      });
  
      if (!response.ok) throw new Error('Error al actualizar los datos');
  
      alert('Datos actualizados correctamente.');
      window.location.href = '/Folleto'; // Redirigir después de la actualización
    } catch (error) {
      console.error('Error en la actualización:', error);
      setError('Error al actualizar los datos. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-cover bg-center flex justify-center items-center px-4 py-8" style={{ backgroundImage: 'url("/images/fond.png")' }}>
      <div className="bg-gray-800 text-white bg-opacity-80 rounded-lg shadow-lg p-10 max-w-6xl w-full flex flex-col md:flex-row">
        
        <div className="w-full md:w-2/3 mb-8 md:mb-0 md:pr-10">
          <h2 className="text-3xl font-bold mb-6">Actualizar Parqueadero y Tarifas</h2>
          {error && <p className="text-red-500 text-center mb-1">{error}</p>}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-gray-300">Nombre</label>
                <input
                  type="text"
                  value={Nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none"
                  placeholder="Nombre"
                />
              </div>
              <div>
                <label className="block text-gray-300">Dirección</label>
                <input
                  type="text"
                  ref={direccionInputRef}
                  value={Direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none"
                  placeholder="Dirección"
                />
              </div>
              <div>
                <label className="block text-gray-300">Teléfono</label>
                <input
                  type="tel"
                  value={Telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none"
                  placeholder="Teléfono"
                />
              </div>
              <div>
                <label className="block text-gray-300">Correo</label>
                <input
                  type="email"
                  value={Correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none"
                  placeholder="Correo"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-300 mb-2">Tarifa por Hora</label>
                <input
                  type="number"
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
                  value={TarifaMensual}
                  onChange={(e) => setTarifaMensual(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none"
                  placeholder="Tarifa Mensual"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Descripción del Parqueadero</label>
              <textarea
                value={Descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none"
                placeholder="Escribe una descripción de tu parqueadero"
                rows={5}
              />
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

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
              disabled={loading}
            >
              {loading ? 'Actualizando...' : 'Actualizar Parqueadero y Tarifas'}
            </button>
          </form>
        </div>

        <div className="w-full md:w-1/3 h-64 md:h-auto">
          <div id="map" className="w-full h-full bg-gray-600 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default ActualizarParqueaderoYServicios;
