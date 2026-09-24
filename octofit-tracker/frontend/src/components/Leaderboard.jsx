import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
// Falls back to localhost when VITE_CODESPACE_NAME is unset, avoiding an https://undefined-8000... URL.
const LEADERBOARD_ENDPOINT = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchCollection(LEADERBOARD_ENDPOINT)
      .then(setEntries)
      .catch((err) => setError(err.message))
  }, [])

  return (
    <div className="container py-4">
      <h1 className="mb-4">Leaderboard</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Team</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry._id}>
                <td>{entry.rank ?? '—'}</td>
                <td>{entry.user?.name ?? entry.user?.username ?? '—'}</td>
                <td>{entry.team?.name ?? '—'}</td>
                <td>{entry.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Leaderboard
