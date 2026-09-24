import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
// Falls back to localhost when VITE_CODESPACE_NAME is unset, avoiding an https://undefined-8000... URL.
const WORKOUTS_ENDPOINT = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchCollection(WORKOUTS_ENDPOINT)
      .then(setWorkouts)
      .catch((err) => setError(err.message))
  }, [])

  return (
    <div className="container py-4">
      <h1 className="mb-4">Workouts</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row g-3">
        {workouts.map((workout) => (
          <div className="col-md-4" key={workout._id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{workout.title}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary text-capitalize">
                  {workout.difficulty}
                </h6>
                <p className="card-text">{workout.description}</p>
                <ul className="list-group list-group-flush">
                  {(workout.exercises ?? []).map((exercise) => (
                    <li className="list-group-item" key={exercise}>
                      {exercise}
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

export default Workouts
