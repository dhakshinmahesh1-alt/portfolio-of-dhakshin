import { useEffect, useState } from 'react'

export default function TypingEffect({ words = [], speed = 100, pause = 2000 }) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const word = words[index]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(word.slice(0, text.length + 1))
        if (text.length + 1 === word.length) {
          setTimeout(() => setIsDeleting(true), pause)
        }
      } else {
        setText(word.slice(0, text.length - 1))
        if (text.length - 1 === 0) {
          setIsDeleting(false)
          setIndex((index + 1) % words.length)
        }
      }
    }, isDeleting ? speed / 2 : speed)

    return () => clearTimeout(timeout)
  }, [text, isDeleting, index, words, speed, pause])

  return (
    <span>
      {text}
      <span className="animate-pulse text-accent">|</span>
    </span>
  )
}
