type Preview = {
    code: string
}

export const SnippetPreview = ({ cssCode, htmlCode }): Preview => {
    return (

        <iframe srcDoc={`<html><style>${cssCode}</style><body>${htmlCode}</body></html>`} />

    )
}