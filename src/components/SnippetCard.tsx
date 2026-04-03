import type { Snippet } from "../types"
import styles from '../styles/SnippetCard.module.css'
import { SnippetCardPreview } from "./SnippetCardPreview"
import { CopyButton } from "./CopyButton"

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
                <SnippetCardPreview cssCode={snippet.cssCode} htmlCode={snippet.htmlCode}/>
                <p>Author: {snippet.author}</p>
                <CopyButton copyText={snippet.cssCode}/>
            </article>
    )
}