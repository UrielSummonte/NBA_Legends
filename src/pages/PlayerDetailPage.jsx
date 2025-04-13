import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { getPlayer } from '../services/api'
import { usePlayerContext } from '../context/PlayerContext'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const PlayerDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { removePlayer } = usePlayerContext()
  const [player, setPlayer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const statLabels = {
    points_per_game: 'Puntos por partido',
    rebounds_per_game: 'Rebotes por partido',
    assists_per_game: 'Asistencias por partido',
    steals_per_game: 'Robos por partido',
    field_goal_percentage: 'Porcentaje de tiro',
  }

  useEffect(() => {
    const fetchPlayerData = async () => {
      if (!id) return

      try {
        setLoading(true)
        const data = await getPlayer(id)
        setPlayer(data)
      } catch (err) {
        setError('Error al obtener detalles del jugador')
        toast.error('Error al obtener detalles del jugador')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchPlayerData()
  }, [id])

  const handleDelete = () => {
    if (!player) return

    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres eliminar a ${player.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: '¡Sí, eliminar!',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed && id) {
        try {
          await removePlayer(id)
          navigate('/players')
        } catch (err) {
          console.error(err)
        }
      }
    })
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (error || !player) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">{error || 'Jugador no encontrado'}</p>
        <Link
          to="/players"
          className="px-4 py-2 rounded-md font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700"
        >
          Volver a Jugadores
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto text-white">
      <div className="mb-6">
        <Link to="/players" className="text-blue-400 hover:text-blue-300">
          &larr; Volver a Jugadores
        </Link>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6 bg-blue-900 text-white">
          <h1 className="text-3xl font-bold">{player.name}</h1>
          <p className="text-blue-300 mt-1">{player.position}</p>
        </div>

        <div className="md:flex">
          <div className="md:w-2/5 p-6 flex items-center justify-center bg-gray-900">
            {player.image_url ? (
              <img
                src={player.image_url}
                alt={player.name}
                className="w-4/5 max-h-96 object-fill rounded-md shadow-md"
              />
            ) : (
              <div className="w-full h-64 bg-gray-700 flex flex-col items-center justify-center text-gray-400 rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-24 w-24"
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
                <p className="mt-4 text-lg">Sin imagen disponible</p>
              </div>
            )}
          </div>

          <div className="md:w-3/5 p-6 md:border-l border-gray-700 bg-gray-800">
            <h2 className="text-xl font-semibold text-white mb-4 pb-2 border-b border-gray-600">
              Estadísticas del Jugador
            </h2>

            <div className="space-y-4">
              <div className="flex flex-col">
                <div className="flex justify-between py-2">
                  <span className="font-medium text-gray-400">Nombre:</span>
                  <span className="text-white">{player.name}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium text-gray-400">
                    Fecha de nacimiento:
                  </span>
                  <span className="text-white">{new Date(player.date_of_birth).toLocaleDateString('es-ES')}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium text-gray-400">Posición:</span>
                  <span className="text-white">{player.position}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium text-gray-400">Equipos:</span>
                  <span className="text-white">
                  {player.teams?.length ? player.teams.join(', ') : 'Sin equipos'}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium text-gray-400">
                    Nacionalidad:
                  </span>
                  <span className="text-white">{player.nationality}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium text-gray-400">Títulos:</span>
                  <span className="text-white">
                  {player.titles?.length ? player.titles.join(', ') : 'Sin títulos'}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium text-gray-400">
                    Estadísticas:
                  </span>
                  <div className="flex flex-col">
                    {player.stats && Object.entries(player.stats).map(([key, value]) => (
                      <span key={key}>
                        {statLabels[key] || key}: {value}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-900 border-t border-gray-700 flex justify-end space-x-3">
          <Link
            to={`/players/${player.id}/edit`}
            className="px-4 py-2 rounded-md font-medium transition-colors bg-gray-700 text-white hover:bg-gray-600"
          >
            Editar
          </Link>
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-md font-medium transition-colors bg-red-600 text-white hover:bg-red-700 cursor-pointer"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}

export default PlayerDetailPage
