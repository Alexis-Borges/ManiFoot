import { useState, useEffect } from 'react'
import axios from 'axios'

function CreateTournament() {
  const [name, setName] = useState('')
  const [sport, setSport] = useState('')
  const [tournaments, setTournaments] = useState([]) 

  useEffect(() => {
    fetchTournaments()
  }, [])

  const fetchTournaments = () => {
    axios.get('http://localhost:3001/tournaments')
      .then(response => {
        setTournaments(response.data) 
      })
  }

  const handleSubmit = event => {
    event.preventDefault()
  
    axios.post('http://localhost:3001/tournaments', { name, sport })
      .then(() => {
        setName('')
        setSport('')
        fetchTournaments()
      })
  }

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/tournaments/${id}`)
      .then(() => {
        fetchTournaments()
      })
  }

  return (
    <div className="min-h-screen bg-blue-400 bg-opacity-20 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded overflow-hidden shadow-lg p-6 space-y-10">
        <h1 className="text-4xl font-bold text-center">Create Tournament</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Tournament Name" required 
            className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:shadow-outline"/>
          <input type="text" value={sport} onChange={e => setSport(e.target.value)} placeholder="Sport" required 
            className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:shadow-outline"/>
          <button type="submit" className="w-full px-3 py-2 text-white bg-blue-600 rounded hover:bg-blue-500">Create Tournament</button>
        </form>
        <h2 className="text-2xl font-bold text-center">Tournaments</h2>
        <ul className="space-y-4">
          {tournaments.map(tournament => (
            <li key={tournament.id} className="flex justify-between items-center border-b pb-2">
              <span>{tournament.name} - {tournament.sport}</span>
              <button onClick={() => handleDelete(tournament.id)} className="text-white bg-red-500 rounded px-2 py-1 hover:bg-red-400">Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default CreateTournament