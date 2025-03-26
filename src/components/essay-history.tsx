import { useState, useCallback, useEffect } from "react"

interface HistoryState {
  content: string
  timestamp: number
}

interface UseHistoryProps {
  initialContent: string
  maxHistory?: number
}

export function useHistory({ initialContent, maxHistory = 50 }: UseHistoryProps) {
  const [history, setHistory] = useState<HistoryState[]>([
    { content: initialContent, timestamp: Date.now() },
  ])
  const [currentIndex, setCurrentIndex] = useState(0)

  const addToHistory = useCallback(
    (content: string) => {
      setHistory((prev) => {
        const newHistory = [
          ...prev.slice(0, currentIndex + 1),
          { content, timestamp: Date.now() },
        ]
        return newHistory.slice(-maxHistory)
      })
      setCurrentIndex((prev) => Math.min(prev + 1, maxHistory - 1))
    },
    [currentIndex, maxHistory]
  )

  const undo = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }, [])

  const redo = useCallback(() => {
    setCurrentIndex((prev) => Math.min(history.length - 1, prev + 1))
  }, [history.length])

  const canUndo = currentIndex > 0
  const canRedo = currentIndex < history.length - 1

  return {
    currentContent: history[currentIndex].content,
    addToHistory,
    undo,
    redo,
    canUndo,
    canRedo,
  }
} 