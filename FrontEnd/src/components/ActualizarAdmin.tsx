import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const UserProfile = () => {
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    const parsedUserData = userData ? JSON.parse(userData) : null;
    const userId = parsedUserData ? parsedUserData.id : null;

    if (userId) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`http://localhost:2402/api/Administrador/Administrador/${userId}`);
          if (response.ok) {
            const data = await response.json();
            setNombres(data.Nombres);
            setApellidos(data.Apellidos);
            setCorreo(data.Correo);
          } else {
            setError("Error al cargar los datos del usuario");
          }
        } catch (error) {
          setError("Error en la conexión con el servidor");
        }
      };

      fetchUserData();
    } else {
      setError("ID de usuario no encontrado");
    }
  }, []);

  const handleUpdate = async () => {
    const userData = localStorage.getItem("userData");
    const parsedUserData = userData ? JSON.parse(userData) : null;
    const userId = parsedUserData ? parsedUserData.id : null;

    if (userId) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: "¿Quieres actualizar los datos del usuario?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, actualizar',
        cancelButtonText: 'Cancelar',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await fetch(`http://localhost:2402/api/Administrador/Administrador/${userId}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ Nombres: nombres, Apellidos: apellidos, Correo: correo }),
            });

            if (response.ok) {
              toast.success("Datos actualizados correctamente");
              // Redirigir a la página principal después de la actualización
              window.location.href = '/';
            } else {
              const result = await response.json();
              toast.error(result.error || "Error al actualizar los datos");
            }
          } catch (error) {
            toast.error("Error al actualizar los datos");
          }
        }
      });
    } else {
      setError("ID de usuario no encontrado para la actualización");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex justify-center items-center"
      style={{ backgroundImage: 'url("/images/fond.png")' }}
    >
      <div className="bg-white shadow-2xl rounded-lg p-8 max-w-3xl w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          <i className="fas fa-user-circle"></i> Perfil de Usuario
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label htmlFor="nombres" className="block text-gray-700">Nombres</label>
            <input
              type="text"
              id="nombres"
              value={nombres}
              onChange={(e) => setNombres(e.target.value)}
              className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="apellidos" className="block text-gray-700">Apellidos</label>
            <input
              type="text"
              id="apellidos"
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
              className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="correo" className="block text-gray-700">Correo Electrónico</label>
            <input
              type="email"
              id="correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded transition duration-200"
              onClick={() => window.location.href = '/'} // Redirigir a la página principal
            >
              <i className="fas fa-times"></i> Cancelar
            </button>

            <button
              type="button"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-200"
              onClick={handleUpdate} // Llamar a la función de actualización
            >
              <i className="fas fa-save"></i> Actualizar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
