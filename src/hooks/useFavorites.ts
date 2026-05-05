import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

const backendURL = import.meta.env.VITE_API_URL

export const useFavorites = () => {
  const { user, token } = useAuth()
  const [favoriteIds, setFavoriteIds] = useState<Set<number>>(new Set())

  const authHeaders = { Authorization: `Bearer ${token}` }

  const fetchIds = useCallback(async () => {
    if (!user || !token) { setFavoriteIds(new Set()); return }
    try {
      const res = await fetch(`${backendURL}/favorites/ids`, { headers: authHeaders })
      if (!res.ok) return
      const ids: number[] = await res.json()
      setFavoriteIds(new Set(ids))
    } catch { /* silent */ }
  }, [user, token])

  useEffect(() => { fetchIds() }, [fetchIds])

  const toggle = async (snippetId: number) => {
    if (!token) return
    const isFav = favoriteIds.has(snippetId)
    const method = isFav ? 'DELETE' : 'POST'
    try {
      await fetch(`${backendURL}/favorites/${snippetId}`, { method, headers: authHeaders })
      setFavoriteIds(prev => {
        const next = new Set(prev)
        isFav ? next.delete(snippetId) : next.add(snippetId)
        return next
      })
    } catch { /* silent */ }
  }

  return { favoriteIds, toggle }
}
