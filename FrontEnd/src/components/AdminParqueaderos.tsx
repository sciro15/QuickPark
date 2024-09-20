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
    console.log('Detalles', parqueadero);
  };

  const handleEditClick = (parqueadero: Parqueadero) => {
    console.log('Editar', parqueadero);
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
    <div className="w-full bg-gray-100 p-6 rounded-lg shadow-lg">
        <a href="/" className="text-black text-2xl mr-4">
            &larr; {/* Flecha de retroceso como entidad HTML */}
        </a>
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Parqueaderos del Administrador</h1>
      <div className="space-y-6">
        {parqueaderos.length > 0 ? (
          parqueaderos.map(parking => (
            <div key={parking.id} className="flex flex-col md:flex-row items-start bg-white rounded-lg shadow-md p-4 space-y-4 md:space-y-0 md:space-x-4 border-b pb-4">
              {parking.img ? (
                <img src={parking.img} alt={parking.Nombre || "Imagen de parqueadero"} className="w-24 h-24 md:w-32 md:h-32 rounded-lg object-cover" />
              ) : (
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg bg-gray-200 flex items-center justify-center">
                  <span>Cargando imagen...</span>
                </div>
              )}
              <div className="flex-grow">
                <h2 className="text-xl font-semibold">{parking.Nombre || "Nombre no disponible"}</h2>
                <p><strong>Dirección:</strong> {parking.Direccion || "Dirección no disponible"}</p>
                <p><strong>Tarifa por hora:</strong> {parking.TarifaHora ? `$${parking.TarifaHora}` : "Tarifa no disponible"}</p>
                <p><strong>Tarifa por día:</strong> {parking.TarifaDia ? `$${parking.TarifaDia}` : "Tarifa no disponible"}</p>
                <p><strong>Tarifa mensual:</strong> {parking.TarifaMensual ? `$${parking.TarifaMensual}` : "Tarifa no disponible"}</p>
              </div>
              <div className="flex flex-col mt-4 space-y-2">
                <div className="flex space-x-2 mt-4">
                  <button onClick={() => handleDetailsClick(parking)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                    <FontAwesomeIcon icon={faEye} className="mr-2" /> Detalles
                  </button>
                  <button onClick={() => handleEditClick(parking)} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition">
                    <FontAwesomeIcon icon={faEdit} className="mr-2" /> Editar
                  </button>
                </div>
                <button onClick={() => handleDeleteClick(parking)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition mt-2">
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
