import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

interface Parqueadero {
  id?: number;
  img?: string | null;
  Nombre?: string | null;
  Direccion?: string | null;
  TarifaHora?: number | null;
  TarifaDia?: number | null;
  TarifaMensual?: number | null;
  ImagenPortada?: string | null;
}

const AdminParqueaderos: React.FC = () => {
  const [parqueaderos, setParqueaderos] = useState<Parqueadero[]>([]);
  const [id, setAdministradorID] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAdminParqueaderos = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:2402/api/Parqueadero/Admin/${id}`);
      if (!response.ok) {
        throw new Error('Error al cargar los parqueaderos para el administrador');
      }
      const data = await response.json();
      setParqueaderos(data);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      console.error('Error al obtener parqueaderos:', errorMessage);
      setError(errorMessage);
      setParqueaderos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        if (parsedUserData && parsedUserData.id) {
          setAdministradorID(parsedUserData.id);
        }
      } catch (error) {
        console.error('Error al parsear userData desde localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (id) {
      fetchAdminParqueaderos(id);
    }
  }, [id]);

  const handleDetailsClick = (parqueadero: Parqueadero) => {
    window.location.href = `/Folleto?id=${parqueadero.id}`;
  };

  const handleEditClick = (parqueadero: Parqueadero) => {
    window.location.href = `/ActualizarParqueaderoPage?id=${parqueadero.id}`;
  };

  const handleDeleteClick = async (parqueadero: Parqueadero) => {
    const { value: confirmDelete } = await Swal.fire({
      title: `¿Estás seguro?`,
      text: `¿Quieres eliminar el parqueadero ${parqueadero.Nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:2402/api/Parqueadero/parqueadero/${parqueadero.id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          toast.success('Parqueadero eliminado correctamente');
          setParqueaderos(parqueaderos.filter(p => p.id !== parqueadero.id));
        } else {
          throw new Error('Error al eliminar el parqueadero');
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        toast.error(errorMessage);
      }
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <a href="/" className="text-gray-600 hover:text-blue-600 text-lg flex items-center mr-4">
          <i className="fas fa-arrow-left mr-2"></i> Volver
        </a>
        <h1 className="text-4xl font-bold text-gray-800 flex-1 text-center mb-4">Parqueaderos Registrados</h1>
      </div>
      <div className="flex flex-col space-y-6 w-full max-w-4xl">
        {parqueaderos.length > 0 ? (
          parqueaderos.map(parking => (
            <div key={parking.id} className="bg-white rounded-lg shadow-md p-4 flex flex-row space-x-6">
              {/* Contenedor de imagen e información */}
              <div className="w-3/4 flex-grow flex flex-col bg-gray-100 p-4 rounded-lg">
                <div className="flex flex-row">
                  <div className="w-1/4">
                    {parking.ImagenPortada ? (
                      <img
                      src={`http://localhost:2402/uploads/${parking.ImagenPortada}`} 
                        className="w-full h-32 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-full h-32 rounded-lg bg-gray-200 flex items-center justify-center">
                        <span>Cargando imagen...</span>
                      </div>
                    )}
                  </div>
                  <div className="w-3/4 pl-4">
                    <h2 className="text-xl font-semibold">{parking.Nombre || "Nombre no disponible"}</h2>
                    <p><strong>Dirección:</strong> {parking.Direccion || "Dirección no disponible"}</p>
                    <p><strong>Tarifa por hora:</strong> {parking.TarifaHora ? `$${parking.TarifaHora}` : "Tarifa no disponible"}</p>
                    <p><strong>Tarifa por día:</strong> {parking.TarifaDia ? `$${parking.TarifaDia}` : "Tarifa no disponible"}</p>
                    <p><strong>Tarifa mensual:</strong> {parking.TarifaMensual ? `$${parking.TarifaMensual}` : "Tarifa no disponible"}</p>
                  </div>
                </div>
              </div>
              {/* Contenedor de los botones */}
              <div className="w-1/4 bg-white flex flex-col justify-center space-y-2 p-4 rounded-lg shadow-md">
                <button
                  onClick={() => handleDetailsClick(parking)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  <FontAwesomeIcon icon={faEye} className="mr-2" /> Detalles
                </button>
                <button
                  onClick={() => handleEditClick(parking)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                >
                  <FontAwesomeIcon icon={faEdit} className="mr-2" /> Editar
                </button>
                <button
                  onClick={() => handleDeleteClick(parking)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  <FontAwesomeIcon icon={faTrash} className="mr-2" /> Eliminar
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No se encontraron parqueaderos.</p>
        )}
      </div>
    </div>
  );
};

export default AdminParqueaderos;
