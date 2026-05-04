import styles from '../styles/SnippetCardPreview.module.css'

export interface SnippetPreviewProps {
    html_code: string
    css_code: string
    height?: number
}

export const SnippetCardPreview = ({ css_code, html_code, height = 200 }: SnippetPreviewProps) => {
    return (

        <iframe className={styles.preview} style={{ height }} srcDoc={`<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<style>
  body {
    margin: 0;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    font-family: system-ui, sans-serif;
    background: #fafafa;
  }
  .preview-wrapper {
  position: relative;
  display: inline-block;
  min-width: 250px;
  width: 100%;
}
</style>
<style>${css_code}</style>
<body>
  <div class="preview-wrapper">${html_code}</div>
</body>
</html>`} />

    )
}