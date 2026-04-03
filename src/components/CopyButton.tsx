import { useState } from "react"

interface CopyButtonProps {
    copyText: string
}

export const CopyButton = ({ copyText }: CopyButtonProps) => {

    const [isCopied, setIsCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(copyText)
        setIsCopied(true)

        setTimeout(() => {
            setIsCopied(false)
        }, 2000)
    }

    return (

        <button onClick={handleCopy}>
            {isCopied ? 'Copied!' : 'Copy CSS'}
        </button>

    )
}