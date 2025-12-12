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

/**
 * Add child to join queue using 6-digit code
 */
export const addChildToJoinQueue = async (code) => {
  try {
    const token = getAuthToken()
    
    if (!token) {
      throw new Error('No authentication token found in environment variables')
    }

    if (!code || !/^[a-z0-9]{6}$/i.test(code)) {
      throw new Error('Invalid 6-digit code')
    }

    const response = await fetch(`${API_BASE_URL}/parent-panel/add-child-in-join-queue/${code}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `API Error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    
    if (data.success) {
      return data
    } else {
      throw new Error(data.message || 'Failed to add child to join queue')
    }
  } catch (error) {
    console.error('Error adding child to join queue:', error)
    throw error
  }
}

/**
 * Check if class started
 */
export const checkIfClassStarted = async (code) => {
  try {
    const token = getAuthToken()
    
    if (!token) {
      throw new Error('No authentication token found in environment variables')
    }

    if (!code || !/^[a-z0-9]{6}$/i.test(code)) {
      throw new Error('Invalid 6-digit code')
    }

    const response = await fetch(`${API_BASE_URL}/parent-panel/check-if-class-started/${code}/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `API Error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error checking class status:', error)
    throw error
  }
}

