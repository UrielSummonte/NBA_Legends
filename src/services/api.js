import axios from "axios"

const API_URL = "https://67efd2792a80b06b8895e6b5.mockapi.io/api/v1"

const api = axios.create({
  baseURL: API_URL,
})

export const getPlayers = async () => {
  try {
    const response = await api.get("/players")
    return response.data
  } catch (error) {
    console.error("Error al obtener los jugadores:", error)
    throw error
  }
}

export const getPlayer = async (id) => {
  try {
    const response = await api.get(`/players/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error al obtener el jugador con ID ${id}:`, error)
    throw error
  }
}

export const createPlayer = async (player) => {
  try {
    const response = await api.post("/players", player)
    return response.data
  } catch (error) {
    console.error("Error al crear el jugador:", error)
    throw error
  }
}

export const updatePlayer = async (id, player) => {
  try {
    const response = await api.put(`/players/${id}`, player)
    return response.data
  } catch (error) {
    console.error(`Error al actualizar el jugador con ID ${id}:`, error)
    throw error
  }
}

export const deletePlayer = async (id) => {
  try {
    await api.delete(`/players/${id}`)
  } catch (error) {
    console.error(`Error al eliminar el jugador con ID ${id}:`, error)
    throw error
  }
}

