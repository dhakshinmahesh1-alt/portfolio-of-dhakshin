import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'

const ICONS = ['🔧', '⚙️', '💡', '🔌', '🔋', '🧲', '🪛', '📎', '✂️', '🔨']

function generateBoard(size) {
  const pairs = ICONS.slice(0, size)
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

  const handleFlip = useCallback((id) => {
    if (flipped.length === 2) return
    if (cards[id].flipped || cards[id].matched) return

    const newCards = [...cards]
    newCards[id] = { ...newCards[id], flipped: true }
    setCards(newCards)

    const newFlipped = [...flipped, id]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      setMoves(m => m + 1)
      const [a, b] = newFlipped
      if (newCards[a].icon === newCards[b].icon) {
        setTimeout(() => {
          setCards(prev => prev.map(c =>
            c.icon === newCards[a].icon ? { ...c, matched: true } : c
          ))
          setFlipped([])
          if (newCards.filter(c => !c.matched && c.id !== a && c.id !== b).length <= 0) {
            setWon(true)
          }
        }, 400)
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(c =>
            c.id === a || c.id === b ? { ...c, flipped: false } : c
          ))
          setFlipped([])
        }, 800)
      }
    }
  }, [cards, flipped])

  const reset = () => {
    setCards(generateBoard(6))
    setFlipped([])
    setMoves(0)
    setWon(false)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-muted">Moves: {moves}</p>
        {won && <p className="text-xs text-accent font-semibold">You won in {moves} moves!</p>}
        <button onClick={reset} className="text-xs text-muted hover:text-text transition-colors underline">
          Reset
        </button>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {cards.map((card) => (
          <motion.button
            key={card.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleFlip(card.id)}
            className={`aspect-square rounded-xl text-xl flex items-center justify-center transition-all duration-300 border
              ${card.matched
                ? 'bg-accent/10 border-accent/30'
                : card.flipped
                  ? 'bg-white border-border shadow-sm'
                  : 'bg-surface-2 border-border/50 hover:border-border cursor-pointer'
              }`}
          >
            {card.flipped || card.matched ? card.icon : '?'}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export function ReactionGame() {
  const [state, setState] = useState('idle') // idle, waiting, go, result
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
        <p className="text-xs text-muted">
          {bestTime !== null ? `Best: ${bestTime}ms` : 'Click to start'}
        </p>
        {reactionTime !== null && state === 'result' && (
          <p className="text-xs text-accent font-semibold">{reactionTime}ms</p>
        )}
      </div>
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={state === 'idle' || state === 'result' ? start : click}
        className={`w-full h-32 rounded-2xl flex items-center justify-center text-sm font-medium transition-all duration-300 border
          ${state === 'idle' || state === 'result'
            ? 'bg-surface-2 border-border/50 text-muted hover:border-border cursor-pointer'
            : state === 'waiting'
              ? 'bg-amber-50 border-amber-200 text-amber-700'
              : 'bg-green-50 border-green-200 text-green-700'
          }`}
      >
        {state === 'idle' && 'Click to Start'}
        {state === 'waiting' && 'Wait for green...'}
        {state === 'go' && 'CLICK NOW!'}
        {state === 'result' && `Click to Try Again`}
      </motion.button>
    </div>
  )
}
