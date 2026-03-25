import type { Snippet } from "../types"

interface SnippetCardProps {
    snippet: Snippet
}

export const SnippetCard = ({ snippet }: SnippetCardProps) => {
    return (
            <article>
                <header>
                    <h2>{snippet.title}</h2>
                    <p>{snippet.category}</p>
                </header>

                <p>{snippet.description}</p>
            </article>
    )
}