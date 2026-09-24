import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchCollection('teams')
      .then(setTeams)
      .catch((err) => setError(err.message))
  }, [])

  return (
    <div className="container py-4">
      <h1 className="mb-4">Teams</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row g-3">
        {teams.map((team) => (
          <div className="col-md-4" key={team._id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{team.name}</h5>
                <p className="card-text">{team.description}</p>
                <p className="card-text">
                  <small className="text-body-secondary">
                    {(team.members ?? []).length} member(s)
                  </small>
                </p>
                <ul className="list-group list-group-flush">
                  {(team.members ?? []).map((member) => (
                    <li className="list-group-item" key={member._id}>
                      {member.name ?? member.username}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Teams
