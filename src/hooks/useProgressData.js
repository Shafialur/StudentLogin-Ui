// src/hooks/useProgressData.js
import { useState, useEffect, useMemo } from 'react'
import { fetchHeaderData } from '../utils/api'

const DEFAULT_PROGRESS = {
  progress_overview: {
    total_classes: 100,
    past_classes: 50,
    streak: 0,
    coins: 0,
    rank: null
  }
}

export const useProgressData = () => {
  const [progressData, setProgressData] = useState(DEFAULT_PROGRESS)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isCancelled = false

    const loadProgressData = async () => {
      try {
        // Check localStorage first, then environment variable
        const storedToken = localStorage.getItem('auth_token')
        const envToken = import.meta.env.VITE_TOKEN
        const tokenPresent = Boolean(storedToken || envToken)
        
        if (!tokenPresent) {
          // Skip network if no token; keep defaults for instant render
          return
        }

        setLoading(true)
        setError(null)
        const data = await fetchHeaderData()
        if (!isCancelled) {
          setProgressData(data)
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err.message)
          setProgressData(DEFAULT_PROGRESS)
        }
      } finally {
        if (!isCancelled) {
          setLoading(false)
        }
      }
    }

    loadProgressData()

    return () => {
      isCancelled = true
    }
  }, [])

  // Calculate progress percentage (memoized to avoid recalcs during animations)
  const progressPercentage = useMemo(() => {
    return progressData?.progress_overview?.total_classes > 0
      ? Math.round((progressData.progress_overview.past_classes / progressData.progress_overview.total_classes) * 100)
      : 0
  }, [progressData])

  return {
    progressData,
    loading,
    error,
    progressPercentage,
    totalClasses: progressData?.progress_overview?.total_classes || 0,
    pastClasses: progressData?.progress_overview?.past_classes || 0,
  }
}

