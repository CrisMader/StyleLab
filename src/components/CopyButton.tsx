import { useState } from 'react'
import styles from '../styles/CopyButton.module.css'

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
    <button
      onClick={handleCopy}
      className={`${styles.button} ${isCopied ? styles.copied : ''}`}
    >
      {isCopied ? 'Copied!' : label}
    </button>
  )
}
