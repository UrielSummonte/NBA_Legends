import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const PlayerForm = ({ initialData = {}, onSubmit, isEditing = false }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    date_of_birth: initialData.date_of_birth || '',
    position: initialData.position || '',
    nationality: initialData.nationality || '',
    teams: initialData.teams || [],
    titles: initialData.titles || [],
    stats: initialData.stats || {
      points_per_game: '',
      rebounds_per_game: '',
      assists_per_game: '',
      steals_per_game: '',
      field_goal_percentage: '',
    },
    image_url: initialData.image_url || '',
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [teamsInput, setTeamsInput] = useState(
    initialData.teams?.join(', ') || ''
  )
  const [titlesInput, setTitlesInput] = useState(
    initialData.titles?.join(', ') || ''
  )

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio'
    }
    if (!formData.date_of_birth) {
      newErrors.date_of_birth = 'La fecha de nacimiento es obligatoria'
    }
    if (!formData.position.trim()) {
      newErrors.position = 'La posición es obligatoria'
    }
    if (!formData.nationality.trim()) {
      newErrors.nationality = 'La nacionalidad es obligatoria'
    }
    if (!formData.teams || formData.teams.length === 0) {
      newErrors.teams = 'Debe ingresar al menos un equipo'
    }
    if (!formData.titles || formData.titles.length === 0) {
      newErrors.titles = 'Debe ingresar al menos un título'
    }

    const statsErrors = {}
    Object.entries(formData.stats).forEach(([key, value]) => {
      if (value === '' || isNaN(value)) {
        statsErrors[key] = 'Campo obligatorio o inválido'
      }
    })
    if (Object.keys(statsErrors).length > 0) {
      newErrors.stats = statsErrors
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    if (['name', 'nationality'].includes(name)) {
      const valid = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]*$/.test(value)
      if (!valid) return
    }

    if (name === 'position') {
      const valid = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s/]*$/.test(value)
      if (!valid) return
    }

    if (name.startsWith('stats.')) {
      const statKey = name.split('.')[1]
      const regex = /^[0-9]+(\.[0-9]{0,1})?$/
      if (regex.test(value) || value === '') {
        setFormData((prev) => ({
          ...prev,
          stats: {
            ...prev.stats,
            [statKey]: value,
          },
        }))
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      await onSubmit(formData)
      if (!isEditing) {
        setFormData({
          name: '',
          date_of_birth: '',
          position: '',
          nationality: '',
          teams: [],
          titles: [],
          stats: {
            points_per_game: '',
            rebounds_per_game: '',
            assists_per_game: '',
            steals_per_game: '',
            field_goal_percentage: '',
          },
          image_url: '',
        })
        setTeamsInput('')
        setTitlesInput('')
      }
      navigate('/players')
    } catch (error) {
      console.error('Error al enviar formulario:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-gray-900 p-6 rounded-lg shadow-lg"
    >
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-white mb-1"
        >
          Nombre
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-3 py-2 border ${
            errors.name ? 'border-red-500' : 'border-gray-600'
          } rounded-md bg-gray-800 text-white`}
          disabled={isSubmitting}
        />
        {errors.name && (
          <p className="text-sm text-red-500 mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="date_of_birth"
          className="block text-sm font-medium text-white mb-1"
        >
          Fecha de Nacimiento
        </label>
        <input
          type="date"
          name="date_of_birth"
          id="date_of_birth"
          value={formData.date_of_birth}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-white"
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label
          htmlFor="position"
          className="block text-sm font-medium text-white mb-1"
        >
          Posición
        </label>
        <input
          type="text"
          name="position"
          id="position"
          value={formData.position}
          onChange={handleChange}
          className={`w-full px-3 py-2 border ${
            errors.position ? 'border-red-500' : 'border-gray-600'
          } rounded-md bg-gray-800 text-white`}
          disabled={isSubmitting}
        />
        {errors.position && (
          <p className="text-sm text-red-500 mt-1">{errors.position}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="nationality"
          className="block text-sm font-medium text-white mb-1"
        >
          Nacionalidad
        </label>
        <input
          type="text"
          name="nationality"
          id="nationality"
          value={formData.nationality}
          onChange={handleChange}
          className={`w-full px-3 py-2 border ${
            errors.nationality ? 'border-red-500' : 'border-gray-600'
          } rounded-md bg-gray-800 text-white`}
          disabled={isSubmitting}
        />
        {errors.nationality && (
          <p className="text-sm text-red-500 mt-1">{errors.nationality}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="teams"
          className="block text-sm font-medium text-white mb-1"
        >
          Equipos (separados por coma)
        </label>
        <input
          type="text"
          name="teams"
          id="teams"
          value={teamsInput}
          onChange={(e) => {
            const cleaned = e.target.value.replace(
              /[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9 ,]/g,
              ''
            )
            setTeamsInput(cleaned)
          }}
          onBlur={() =>
            setFormData({
              ...formData,
              teams: teamsInput
                .split(',')
                .map((t) => t.trim())
                .filter((t) => t.length > 0),
            })
          }
          className={`w-full px-3 py-2 border ${
            errors.teams ? 'border-red-500' : 'border-gray-600'
          } rounded-md bg-gray-800 text-white`}
          disabled={isSubmitting}
        />
        {errors.teams && (
          <p className="text-sm text-red-500 mt-1">{errors.teams}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="titles"
          className="block text-sm font-medium text-white mb-1"
        >
          Títulos (separados por coma)
        </label>
        <input
          type="text"
          name="titles"
          id="titles"
          value={titlesInput}
          onChange={(e) => {
            const cleaned = e.target.value.replace(
              /[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9 ,]/g,
              ''
            )
            setTitlesInput(cleaned)
          }}
          onBlur={() =>
            setFormData({
              ...formData,
              titles: titlesInput
                .split(',')
                .map((t) => t.trim())
                .filter((t) => t.length > 0),
            })
          }
          className={`w-full px-3 py-2 border ${
            errors.titles ? 'border-red-500' : 'border-gray-600'
          } rounded-md bg-gray-800 text-white`}
          disabled={isSubmitting}
        />
        {errors.titles && (
          <p className="text-sm text-red-500 mt-1">{errors.titles}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-1">
          Estadísticas
        </label>
        <div className="flex flex-wrap gap-4">
          {[
            { id: 'points_per_game', label: 'Puntos/J' },
            { id: 'rebounds_per_game', label: 'Rebotes/J' },
            { id: 'assists_per_game', label: 'Asistencias/J' },
            { id: 'steals_per_game', label: 'Robos/J' },
            { id: 'field_goal_percentage', label: 'FG%' },
          ].map(({ id, label }) => (
            <div key={id} className="flex flex-col w-32">
              <label
                htmlFor={id}
                className="text-sm font-medium text-gray-300 mb-1"
              >
                {label}
              </label>
              <input
                type="text"
                name={`stats.${id}`}
                id={id}
                value={formData.stats[id]}
                onChange={handleChange}
                step="0.1"
                min="0"
                className={`px-2 py-1 border ${
                  errors?.stats?.[id] ? 'border-red-500' : 'border-gray-600'
                } rounded-md text-sm bg-gray-800 text-white`}
                disabled={isSubmitting}
              />
              {errors?.stats?.[id] && (
                <p className="text-xs text-red-500 mt-1">{errors.stats[id]}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="image_url"
          className="block text-sm font-medium text-white mb-1"
        >
          URL de Imagen (opcional)
        </label>
        <input
          type="text"
          name="image_url"
          id="image_url"
          value={formData.image_url}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-800 text-white"
          disabled={isSubmitting}
          placeholder="https://ejemplo.com/imagen.jpg"
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={() => navigate('/players')}
          className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white border border-gray-500 cursor-pointer"
          disabled={isSubmitting}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
          disabled={isSubmitting}
        >
          {isEditing ? 'Actualizar' : 'Crear'} Jugador
        </button>
      </div>
    </form>
  )
}

export default PlayerForm
