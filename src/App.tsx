
import { SnippetCard } from "./components/SnippetCard"
import styles from './styles/App.module.css'
import { useEffect, useState } from "react"
import { CategoryFilter } from "./components/CategoryFilter"
import type { Snippet } from "./types";

function App() {

  const backendURL = import.meta.env.VITE_API_URL;

  const [snippets, setSnippets] = useState<Snippet[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const categories = [...new Set(snippets.map(snippets => snippets.category))]
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const getSnippets = async () => {
    try {
      const res = await fetch(`${backendURL}/snippets`);
      const data = await res.json();

      setSnippets(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getSnippets();
  }, [])

  return (
    <>

      <h1>Snippets</h1>

      {loading && <h1>Cargando Snippets...</h1>}

      {!loading &&
        <CategoryFilter categories={categories} onSelected={setSelectedCategory} />
      }
      {!loading &&
        <div className={styles.app}>
          {snippets.filter(snippet => selectedCategory === 'All' || snippet.category === selectedCategory)
            .map(snippet => (
              <SnippetCard key={snippet.id} snippet={snippet} />))
          }
        </div>
      }
    </>
  )
}

export default App
