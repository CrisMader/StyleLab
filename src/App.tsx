import { snippets } from "./data/snippets"
import { SnippetCard } from "./components/SnippetCard"
import styles from './styles/App.module.css'

function App() {

  const categories = [...new Set(snippets.map(snippet => snippet.category))]

  return (
    <>

      <h1>Snippets</h1>

      <div className={styles.app}>
        {snippets.map(snippet => {
          return <SnippetCard snippet={snippet} key={snippet.id} />
        })}

      </div>
    </>
  )
}

export default App
