// Backend responses may be a plain array or a paginated object like { results: [...] }.
export function toArray(data) {
  if (Array.isArray(data)) {
    return data
  }
  if (data && Array.isArray(data.results)) {
    return data.results
  }
  if (data && Array.isArray(data.data)) {
    return data.data
  }
  return []
}

export async function fetchCollection(endpoint) {
  const response = await fetch(endpoint)
  if (!response.ok) {
    throw new Error(`Request to ${endpoint} failed with status ${response.status}`)
  }
  const data = await response.json()
  return toArray(data)
}
