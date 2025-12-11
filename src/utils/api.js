// src/utils/api.js
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

if (!apiBaseUrl) {
  throw new Error('VITE_API_BASE_URL is not set in the environment.')
}

export const API_BASE_URL = apiBaseUrl

/**
 * Get bearer token from environment variable
 */
const getAuthToken = () => {
  return import.meta.env.VITE_TOKEN
}

/**
 * Fetch header data from API
 */
export const fetchHeaderData = async () => {
  try {
    const token = getAuthToken()
    
    if (!token) {
      throw new Error('No authentication token found in environment variables')
    }

    const response = await fetch(`${API_BASE_URL}/parent-panel/header`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    
    if (data.success && data.data) {
      return data.data
    } else {
      throw new Error(data.message || 'Failed to fetch header data')
    }
  } catch (error) {
    console.error('Error fetching header data:', error)
    throw error
  }
}

