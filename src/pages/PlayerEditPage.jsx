import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { usePlayerContext } from '../context/PlayerContext'
import { getPlayer } from '../services/api'
import PlayerForm from '../components/PlayerForm'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const PlayerEditPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { editPlayer } = usePlayerContext()
  const [player, setPlayer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  const handleSubmit = async (data) => {
    if (!id) return
    await editPlayer(id, data)
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
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link to={`/players/${id}`} className="text-blue-600 hover:text-blue-800">
          &larr; Volver a Detalles del Jugador
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Editar Jugador: {player.name}
          </h1>
          <PlayerForm
            initialData={player}
            onSubmit={handleSubmit}
            isEditing={true}
          />
        </div>
      </div>
    </div>
  )
}

export default PlayerEditPage
