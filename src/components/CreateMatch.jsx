import { useState, useEffect } from 'react'
import axios from 'axios'

function CreateMatch() {
  const [tournaments, setTournaments] = useState([])
  const [teams, setTeams] = useState([])
  const [matches, setMatches] = useState([]) 
  const [tournamentId, setTournamentId] = useState('')
  const [team1Id, setTeam1Id] = useState('')
  const [team2Id, setTeam2Id] = useState('')
  const [winnerId, setWinnerId] = useState(null)
  const [isDrawing, setIsDrawing] = useState(false)

  useEffect(() => {
    axios.get('http://localhost:3001/tournaments')
      .then(response => {
        setTournaments(response.data)
      })
    axios.get('http://localhost:3001/teams')
      .then(response => {
        setTeams(response.data)
      })
    axios.get('http://localhost:3001/matchs') 
      .then(response => {
        setMatches(response.data) 
      })
  }, [])
  
  const handleSubmit = event => {
    event.preventDefault()
  
    axios.post('http://localhost:3001/matchs', { tournamentId, team1Id, team2Id })
      .then(response => {
        setTournamentId('')
        setTeam1Id('')
        setTeam2Id('')
        setIsDrawing(true) 
        setTimeout(() => {
          setWinnerId(response.data.winnerId) 
          setIsDrawing(false) 
        }, 2000 + Math.random() * 1000)
      })
  }

  const winnerTeam = teams.find(team => team.id === winnerId)

  return (
    <div className="min-h-screen bg-blue-400 bg-opacity-20 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded overflow-hidden shadow-lg p-6 space-y-10">
        <h1 className="text-4xl font-bold text-center">Create Match</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <select value={tournamentId} onChange={e => setTournamentId(e.target.value)} required 
            className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:shadow-outline">
            <option value="">Select Tournament</option>
            {tournaments.map(tournament => (
              <option key={tournament.id} value={tournament.id}>{tournament.name}</option>
            ))}
          </select>
          <select value={team1Id} onChange={e => setTeam1Id(e.target.value)} required 
            className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:shadow-outline">
            <option value="">Select Team 1</option>
            {teams.map(team => (
              <option key={team.id} value={team.id}>{team.name}</option>
            ))}
          </select>
          <select value={team2Id} onChange={e => setTeam2Id(e.target.value)} required 
            className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:shadow-outline">
            <option value="">Select Team 2</option>
            {teams.map(team => (
              <option key={team.id} value={team.id}>{team.name}</option>
            ))}
          </select>
          <button type="submit" className="w-full px-3 py-2 text-white bg-blue-600 rounded hover:bg-blue-500">Create Match</button>
        </form>
        {isDrawing ? <p>Drawing...</p> : winnerTeam && <p className="text-center font-bold">The winner is: {winnerTeam.name}</p>}
        <h2 className="text-2xl font-bold text-center">Matches</h2>
        <ul className="space-y-4">
          {matches.map(match => {
            const team1 = teams.find(team => team.id === match.team1Id)
            const team2 = teams.find(team => team.id === match.team2Id)
            const winner = teams.find(team => team.id === match.winnerId)
            if (!team1 || !team2 || !winner) {
              return null
            }
            return (
              <li key={match.id} className="flex justify-between items-center border-b pb-2">
                {team1.name} vs {team2.name} - Winner: {winner.name}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default CreateMatch