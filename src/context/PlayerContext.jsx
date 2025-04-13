import { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import {
  getPlayers,
  createPlayer,
  updatePlayer,
  deletePlayer,
} from '../services/api'

const PlayerContext = createContext(undefined)

export const usePlayerContext = () => {
  const context = useContext(PlayerContext)
  if (!context) {
    throw new Error(
      'usePlayerContext debe ser usado dentro de un PlayerProvider'
    )
  }
  return context
}

export const PlayerProvider = ({ children }) => {
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchPlayers = async () => {
    setLoading(true)
    try {
      const data = await getPlayers()
      setPlayers(data)
      setError(null)
    } catch (err) {
      setError('Error al obtener jugadores')
      toast.error('Error al obtener jugadores')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const addPlayer = async (player) => {
    setLoading(true)
    try {
      const newPlayer = await createPlayer(player)
      setPlayers((prev) => [...prev, newPlayer])
      toast.success('¡Jugador añadido con éxito!')
      return newPlayer
    } catch (err) {
      setError('Error al añadir jugador')
      toast.error('Error al añadir jugador')
      console.error(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const editPlayer = async (id, player) => {
    setLoading(true)
    try {
      const updatedPlayer = await updatePlayer(id, player)
      setPlayers((prev) => prev.map((p) => (p.id === id ? updatedPlayer : p)))
      toast.success('¡Jugador actualizado con éxito!')
      return updatedPlayer
    } catch (err) {
      setError('Error al actualizar jugador')
      toast.error('Error al actualizar jugador')
      console.error(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const removePlayer = async (id) => {
    setLoading(true)
    try {
      await deletePlayer(id)
      setPlayers((prev) => prev.filter((p) => p.id !== id))
      toast.success('¡Jugador eliminado con éxito!')
    } catch (err) {
      setError('Error al eliminar jugador')
      toast.error('Error al eliminar jugador')
      console.error(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPlayers()
  }, [])

  return (
    <PlayerContext.Provider
      value={{
        players,
        loading,
        error,
        fetchPlayers,
        addPlayer,
        editPlayer,
        removePlayer,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}
