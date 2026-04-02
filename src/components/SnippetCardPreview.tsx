import styles from '../styles/SnippetCardPreview.module.css'

export interface SnippetPreviewProps {
    htmlCode: string
    cssCode: string
}

export const SnippetCardPreview = ({ cssCode, htmlCode }: SnippetPreviewProps) => {
    return (

        <iframe className={styles.preview} srcDoc={`<html><style>${cssCode}</style><body>${htmlCode}</body></html>`} />

    )
}