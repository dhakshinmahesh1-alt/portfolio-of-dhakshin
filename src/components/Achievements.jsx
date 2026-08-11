import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const badges = [
  { id: 'visitor', icon: '👁️', name: 'First Visit', desc: 'You opened the portfolio' },
  { id: 'scroller', icon: '📜', name: 'Deep Scroller', desc: 'Scrolled to the bottom' },
  { id: 'gamer', icon: '🎮', name: 'Gamer', desc: 'Played a mini game' },
  { id: 'clicker', icon: '🖱️', name: 'Clicker', desc: 'Clicked 30 times' },
  { id: 'konami', icon: '🕹️', name: 'Konami Master', desc: 'Entered the Konami Code' },
  { id: 'easter', icon: '🥚', name: 'Easter Hunter', desc: 'Found the Easter egg' },
]

export default function AchievementBadges() {
  const [show, setShow] = useState(false)
  const [unlocked, setUnlocked] = useState(() => {
    try { return JSON.parse(localStorage.getItem('achievements') || '[]') } catch { return [] }
  })
  const [toast, setToast] = useState(null)

  const unlock = (id) => {
    setUnlocked(prev => {
      if (prev.includes(id)) return prev
      const next = [...prev, id]
      localStorage.setItem('achievements', JSON.stringify(next))
      const badge = badges.find(b => b.id === id)
      if (badge) {
        setToast(`${badge.icon} ${badge.name} unlocked!`)
        setTimeout(() => setToast(null), 3000)
      }
      return next
    })
  }

  // Expose unlock globally
  useEffect(() => {
    window.__unlockAchievement = unlock
  }, [])

  // Auto-unlock visitor
  useEffect(() => {
    unlock('visitor')
  }, [])

  // Track clicks for clicker achievement
  useEffect(() => {
    let clicks = parseInt(localStorage.getItem('click_count') || '0')
    const handler = () => {
      clicks++
      localStorage.setItem('click_count', clicks.toString())
      if (clicks >= 30) unlock('clicker')
    }
    window.addEventListener('click', handler)
    return () => window.removeEventListener('click', handler)
  }, [])

  // Track scroll for scroller achievement
  useEffect(() => {
    const handler = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      if (h > 0 && window.scrollY / h > 0.9) unlock('scroller')
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      {/* Trophy button */}
      <button
        onClick={() => setShow(!show)}
        className="fixed bottom-4 left-4 z-[100] w-10 h-10 rounded-full bg-white border border-border shadow-sm flex items-center justify-center hover:shadow-md transition-all"
        title="Achievements"
      >
        🏆
        {unlocked.length > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-text text-white text-[8px] font-bold rounded-full flex items-center justify-center">
            {unlocked.length}
          </span>
        )}
      </button>

      {/* Toast notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-16 left-1/2 z-[200] bg-text text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Badges panel */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-16 left-4 z-[200] bg-white border border-border rounded-2xl shadow-2xl p-5 w-72"
          >
            <p className="text-sm font-bold text-text mb-3">Achievements</p>
            <div className="space-y-2">
              {badges.map(b => {
                const isUnlocked = unlocked.includes(b.id)
                return (
                  <div key={b.id} className={`flex items-center gap-3 p-2 rounded-xl transition-all ${isUnlocked ? 'bg-surface-2' : 'opacity-40 grayscale'}`}>
                    <span className="text-xl">{b.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-text">{b.name}</p>
                      <p className="text-[10px] text-muted truncate">{b.desc}</p>
                    </div>
                    {isUnlocked && <span className="text-[10px] text-green-600 font-bold">✓</span>}
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
