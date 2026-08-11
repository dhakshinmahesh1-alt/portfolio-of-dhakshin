import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'

const TOOL_ICONS = ['🔧', '⚙️', '💡', '🔌', '🔋', '🧲', '🪛', '📎', '✂️', '🔨', '🪤', '🧰']

function generateBoard(size) {
  const pairs = TOOL_ICONS.slice(0, size)
  const cards = [...pairs, ...pairs]
    .sort(() => Math.random() - 0.5)
    .map((icon, i) => ({ id: i, icon, flipped: false, matched: false }))
  return cards
}

export function MemoryGame() {
  const [cards, setCards] = useState(() => generateBoard(6))
  const [flipped, setFlipped] = useState([])
  const [moves, setMoves] = useState(0)
  const [won, setWon] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const handleFlip = useCallback((id) => {
    if (disabled) return
    if (flipped.length >= 2) return
    if (cards[id].flipped || cards[id].matched) return

    const newCards = cards.map((c, i) => i === id ? { ...c, flipped: true } : c)
    setCards(newCards)

    const newFlipped = [...flipped, id]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      setMoves(m => m + 1)
      const [a, b] = newFlipped
      setDisabled(true)

      if (newCards[a].icon === newCards[b].icon) {
        setTimeout(() => {
          setCards(prev => prev.map(c =>
            c.icon === newCards[a].icon ? { ...c, matched: true } : c
          ))
          setFlipped([])
          setDisabled(false)
          const remaining = newCards.filter(c => !c.matched && c.id !== a && c.id !== b)
          if (remaining.length === 0) setWon(true)
        }, 500)
      } else {
        setTimeout(() => {
          setCards(prev => prev.map((c, i) =>
            i === a || i === b ? { ...c, flipped: false } : c
          ))
          setFlipped([])
          setDisabled(false)
        }, 900)
      }
    }
  }, [cards, flipped, disabled])

  const reset = () => {
    setCards(generateBoard(6))
    setFlipped([])
    setMoves(0)
    setWon(false)
    setDisabled(false)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-muted font-mono">Moves: {moves}</p>
        {won && <p className="text-xs text-green-600 font-bold">Done in {moves}!</p>}
        <button onClick={reset} className="text-xs text-muted hover:text-text transition-colors underline">Reset</button>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {cards.map((card) => (
          <motion.button
            key={card.id}
            whileTap={{ scale: 0.92 }}
            onClick={() => handleFlip(card.id)}
            disabled={card.matched || disabled}
            className={`aspect-square rounded-xl text-xl flex items-center justify-center transition-all duration-300 border select-none
              ${card.matched
                ? 'bg-green-50 border-green-200 scale-95'
                : card.flipped
                  ? 'bg-white border-border shadow-sm rotate-0'
                  : 'bg-surface-2 border-border/50 hover:border-border hover:bg-white cursor-pointer active:scale-95'
              }`}
          >
            <span className={`transition-transform duration-300 ${(card.flipped || card.matched) ? 'rotate-0 scale-100' : ''}`}>
              {card.flipped || card.matched ? card.icon : '❓'}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export function ReactionGame() {
  const [state, setState] = useState('idle')
  const [startTime, setStartTime] = useState(0)
  const [reactionTime, setReactionTime] = useState(null)
  const [bestTime, setBestTime] = useState(null)

  const start = () => {
    setState('waiting')
    setReactionTime(null)
    const delay = 1000 + Math.random() * 3000
    setTimeout(() => {
      setState('go')
      setStartTime(Date.now())
    }, delay)
  }

  const click = () => {
    if (state === 'idle' || state === 'result') {
      start()
      return
    }
    if (state === 'waiting') {
      setState('idle')
      setReactionTime(null)
      return
    }
    if (state === 'go') {
      const time = Date.now() - startTime
      setReactionTime(time)
      setBestTime(prev => prev === null ? time : Math.min(prev, time))
      setState('result')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-muted font-mono">
          {bestTime !== null ? `Best: ${bestTime}ms` : 'Test your reflexes'}
        </p>
        {reactionTime !== null && state === 'result' && (
          <p className="text-xs text-accent font-bold">{reactionTime}ms</p>
        )}
      </div>
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={click}
        className={`w-full h-32 rounded-2xl flex items-center justify-center text-sm font-semibold transition-all duration-200 border select-none
          ${state === 'idle' || state === 'result'
            ? 'bg-surface-2 border-border/50 text-muted hover:border-border cursor-pointer'
            : state === 'waiting'
              ? 'bg-amber-50 border-amber-300 text-amber-700 cursor-pointer'
              : 'bg-green-50 border-green-300 text-green-700 cursor-pointer scale-[1.02]'
          }`}
      >
        {state === 'idle' && '🟢 Click to Start'}
        {state === 'waiting' && '⏳ Wait for green...'}
        {state === 'go' && '🟩 CLICK NOW!'}
        {state === 'result' && '🔄 Try Again'}
      </motion.button>
    </div>
  )
}
