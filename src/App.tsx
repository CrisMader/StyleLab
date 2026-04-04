import { snippets } from "./data/snippets"
import { SnippetCard } from "./components/SnippetCard"
import styles from './styles/App.module.css'
import { useState } from "react"
import { CategoryFilter } from "./components/CategoryFilter"

function App() {

  const categories = [...new Set(snippets.map(snippet => snippet.category))]

  const [selectedCategory, setSelectedCategory] = useState('All')

  return (
    <>

      <h1>Snippets</h1>

      <CategoryFilter categories={categories} onSelected={setSelectedCategory}/>

      <div className={styles.app}>
        {snippets
          .filter(snippet => selectedCategory === 'All' || snippet.category === selectedCategory)
          .map(snippet => (
            <SnippetCard key={snippet.id} snippet={snippet} />
          ))}
      </div>
    </>
  )
}

export default App
