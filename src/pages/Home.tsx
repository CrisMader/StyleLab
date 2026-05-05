import { useEffect, useState } from 'react'
import { SnippetCard } from '../components/SnippetCard'
import { CategoryFilter } from '../components/CategoryFilter'
import { useFavorites } from '../hooks/useFavorites'
import type { Snippet } from '../types'
import styles from '../styles/App.module.css'

export const Home = () => {
  const backendURL = import.meta.env.VITE_API_URL

  const [snippets, setSnippets] = useState<Snippet[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [query, setQuery] = useState<string>('')

  const { favoriteIds, toggle } = useFavorites()
  const categories = [...new Set(snippets.map(s => s.category))]

  useEffect(() => {
    const getSnippets = async () => {
      try {
        const res = await fetch(`${backendURL}/snippets`)
        if (!res.ok) throw new Error()
        const data = await res.json()
        setSnippets(data)
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    getSnippets()
  }, [])

  const filtered = snippets
    .filter(s => selectedCategory === 'All' || s.category === selectedCategory)
    .filter(s => {
      const q = query.toLowerCase()
      return s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
    })

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Snippets</h1>
      <p className={styles.subheading}>
        A curated collection of CSS effects, components, and animations.
      </p>

      <div className={styles.toolbar}>
        <input
          className={styles.search}
          type="text"
          placeholder="Search by title or description..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onSelected={setSelectedCategory}
        />
      </div>

      {loading ? (
        <p className={styles.status}>Loading snippets…</p>
      ) : error ? (
        <p className={styles.status}>Could not load snippets. Make sure the server is running.</p>
      ) : snippets.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>No snippets available yet</p>
          <p className={styles.emptyText}>Check back soon for new additions.</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>No results found</p>
          <p className={styles.emptyText}>Try a different search or category.</p>
        </div>
      ) : (
        <div className={styles.app}>
          {filtered.map(snippet => (
            <SnippetCard
              key={snippet.id}
              snippet={snippet}
              isFavorited={favoriteIds.has(snippet.id)}
              onToggleFavorite={toggle}
            />
          ))}
        </div>
      )}
    </div>
  )
}
