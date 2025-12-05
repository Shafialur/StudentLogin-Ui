// src/hooks/useProgressData.js
import { useState, useEffect } from 'react'
import { fetchHeaderData } from '../utils/api'

export const useProgressData = () => {
  const [progressData, setProgressData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadProgressData = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchHeaderData()
        setProgressData(data)
      } catch (err) {
        setError(err.message)
        // Set default values on error
        setProgressData({
          progress_overview: {
            total_classes: 50,
            past_classes: 100,
            streak: 0,
            coins: 0,
            rank: null
          }
        })
      } finally {
        setLoading(false)
      }
    }

    loadProgressData()
  }, [])

  // Calculate progress percentage
  const progressPercentage = progressData?.progress_overview?.total_classes > 0
    ? Math.round((progressData.progress_overview.past_classes / progressData.progress_overview.total_classes) * 100)
    : 0

  return {
    progressData,
    loading,
    error,
    progressPercentage,
    totalClasses: progressData?.progress_overview?.total_classes || 0,
    pastClasses: progressData?.progress_overview?.past_classes || 0,
  }
}

