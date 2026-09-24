const codespaceName = import.meta.env.VITE_CODESPACE_NAME

// Falls back to localhost when VITE_CODESPACE_NAME is unset, avoiding a broken https://undefined-8000... URL.
export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function apiUrl(component) {
  return `${API_BASE_URL}/api/${component}/`
}

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

export async function fetchCollection(component) {
  const response = await fetch(apiUrl(component))
  if (!response.ok) {
    throw new Error(`Request to ${component} failed with status ${response.status}`)
  }
  const data = await response.json()
  return toArray(data)
}
