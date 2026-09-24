import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
// Falls back to localhost when VITE_CODESPACE_NAME is unset, avoiding an https://undefined-8000... URL.
const ACTIVITIES_ENDPOINT = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchCollection(ACTIVITIES_ENDPOINT)
      .then(setActivities)
      .catch((err) => setError(err.message))
  }, [])

  return (
    <div className="container py-4">
      <h1 className="mb-4">Activities</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>User</th>
              <th>Type</th>
              <th>Duration (min)</th>
              <th>Calories burned</th>
              <th>Completed at</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id}>
                <td>{activity.user?.name ?? activity.user?.username ?? '—'}</td>
                <td>{activity.type}</td>
                <td>{activity.durationMinutes}</td>
                <td>{activity.caloriesBurned}</td>
                <td>{activity.completedAt ? new Date(activity.completedAt).toLocaleString() : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Activities
