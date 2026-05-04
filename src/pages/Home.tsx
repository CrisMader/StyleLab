import { useEffect, useState } from 'react'
import { SnippetCard } from '../components/SnippetCard'
import { CategoryFilter } from '../components/CategoryFilter'
import type { Snippet } from '../types'
import styles from '../styles/App.module.css'

export const Home = () => {
  const backendURL = import.meta.env.VITE_API_URL

  const [snippets, setSnippets] = useState<Snippet[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [query, setQuery] = useState<string>('')

  const categories = [...new Set(snippets.map(s => s.category))]

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

  useEffect(() => {
    getSnippets()
  }, [])

  const filtered = snippets
    .filter(s => selectedCategory === 'All' || s.category === selectedCategory)
    .filter(s => {
      const q = query.toLowerCase()
      return s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
    })

  if (loading) return <p className={styles.status}>Cargando snippets...</p>
  if (error) return <p className={styles.status}>Error al cargar los snippets. Comprueba que el servidor esté activo.</p>

  return (
    <>
      <h1>Snippets</h1>

      <input
        className={styles.search}
        type="text"
        placeholder="Buscar por título o descripción..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      <CategoryFilter categories={categories} onSelected={setSelectedCategory} />

      {snippets.length === 0 ? (
        <p className={styles.status}>No hay snippets disponibles aún.</p>
      ) : filtered.length === 0 ? (
        <p className={styles.status}>No results found for "{query}".</p>
      ) : (
        <div className={styles.app}>
          {filtered.map(snippet => (
            <SnippetCard key={snippet.id} snippet={snippet} />
          ))}
        </div>
      )}
    </>
  )
}
