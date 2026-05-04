import { Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { SnippetDetail } from './pages/SnippetDetail'

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/snippet/:id" element={<SnippetDetail />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
