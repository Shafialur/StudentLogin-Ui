import { useState, useEffect, useRef } from 'react'
import { addChildToJoinQueue, checkIfClassStarted } from '../utils/api'

export const useJoinQueue = (code?: string) => {
  const [showToast, setShowToast] = useState<boolean>(false)
  const [isJoining, setIsJoining] = useState<boolean>(false)
  const [pollingId, setPollingId] = useState<NodeJS.Timeout | null>(null)
  const hasOpenedLink = useRef<boolean>(false)

  const handleJoinNow = async (): Promise<void> => {
    if (!code) {
      alert('Class verification code is not available. Please try again later.')
      return
    }

    setIsJoining(true)
    try {
      const startedCheck = await checkIfClassStarted(code)
      if (startedCheck?.success && startedCheck?.started && startedCheck?.join_url) {
        // User clicked button - always open in new tab (user-initiated action works better)
        window.open(startedCheck.join_url, '_blank', 'noopener')
        return
      }

      await addChildToJoinQueue(code)
      setShowToast(true)

      // Optimized polling: start with 5s, then increase to 15s after first check
      let pollCount = 0
      let currentPollId: NodeJS.Timeout | null = null
      
      const pollInterval = () => {
        const delay = pollCount === 0 ? 5000 : 15000
        pollCount++
        
        currentPollId = setTimeout(async () => {
          try {
            const status = await checkIfClassStarted(code)
            if (status?.success && status?.started && status?.join_url) {
              if (currentPollId) clearTimeout(currentPollId)
              setPollingId(null)
              if (!hasOpenedLink.current) {
                hasOpenedLink.current = true
                window.open(status.join_url, '_blank', 'noopener')
              }
            } else {
              pollInterval() // Continue polling
            }
          } catch (err: unknown) {
            console.error('Polling error:', err)
            pollInterval() // Retry on error
          }
        }, delay) as unknown as NodeJS.Timeout
        
        setPollingId(currentPollId)
      }
      
      pollInterval()
    } catch (error: unknown) {
      console.error('Error joining queue:', error)
      const errorMessage = error instanceof Error ? error.message : 'Oops! Something went wrong. Please try again.'
      alert(errorMessage || 'Oops! Something went wrong. Please try again.')
    } finally {
      setIsJoining(false)
    }
  }

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (pollingId) {
        clearTimeout(pollingId)
        setPollingId(null)
      }
    }
  }, [pollingId])

  return {
    showToast,
    setShowToast,
    isJoining,
    handleJoinNow
  }
}

