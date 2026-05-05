import { useNavigate } from 'react-router-dom'
import type { Snippet } from '../types'
import styles from '../styles/SnippetCard.module.css'
import { SnippetCardPreview } from './SnippetCardPreview'
import { CopyButton } from './CopyButton'
import { useAuth } from '../context/AuthContext'

interface SnippetCardProps {
  snippet: Snippet
  isFavorited?: boolean
  onToggleFavorite?: (id: number) => void
}

export const SnippetCard = ({ snippet, isFavorited = false, onToggleFavorite }: SnippetCardProps) => {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <article className={styles.card}>
      <div className={styles.previewWrap}>
        <SnippetCardPreview css_code={snippet.css_code} html_code={snippet.html_code} />
      </div>

      <div className={styles.cardBody}>
        <header className={styles.cardHeader}>
          <h2 className={styles.title}>{snippet.title}</h2>
          <span className={styles.category}>{snippet.category}</span>
        </header>

        <p className={styles.description}>{snippet.description}</p>
        <p className={styles.author}>by {snippet.author}</p>

        <div className={styles.actions}>
          <CopyButton copyText={snippet.css_code} label="Copy CSS" />
          <button className={styles.detailButton} onClick={() => navigate(`/snippet/${snippet.id}`)}>
            View details
          </button>
          {user && (
            <button
              className={`${styles.favButton} ${isFavorited ? styles.favActive : ''}`}
              onClick={() => onToggleFavorite?.(snippet.id)}
              title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
              aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorited ? '♥' : '♡'}
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
