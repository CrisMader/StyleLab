import type { Snippet } from "../types"
import styles from './SnippetCard.module.css'

interface SnippetCardProps {
    snippet: Snippet
}

export const SnippetCard = ({ snippet }: SnippetCardProps) => {
    return (
            <article className={styles.card}>
                <header className={styles.cardHeader}>
                    <h2>{snippet.title}</h2>
                    <p>{snippet.category}</p>
                </header>

                <p>{snippet.description}</p>
            </article>
    )
}