import React, { useEffect, useRef, useState } from 'react';

const AgregarParqueadero: React.FC = () => {
  const [Nombre, setNombre] = useState('');
  const [Direccion, setDireccion] = useState('');
  const [Telefono, setTelefono] = useState('');
  const [Correo, setCorreo] = useState('');
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [Ciudad, setCiudad] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
 
  const direccionInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!Nombre || !Direccion || !Telefono || !Correo || lat === null || lng === null || !Ciudad) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Guardar los datos en el localStorage o en el estado global
      localStorage.setItem('parqueaderoData', JSON.stringify({ Nombre, Direccion, Telefono, Correo, lat, lng, Ciudad }));

      // Redirigir a la vista de confirmación o envío
      window.location.href = '/enviar-parq'; // Cambia la URL según tu configuración
    } catch (error) {
      console.error('Error en el Registro:', error);
      setError('Error al obtener la ubicación. Asegúrate de que la dirección sea válida.');
    } finally {
      setLoading(false);
    }
  };

  // Referencia para almacenar el mapa y el marcador actual
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);

  useEffect(() => {
    const loadMapScript = () => {
      return new Promise<void>((resolve, reject) => {
        if (window.google) {
          resolve(); // El script ya está cargado
          return;
        }

        const script = document.createElement('script');
        script.src =
          'https://maps.googleapis.com/maps/api/js?key=AIzaSyCUh1x87CO7CnavPoYg8Onq0IEH1ck-3hM&libraries=places&callback=initMap';
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Google Maps API'));
        document.body.appendChild(script);
      });
    };

    const initMap = () => {
      const mapElement = document.getElementById('map');
      if (mapElement && window.google) {
        const centerMap = { lat: 6.2667791, lng: -75.750597 };
        const map = new window.google.maps.Map(mapElement, {
          zoom: 8,
          center: centerMap,
        });

        // Guardar la referencia al mapa
        mapRef.current = map;

        // Inicializa el autocompletado
        const placeInput = direccionInputRef.current; // Referencia al input de dirección
        if (placeInput) {
          const autocomplete = new window.google.maps.places.Autocomplete(placeInput);
          autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (!place.geometry || !place.geometry.location) {
              console.log('No se ha encontrado una ubicación válida');
              return;
            }

            // Elimina el marcador anterior si existe
            if (markerRef.current) {
              markerRef.current.setMap(null);
            }

            // Crea y muestra el nuevo marcador
            const newMarker = new window.google.maps.Marker({
              position: place.geometry.location,
              map,
            });

            // Guarda la referencia al nuevo marcador
            markerRef.current = newMarker;

            // Actualizar latitud, longitud y dirección en el estado
            const newLat = place.geometry.location.lat();
            const newLng = place.geometry.location.lng();
            setLat(newLat);
            setLng(newLng);
            setDireccion(place.formatted_address || ''); // Aquí se actualiza solo al seleccionar un lugar

            // Extraer la ciudad de los address_components
            const addressComponents = place.address_components;
            if (addressComponents) {
              for (let component of addressComponents) {
                const types = component.types;
                if (types.includes('locality')) {
                  setCiudad(component.long_name); // Actualizar la ciudad
                  break;
                }
              }
            }

            // Centra y hace zoom en la ubicación seleccionada
            map.setCenter(place.geometry.location);
            map.setZoom(13);
          });
        }
      }
    };

    // Definir initMap globalmente
    (window as any).initMap = initMap;

    // Cargar el script y luego inicializar el mapa
    loadMapScript().catch((error) => {
      console.error(error);
    });
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: 'url("/images/fond.png")' }}
    >
      <div className="bg-gray-800 text-white bg-opacity-80 rounded-lg shadow-lg p-10 max-w-6xl w-full flex">
        {/* Sección izquierda con el formulario */}
        <div className="w-2/3 pr-10">
          <h2 className="text-3xl font-bold mb-6">Registrar Parqueadero</h2>
          <p className="text-gray-300 mb-4">
            Agrega tu parqueadero y hazlo visible para miles de usuarios en nuestra plataforma.
          </p>
          {error && <p className="text-red-500 text-center mb-1">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="col-span-2">
                <label className="block text-gray-300">Dirección</label>
                <input
                  type="text"
                  id="Direccion"
                  ref={direccionInputRef} // Usar la referencia para el autocompletado
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none"
                  placeholder="Dirección"
                />
              </div>
              <div>
                <label className="block text-gray-300">Ciudad</label>
                <input
                  type="text"
                  id="Ciudad"
                  name="Ciudad"
                  value={Ciudad}
                  onChange={(e) => setCiudad(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none"
                  placeholder="Ciudad"
                />
              </div>
              <div>
                <label className="block text-gray-300">Nombre Parqueadero</label>
                <input
                  type="text"
                  id="Nombre"
                  name="Nombre"
                  value={Nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none"
                  placeholder="Nombre Parqueadero"
                />
              </div>
              <div>
                <label className="block text-gray-300">Número de Contacto</label>
                <input
                  type="text"
                  id="Telefono"
                  name="Telefono"
                  value={Telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none"
                  placeholder="Número de Contacto"
                />
              </div>
              <div>
                <label className="block text-gray-300">Correo Electrónico</label>
                <input
                  type="email"
                  id="Correo"
                  name="Correo"
                  value={Correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none"
                  placeholder="Correo Electrónico"
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
              disabled={loading}
            >
              {loading ? 'Registrando...' : 'Registrar Parqueadero'}
            </button>
          </form>
        </div>
        {/* Sección derecha con el mapa */}
        <div className="w-1/3">
          <div id="map" className="w-full h-full bg-gray-600 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default AgregarParqueadero;
