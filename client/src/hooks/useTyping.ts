import { useEffect, useRef, useState } from 'react'

export const useTyping = () => {
  const [isTyping, setIsTyping] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleKeyDown = () => {
      setIsTyping(true)
      startTimeout()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const startTimeout = () => {
    if (intervalRef.current) {
      clearTimeout(intervalRef.current)
    }

    intervalRef.current = null

    intervalRef.current = setTimeout(() => {
      setIsTyping(false)
    }, 2000)
  }

  return isTyping
}
