import { Link } from 'react-router-dom'
import { usePlayerContext } from '../context/PlayerContext'
import PlayerForm from '../components/PlayerForm'

const PlayerCreatePage = () => {
  const { addPlayer } = usePlayerContext()

  const handleSubmit = async (data) => {
    await addPlayer(data)
  }

  return (
    <div className="max-w-2xl mx-auto text-white">
      <div className="mb-6">
        <Link to="/players" className="text-blue-400 hover:text-blue-300">
          &larr; Volver a Jugadores
        </Link>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-white mb-6">
            Añadir Nuevo Jugador
          </h1>
          <PlayerForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  )
}

export default PlayerCreatePage
