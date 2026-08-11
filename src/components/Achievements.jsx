import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const badges = [
  { id: 'visitor', icon: '👁️', name: 'First Visit', desc: 'You opened the portfolio', unlocked: true },
  { id: 'scroller', icon: '📜', name: 'Deep Scroller', desc: 'Scrolled to the bottom', unlocked: false },
  { id: 'gamer', icon: '🎮', name: 'Gamer', desc: 'Played a mini game', unlocked: false },
  { id: 'clicker', icon: '🖱️', name: 'Clicker', desc: 'Clicked 50 times', unlocked: false },
  { id: 'konami', icon: '🕹️', name: 'Konami Master', desc: 'Entered the Konami Code', unlocked: false },
  { id: 'easter', icon: '🥚', name: 'Easter Hunter', desc: 'Found the Easter egg', unlocked: false },
]

export default function AchievementBadges() {
  const [show, setShow] = useState(false)
  const [unlocked, setUnlocked] = useState(() => {
    try { return JSON.parse(localStorage.getItem('achievements') || '[]') } catch { return [] }
  })

  const unlock = (id) => {
    if (unlocked.includes(id)) return
    const next = [...unlocked, id]
    setUnlocked(next)
    localStorage.setItem('achievements', JSON.stringify(next))
  }

  // Expose unlock globally
  if (typeof window !== 'undefined') window.__unlockAchievement = unlock

  return (
    <>
      <button
        onClick={() => setShow(!show)}
        className="fixed bottom-4 left-4 z-50 w-10 h-10 rounded-full bg-white border border-border shadow-sm flex items-center justify-center hover:shadow-md transition-all text-lg"
        title="Achievements"
      >
        🏆
        {unlocked.length > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-white text-[8px] font-bold rounded-full flex items-center justify-center">
            {unlocked.length}
          </span>
        )}
      </button>

      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-16 left-4 z-50 bg-white border border-border rounded-2xl shadow-2xl p-5 w-72"
          >
            <p className="text-sm font-bold text-text mb-3">Achievements</p>
            <div className="space-y-2">
              {badges.map(b => {
                const isUnlocked = unlocked.includes(b.id) || b.unlocked
                return (
                  <div key={b.id} className={`flex items-center gap-3 p-2 rounded-xl transition-all ${isUnlocked ? 'bg-surface-2' : 'opacity-40'}`}>
                    <span className="text-xl">{b.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-text">{b.name}</p>
                      <p className="text-[10px] text-muted truncate">{b.desc}</p>
                    </div>
                    {isUnlocked && <span className="text-[10px] text-accent font-bold">✓</span>}
                  </div>
                )
              })}
            </div>
            <p className="text-[10px] text-muted mt-3">{unlocked.length}/{badges.length} unlocked</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
