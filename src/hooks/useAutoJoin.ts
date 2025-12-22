import { useEffect, useRef } from 'react'
import { checkIfClassStarted } from '../utils/api'

export const useAutoJoin = (code?: string) => {
  const hasCheckedAutoRedirect = useRef<boolean>(false)
  const hasOpenedLink = useRef<boolean>(false)

  useEffect(() => {
    if (!code || hasCheckedAutoRedirect.current || hasOpenedLink.current) return

    const checkAndRedirect = async (): Promise<void> => {
      try {
        const status = await checkIfClassStarted(code)
        if (status?.success && (status?.started || status?.join_url)) {
          hasCheckedAutoRedirect.current = true
          if (status.join_url && !hasOpenedLink.current) {
            hasOpenedLink.current = true
            window.open(status.join_url, '_blank', 'noopener')
          }
        }
      } catch (error: unknown) {
        // Silently fail - user can still click Join Now button
        console.error('Auto-redirect check failed:', error)
      }
    }

    checkAndRedirect()
  }, [code])

  return { hasOpenedLink }
}

