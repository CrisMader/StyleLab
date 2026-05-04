import { useEffect, useState } from 'react'
import { SnippetCard } from '../components/SnippetCard'
import { CategoryFilter } from '../components/CategoryFilter'
import type { Snippet } from '../types'
import styles from '../styles/App.module.css'

export const Home = () => {
  const backendURL = import.meta.env.VITE_API_URL

  const [snippets, setSnippets] = useState<Snippet[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [query, setQuery] = useState<string>('')

  const categories = [...new Set(snippets.map(s => s.category))]

  const getSnippets = async () => {
    try {
      const res = await fetch(`${backendURL}/snippets`)
      const data = await res.json()
      setSnippets(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getSnippets()
  }, [])

  return (
    <>
      <h1>Snippets</h1>

      {loading && <h1>Cargando Snippets...</h1>}

      {!loading && (
        <>
          <input
            className={styles.search}
            type="text"
            placeholder="Buscar por título o descripción..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <CategoryFilter categories={categories} onSelected={setSelectedCategory} />
        </>
      )}

      {!loading && (
        <div className={styles.app}>
          {snippets
            .filter(s => selectedCategory === 'All' || s.category === selectedCategory)
            .filter(s => {
              const q = query.toLowerCase()
              return s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
            })
            .map(snippet => (
              <SnippetCard key={snippet.id} snippet={snippet} />
            ))}
        </div>
      )}
    </>
  )
}
