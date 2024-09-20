import React from 'react';


export interface Parqueadero {
    id: string;
    ImagenPortada?: string | null;  
    Nombre?: string | null;
    Direccion?: string | null;
    TarifaHora?: number | null;
    TarifaDia?: number | null;
    TarifaMensual?: number | null;
}

interface ParqueaderosProps {
    parqueaderos: Parqueadero[];
}

const Parqueaderos: React.FC<ParqueaderosProps> = ({ parqueaderos }) => {
    console.log("Datos de parqueaderos:", parqueaderos);

    const handleDetailsClick = (parqueadero: Parqueadero) => {
        window.location.href = `/Folleto?id=${parqueadero.id}`;
    };

    return (
        <div className="w-full bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
        <a href="/" className="text-gray-600 hover:text-blue-600 text-lg flex items-center mr-4">
          <i className="fas fa-arrow-left mr-2"></i> Volver
        </a>
        <h1 className="text-4xl font-bold text-gray-800 flex-1 text-center mb-4">Parqueaderos Disponibles</h1>
      </div> 
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {parqueaderos.length > 0 ? (
                    parqueaderos.map((parqueadero, index) => (
                        <div 
                            key={index} 
                            className="bg-gray-100 rounded-lg shadow-md p-4 flex flex-col cursor-pointer" 
                            onClick={() => handleDetailsClick(parqueadero)} 
                        >
                            <div className="flex-grow mb-4">
                                {parqueadero.ImagenPortada ? (
                                    <img 
                                        src={`http://localhost:2402/uploads/${parqueadero.ImagenPortada}`} 
                                        className="w-full h-40 rounded-lg object-cover mb-4" 
                                        alt={parqueadero.Nombre || "Imagen de parqueadero"} 
                                    />
                                ) : (
                                    <div className="w-full h-40 rounded-lg bg-gray-200 flex items-center justify-center mb-4">
                                        <span>Cargando imagen...</span>
                                    </div>
                                )}
                                <h3 className="text-xl font-semibold">{parqueadero.Nombre || "Nombre no disponible"}</h3>
                                <p><strong>Dirección:</strong> {parqueadero.Direccion || "Dirección no disponible"}</p>
                                <p><strong>Tarifa por hora:</strong> {parqueadero.TarifaHora ? `$${parqueadero.TarifaHora}` : "Tarifa no disponible"}</p>
                                <p><strong>Tarifa por día:</strong> {parqueadero.TarifaDia ? `$${parqueadero.TarifaDia}` : "Tarifa no disponible"}</p>
                                <p><strong>Tarifa mensual:</strong> {parqueadero.TarifaMensual ? `$${parqueadero.TarifaMensual}` : "Tarifa no disponible"}</p>
                            </div>
                            <div className="flex justify-center">
                            <button 
    onClick={() => handleDetailsClick(parqueadero)} 
    className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-105"
>
    Detalles
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

export default Parqueaderos;
