import { useNavigate } from 'react-router-dom'
import type { Snippet } from '../types'
import styles from '../styles/SnippetCard.module.css'
import { SnippetCardPreview } from './SnippetCardPreview'
import { CopyButton } from './CopyButton'

interface SnippetCardProps {
  snippet: Snippet
}

export const SnippetCard = ({ snippet }: SnippetCardProps) => {
  const navigate = useNavigate()

  return (
    <article className={styles.card}>
      <header className={styles.cardHeader}>
        <h2>{snippet.title}</h2>
        <p>{snippet.category}</p>
      </header>

      <p>{snippet.description}</p>
      <SnippetCardPreview css_code={snippet.css_code} html_code={snippet.html_code} />
      <p>Autor: {snippet.author}</p>

      <div className={styles.actions}>
        <CopyButton copyText={snippet.css_code} label="Copiar CSS" />
        <button className={styles.detailButton} onClick={() => navigate(`/snippet/${snippet.id}`)}>
          Ver detalles
        </button>
      </div>
    </article>
  )
}
