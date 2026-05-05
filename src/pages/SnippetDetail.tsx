import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import type { Snippet } from '../types'
import { SnippetCardPreview } from '../components/SnippetCardPreview'
import { CopyButton } from '../components/CopyButton'
import styles from '../styles/SnippetDetail.module.css'

export const SnippetDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const backendURL = import.meta.env.VITE_API_URL

  const [snippet, setSnippet] = useState<Snippet | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [notFound, setNotFound] = useState<boolean>(false)

  useEffect(() => {
    const getSnippet = async () => {
      try {
        const res = await fetch(`${backendURL}/snippets/${id}`)
        if (res.status === 404) {
          setNotFound(true)
          return
        }
        const data = await res.json()
        setSnippet(data)
      } catch (error) {
        console.error(error)
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }

    getSnippet()
  }, [id, backendURL])

  if (loading) return <p className={styles.status}>Loading snippet…</p>
  if (notFound || !snippet) return <p className={styles.status}>Snippet not found.</p>

  const formattedDate = new Date(snippet.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className={styles.page}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>{snippet.title}</h1>
            <span className={styles.category}>{snippet.category}</span>
          </div>
          <div className={styles.meta}>
            <p>Author: <strong>{snippet.author}</strong></p>
            <p>Published: <strong>{formattedDate}</strong></p>
          </div>
        </header>

        <p className={styles.description}>{snippet.description}</p>

        <section className={styles.previewSection}>
          <h2>Preview</h2>
          <SnippetCardPreview css_code={snippet.css_code} html_code={snippet.html_code} height={350} />
        </section>

        <section className={styles.codeSection}>
          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <h3>HTML</h3>
              <CopyButton copyText={snippet.html_code} label="Copy HTML" />
            </div>
            <pre className={styles.code}><code>{snippet.html_code}</code></pre>
          </div>

          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <h3>CSS</h3>
              <CopyButton copyText={snippet.css_code} label="Copy CSS" />
            </div>
            <pre className={styles.code}><code>{snippet.css_code}</code></pre>
          </div>
        </section>
      </div>
    </div>
  )
}
