import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useFavorites } from '../hooks/useFavorites'
import { SnippetCard } from '../components/SnippetCard'
import type { Snippet } from '../types'
import styles from '../styles/App.module.css'

export const Favorites = () => {
  const { user, token } = useAuth()
  const navigate = useNavigate()
  const backendURL = import.meta.env.VITE_API_URL

  const [snippets, setSnippets] = useState<Snippet[]>([])
  const [loading, setLoading] = useState(true)
  const { favoriteIds, toggle } = useFavorites()

  const handleToggle = async (snippetId: number) => {
    await toggle(snippetId)
    setSnippets(prev => prev.filter(s => s.id !== snippetId))
  }

  useEffect(() => {
    if (!user) { navigate('/login'); return }

    const fetchFavorites = async () => {
      try {
        const res = await fetch(`${backendURL}/favorites`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!res.ok) throw new Error()
        setSnippets(await res.json())
      } catch {
        setSnippets([])
      } finally {
        setLoading(false)
      }
    }

    fetchFavorites()
  }, [user])

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Favorites</h1>
      <p className={styles.subheading}>Snippets you've saved for later.</p>

      {loading ? (
        <p className={styles.status}>Loading favorites…</p>
      ) : snippets.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>No favorites yet</p>
          <p className={styles.emptyText}>Tap the heart icon on any snippet to save it here.</p>
        </div>
      ) : (
        <div className={styles.app}>
          {snippets.map(snippet => (
            <SnippetCard
              key={snippet.id}
              snippet={snippet}
              isFavorited={favoriteIds.has(snippet.id)}
              onToggleFavorite={handleToggle}
            />
          ))}
        </div>
      )}
    </div>
  )
}
