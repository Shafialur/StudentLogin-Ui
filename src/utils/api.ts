// src/utils/api.ts
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

if (!apiBaseUrl) {
  throw new Error('VITE_API_BASE_URL is not set in the environment.')
}

export const API_BASE_URL: string = apiBaseUrl

interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
}

interface HeaderData {
  progress_overview: {
    total_classes: number
    past_classes: number
    streak: number
    coins: number
    rank: number | null
  }
}

interface JoinQueueResponse {
  success: boolean
  message?: string
}

interface ClassStatusResponse {
  success: boolean
  started: boolean
  join_url: string | null
  message?: string
}

interface LastSessionDetails {
  last_class?: {
    classschedule_booking_id?: number
    classschedule_id?: number
    class_date?: string
    start_time?: string
    end_time?: string
    ppt?: {
      iframe_src?: string
    }
    homework?: unknown
    attendance_status?: string
  }
}

/**
 * Get bearer token from localStorage first, then fallback to environment variable
 */
const getAuthToken = (): string | undefined => {
  return localStorage.getItem('auth_token') || import.meta.env.VITE_TOKEN
}

/**
 * Fetch header data from API
 */
export const fetchHeaderData = async (): Promise<HeaderData> => {
  const token = getAuthToken()
  
  if (!token) {
    throw new Error('No authentication token found')
  }

  try {
    const response = await fetch(`${API_BASE_URL}/parent-panel/header`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorData: ApiResponse<never> = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `API Error: ${response.status} ${response.statusText}`)
    }

    const data: ApiResponse<HeaderData> = await response.json()
    
    if (data.success && data.data) {
      return data.data
    }
    
    throw new Error(data.message || 'Failed to fetch header data')
  } catch (error) {
    console.error('Error fetching header data:', error)
    throw error instanceof Error ? error : new Error('Failed to fetch header data')
  }
}

/**
 * Add child to join queue using 6-digit code
 */
export const addChildToJoinQueue = async (code: string): Promise<JoinQueueResponse> => {
  const token = getAuthToken()
  
  if (!token) {
    throw new Error('No authentication token found')
  }

  if (!code || !/^[a-z0-9]{6}$/i.test(code)) {
    throw new Error('Invalid 6-digit code')
  }

  try {
    const response = await fetch(`${API_BASE_URL}/parent-panel/add-child-in-join-queue/${code}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorData: ApiResponse<never> = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `API Error: ${response.status} ${response.statusText}`)
    }

    const data: JoinQueueResponse = await response.json()
    
    if (data.success) {
      return data
    }
    
    throw new Error(data.message || 'Failed to add child to join queue')
  } catch (error) {
    console.error('Error adding child to join queue:', error)
    throw error instanceof Error ? error : new Error('Failed to add child to join queue')
  }
}

/**
 * Check if class started
 */
export const checkIfClassStarted = async (code: string): Promise<ClassStatusResponse> => {
  const token = getAuthToken()
  
  if (!token) {
    throw new Error('No authentication token found')
  }

  if (!code || !/^[a-z0-9]{6}$/i.test(code)) {
    throw new Error('Invalid 6-digit code')
  }

  try {
    const response = await fetch(`${API_BASE_URL}/parent-panel/check-if-class-started/${code}/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorData: ApiResponse<never> = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `API Error: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error checking class status:', error)
    throw error instanceof Error ? error : new Error('Failed to check class status')
  }
}

/**
 * Fetch last session details
 */
export const fetchLastSessionDetails = async (code: string): Promise<LastSessionDetails> => {
  const token = getAuthToken()
  
  if (!token) {
    throw new Error('No authentication token found')
  }

  if (!code || !/^[a-z0-9]{6}$/i.test(code)) {
    throw new Error('Invalid 6-digit code')
  }

  try {
    const response = await fetch(`${API_BASE_URL}/parent-panel/last_session_details?code=${code}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorData: ApiResponse<never> = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `API Error: ${response.status} ${response.statusText}`)
    }

    const data: ApiResponse<LastSessionDetails> = await response.json()
    
    if (data.success && data.data) {
      return data.data
    }
    
    throw new Error(data.message || 'Failed to fetch last session details')
  } catch (error) {
    console.error('Error fetching last session details:', error)
    throw error instanceof Error ? error : new Error('Failed to fetch last session details')
  }
}

interface FacultyIdResponse {
  success: boolean
  message?: string
  data?: {
    faculty_id: string
  }
}

/**
 * Get faculty ID by class schedule ID
 */
export const getFacultyId = async (classscheduleId: number): Promise<string> => {
  try {
    const token = getAuthToken()
    
    if (!token) {
      throw new Error('No authentication token found')
    }

    if (!classscheduleId) {
      throw new Error('Class schedule ID is required')
    }

    // Note: This API uses a different base URL
    const response = await fetch(`http://localhost:3000/api/faculty/get-faculty-id?classschedule_id=${classscheduleId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorData: ApiResponse<never> = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `API Error: ${response.status} ${response.statusText}`)
    }

    const data: FacultyIdResponse = await response.json()
    
    if (data.success && data.data?.faculty_id) {
      return data.data.faculty_id
    } else {
      throw new Error(data.message || 'Failed to get faculty ID')
    }
  } catch (error) {
    console.error('Error getting faculty ID:', error)
    throw error
  }
}

interface HomeworkSubmitResponse {
  success: boolean
  message?: string
  data?: unknown
}

/**
 * Submit homework
 */
export const submitHomework = async (
  files: File[],
  classscheduleBookingId: number,
  facultyId: string,
  onProgress?: (progress: number) => void
): Promise<HomeworkSubmitResponse> => {
  try {
    const token = getAuthToken()
    
    if (!token) {
      throw new Error('No authentication token found')
    }

    if (!files || files.length === 0) {
      throw new Error('At least one file is required')
    }

    if (files.length > 10) {
      throw new Error('Maximum 10 files allowed')
    }

    if (!classscheduleBookingId) {
      throw new Error('Class schedule booking ID is required')
    }

    if (!facultyId) {
      throw new Error('Faculty ID is required')
    }

    const formData = new FormData()
    
    // Append all files
    files.forEach((file) => {
      formData.append('files', file)
    })
    
    // Append other fields - ensure classschedulebooking_id is a string (no underscore in field name)
    formData.append('classschedulebooking_id', String(classscheduleBookingId))
    formData.append('faculty_id', String(facultyId))

    // Note: This API uses a different base URL
    const xhr = new XMLHttpRequest()

    return new Promise((resolve, reject) => {
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable && onProgress) {
          const progress = Math.round((e.loaded / e.total) * 100)
          onProgress(progress)
        }
      })

      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const data: HomeworkSubmitResponse = JSON.parse(xhr.responseText)
            resolve(data)
          } catch (error) {
            reject(new Error('Failed to parse response'))
          }
        } else {
          try {
            const errorData: ApiResponse<never> = JSON.parse(xhr.responseText)
            reject(new Error(errorData.message || `API Error: ${xhr.status} ${xhr.statusText}`))
          } catch {
            reject(new Error(`API Error: ${xhr.status} ${xhr.statusText}`))
          }
        }
      })

      xhr.addEventListener('error', () => {
        reject(new Error('Network error occurred'))
      })

      xhr.addEventListener('abort', () => {
        reject(new Error('Upload cancelled'))
      })

      xhr.open('POST', 'http://localhost:3000/api/homework/submit')
      xhr.setRequestHeader('Authorization', `Bearer ${token}`)
      xhr.send(formData)
    })
  } catch (error) {
    console.error('Error submitting homework:', error)
    throw error
  }
}

