import { useState, useCallback } from 'react'

// ── useLocalStorage ────────────────────────────────────────────────────────
// Replaces direct localStorage manipulation scattered across the HTML files.
// Now all persistence is in one place and re-renders are automatic.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const set = useCallback((valOrFn) => {
    setValue(prev => {
      const next = typeof valOrFn === 'function' ? valOrFn(prev) : valOrFn
      try { localStorage.setItem(key, JSON.stringify(next)) } catch {}
      return next
    })
  }, [key])

  return [value, set]
}

// ── useToast ──────────────────────────────────────────────────────────────
// Centralises all toast notifications (previously imperative DOM mutations).
import { useState as useToastState } from 'react'

export function useToast() {
  const [toasts, setToasts] = useToastState([])

  const toast = useCallback((msg, type = 'info') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, msg, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500)
  }, [])

  return { toasts, toast }
}
