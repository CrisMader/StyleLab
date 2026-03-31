import { snippets } from "./data/snippets"
import { SnippetCard } from "./components/SnippetCard"

function App() {
  return (
    <>
      <h1>Snippets</h1>
      {snippets.map(snippet => {
        return <SnippetCard snippet={snippet} key={snippet.id} />
      })}
    </>
  )
}

export default App
