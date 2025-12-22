import { useState, useEffect, useCallback, useRef } from 'react'
import type { ClassDetails } from '../types/common'

interface TimeLeft {
  hours: number
  minutes: number
  seconds: number
}

export const useClassTimer = (classDetails?: ClassDetails) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ hours: 0, minutes: 0, seconds: 0 })
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const toISTDate = useCallback((dateStr: string | undefined, timeStr: string | undefined): Date | null => {
    if (!dateStr || !timeStr) return null
    const t = timeStr.length === 5 ? `${timeStr}:00` : timeStr
    const iso = `${dateStr}T${t}+05:30`
    const d = new Date(iso)
    return isNaN(d.getTime()) ? null : d
  }, [])

  useEffect(() => {
    const start = toISTDate(classDetails?.class_date, classDetails?.start_time)
    if (!start) {
      setTimeLeft({ hours: 0, minutes: 0, seconds: 0 })
      return
    }

    const tick = (): void => {
      const now = new Date()
      const diffSecs = Math.max(0, Math.floor((start.getTime() - now.getTime()) / 1000))
      const hours = Math.floor(diffSecs / 3600)
      const minutes = Math.floor((diffSecs % 3600) / 60)
      const seconds = diffSecs % 60
      setTimeLeft({ hours, minutes, seconds })
    }

    // Initial tick for immediate update
    tick()
    
    // Use requestAnimationFrame for smoother updates, fallback to setInterval
    let animationFrameId: number
    let intervalId: NodeJS.Timeout
    
    const scheduleTick = () => {
      tick()
      intervalId = setTimeout(() => {
        animationFrameId = requestAnimationFrame(scheduleTick)
      }, 1000)
    }
    
    animationFrameId = requestAnimationFrame(scheduleTick)
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
      if (intervalId) {
        clearTimeout(intervalId)
      }
    }
  }, [classDetails?.class_date, classDetails?.start_time, toISTDate])

  const formatTime = useCallback((value: number): string => String(value).padStart(2, '0'), [])

  return { timeLeft, formatTime }
}

