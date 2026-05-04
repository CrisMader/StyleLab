import { useState } from 'react'

interface CopyButtonProps {
  copyText: string
  label?: string
}

export const CopyButton = ({ copyText, label = 'Copy CSS' }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(copyText)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <button onClick={handleCopy}>
      {isCopied ? '¡Copiado!' : label}
    </button>
  )
}
