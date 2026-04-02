export interface SnippetPreviewProps {
    htmlCode: string
    cssCode: string
}

export const SnippetCardPreview = ({ cssCode, htmlCode }: SnippetPreviewProps) => {
    return (

        <iframe srcDoc={`<html><style>${cssCode}</style><body>${htmlCode}</body></html>`} />

    )
}