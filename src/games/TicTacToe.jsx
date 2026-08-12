import { useState } from 'react'
import { motion } from 'framer-motion'

export function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [isX, setIsX] = useState(true)
  const [winner, setWinner] = useState(null)

  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ]

  const checkWinner = (b) => {
    for (const [a, c, d] of lines) {
      if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a]
    }
    return null
  }

  const click = (i) => {
    if (board[i] || winner) return
    const newBoard = [...board]
    newBoard[i] = isX ? 'X' : 'O'
    setBoard(newBoard)
    const w = checkWinner(newBoard)
    if (w) setWinner(w)
    else setIsX(!isX)
  }

  const reset = () => {
    setBoard(Array(9).fill(null))
    setIsX(true)
    setWinner(null)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-muted font-mono">
          {winner ? `${winner} wins!` : board.every(b => b) ? "Draw!" : `${isX ? 'X' : 'O'}'s turn`}
        </p>
        <button onClick={reset} className="text-xs text-muted hover:text-text transition-colors underline">Reset</button>
      </div>
      <div className="grid grid-cols-3 gap-1.5 max-w-[200px] mx-auto">
        {board.map((cell, i) => (
          <motion.button
            key={i}
            whileTap={{ scale: 0.9 }}
            onClick={() => click(i)}
            className={`aspect-square rounded-lg text-lg font-bold flex items-center justify-center transition-all border select-none
              ${cell === 'X' ? 'bg-blue-50 border-blue-200 text-blue-600' :
                cell === 'O' ? 'bg-amber-50 border-amber-200 text-amber-600' :
                'bg-surface-2 border-border/50 hover:border-border cursor-pointer'}`}
          >
            {cell}
          </motion.button>
        ))}
      </div>
    </div>
  )
}