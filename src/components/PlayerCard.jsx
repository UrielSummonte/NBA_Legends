import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'

const PlayerCard = ({ player, onDelete }) => {
  const handleDelete = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres eliminar a ${player.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: '¡Sí, eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(player.id)
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        toast.info('Se canceló la accion')
      }
    })
  }

  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <div className="w-full h-[30rem] bg-gray-700 flex items-center justify-center overflow-hidden">
        {player.image_url ? (
          <img
            src={player.image_url || '/placeholder.svg'}
            alt={player.name}
            className="w-full h-full object-fill"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <p className="mt-2">Sin imagen</p>
          </div>
        )}
      </div>

      <div className="p-4 flex-grow">
        <h2 className="text-xl font-semibold">{player.name}</h2>
        <p className="text-gray-300">Posicion/es: {player.position}</p>
        <p className="text-gray-300">Equipo/s: {player.teams.join(', ')}</p>
        <p className="text-sm text-gray-400">
          Nacionalidad: {player.nationality}
        </p>
      </div>

      <div className="px-4 pb-4 mt-auto border-t border-gray-700 pt-3 flex justify-between">
        <Link
          to={`/players/${player.id}`}
          className="text-blue-400 hover:text-blue-500"
        >
          Ver Detalles
        </Link>
        <div className="space-x-2">
          <Link
            to={`/players/${player.id}/edit`}
            className="text-gray-300 hover:text-white cursor-pointer"
          >
            Editar
          </Link>
          <button
            onClick={handleDelete}
            className="text-red-400 hover:text-red-600"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}

export default PlayerCard
