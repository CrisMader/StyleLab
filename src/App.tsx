import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { SnippetDetail } from './pages/SnippetDetail'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/snippet/:id" element={<SnippetDetail />} />
    </Routes>
  )
}

export default App
