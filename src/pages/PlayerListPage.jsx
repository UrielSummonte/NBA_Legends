import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { usePlayerContext } from '../context/PlayerContext'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import PlayerCard from '../components/PlayerCard'

const PlayerListPage = () => {
  const { players, loading, error, fetchPlayers, removePlayer } =
    usePlayerContext()

  useEffect(() => {
    fetchPlayers()
  }, [])

  const handleDelete = (id) => {
    removePlayer(id)
  }

  if (loading && players.length === 0) {
    return <LoadingSpinner />
  }

  if (error && players.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-red-400 mb-4">{error}</p>
        <button
          onClick={() => fetchPlayers()}
          className="px-4 py-2 rounded-md font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700"
        >
          Intentar de Nuevo
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white font-nba">
          Lista de Legendas de la NBA
        </h1>
        <Link
          to="/players/create"
          className="px-4 py-2 rounded-md font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700"
        >
          Añadir Nuevo Jugador
        </Link>
      </div>

      {players.length === 0 ? (
        <div className="text-center py-8 bg-gray-800 rounded-lg shadow">
          <p className="text-gray-400">No se encontraron jugadores.</p>
          <Link
            to="/players/create"
            className="px-4 py-2 rounded-md font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700 mt-4 inline-block"
          >
            Añade tu Primer Jugador
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {players.map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default PlayerListPage
