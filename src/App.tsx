import { snippets } from "./data/snippets"
import { SnippetCard } from "./components/SnippetCard"
import styles from './styles/App.module.css'

function App() {
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
