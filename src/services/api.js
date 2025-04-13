import axios from "axios"

const API_URL = "https://67efd2792a80b06b8895e6b5.mockapi.io/api/v1"

const api = axios.create({
  baseURL: API_URL,
})

export const getPlayers = async () => {
  const response = await api.get("/players")
  return response.data
}

export const getPlayer = async (id) => {
  const response = await api.get(`/players/${id}`)
  return response.data
}

export const createPlayer = async (player) => {
  const response = await api.post("/players", player)
  return response.data
}

export const updatePlayer = async (id, player) => {
  const response = await api.put(`/players/${id}`, player)
  return response.data
}

export const deletePlayer = async (id) => {
  await api.delete(`/players/${id}`)
}

