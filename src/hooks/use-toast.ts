import { useState, useEffect, useCallback, ReactNode } from "react"

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 1000000

type ToastActionElement = React.ReactElement<{
  altText: string
  onClick: () => void
}>

export type Toast = {
  id: string
  title?: ReactNode
  description?: ReactNode
  action?: ToastActionElement
  variant?: "default" | "destructive"
}

type ToasterToast = Toast & {
  dismiss: () => void
}

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

const toasts: ToasterToast[] = []

type UseToastOptions = {
  duration?: number
  variant?: "default" | "destructive"
}

export const useToast = () => {
  const [mounted, setMounted] = useState(false)
  const [toastList, setToastList] = useState<ToasterToast[]>([])

  useEffect(() => {
    setMounted(true)
    return () => {
      setMounted(false)
    }
  }, [])

  const dismiss = useCallback((toastId?: string) => {
    setToastList((toasts) => {
      if (toastId) {
        return toasts.filter((t) => t.id !== toastId)
      }
      return []
    })
  }, [])

  const toast = useCallback(
    ({
      title,
      description,
      action,
      variant = "default",
      duration = 5000,
    }: {
      title?: ReactNode
      description?: ReactNode
      action?: ToastActionElement
      variant?: "default" | "destructive"
      duration?: number
    } & UseToastOptions) => {
      if (!mounted) return

      const id = genId()
      const newToast: ToasterToast = {
        id,
        title,
        description,
        action,
        variant,
        dismiss: () => dismiss(id),
      }

      setToastList((toasts) => {
        if (toasts.length >= TOAST_LIMIT) {
          toasts.pop()
        }
        return [newToast, ...toasts]
      })

      if (duration > 0) {
        setTimeout(() => {
          dismiss(id)
        }, duration)
      }

      return id
    },
    [mounted, dismiss]
  )

  return {
    toast,
    dismiss,
    toasts: toastList,
  }
}

export type ToastProps = Toast & {
  onOpenChange?: (open: boolean) => void
} 