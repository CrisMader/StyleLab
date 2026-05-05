import { Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { SnippetDetail } from './pages/SnippetDetail'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { EditProfile } from './pages/EditProfile'
import { Favorites } from './pages/Favorites'
import { About } from './pages/About'

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/snippet/:id" element={<SnippetDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/edit" element={<EditProfile />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
