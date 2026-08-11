import { motion } from 'framer-motion'
import { MemoryGame, ReactionGame, SnakeGame, BreakoutGame, TicTacToe, WhackAMole, SimonSays, FlappyBird, NumberGuess } from './MiniGames'
import RCCarGame from './RCCarGame'
import { Gear, PaperPlane, Lightbulb } from './Illustrations'

export default function Play() {
  return (
    <section id="play" className="py-32 px-6 bg-[#f0f0f0] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 0.12 }} viewport={{ once: true }} className="absolute top-10 left-[5%] rotate-15">
          <PaperPlane size={60} />
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 0.1 }} viewport={{ once: true }} className="absolute bottom-12 right-[6%] -rotate-20">
          <Gear size={50} />
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 0.08 }} viewport={{ once: true }} className="absolute top-[50%] right-[3%] rotate-30">
          <Lightbulb size={45} />
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <p className="text-muted font-mono text-xs mb-4 tracking-widest uppercase">Play</p>
        <h2 className="text-3xl md:text-4xl font-bold text-text mb-4 tracking-tight">Mini Games Arcade</h2>
        <p className="text-text-secondary text-sm mb-12 max-w-md">
          Take a break and play some quick games — test your reflexes, memory, and skills.
        </p>

        {/* RC Car Game — full width */}
        <div className="mb-6">
          <RCCarGame />
        </div>

        {/* Snake Game — full width */}
        <div className="mb-6">
          <div className="bg-white border border-border rounded-2xl p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🐍</span>
              <h3 className="text-sm font-semibold text-text">Snake</h3>
            </div>
            <p className="text-xs text-text-secondary mb-3">
              Classic snake — eat food, grow longer, don't hit walls or yourself!
            </p>
            <SnakeGame />
          </div>
        </div>

        {/* Breakout Game — full width */}
        <div className="mb-6">
          <div className="bg-white border border-border rounded-2xl p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🧱</span>
              <h3 className="text-sm font-semibold text-text">Breakout</h3>
            </div>
            <p className="text-xs text-text-secondary mb-3">
              Break all the bricks with the ball — move the paddle with your mouse.
            </p>
            <BreakoutGame />
          </div>
        </div>

        {/* Flappy Bird — full width */}
        <div className="mb-6">
          <div className="bg-white border border-border rounded-2xl p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🐦</span>
              <h3 className="text-sm font-semibold text-text">Flappy Bird</h3>
            </div>
            <p className="text-xs text-text-secondary mb-3">
              Tap or press Space to fly through the pipes!
            </p>
            <FlappyBird />
          </div>
        </div>

        {/* Smaller games grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white border border-border rounded-2xl p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">🧠</span>
              <h3 className="text-sm font-semibold text-text">Memory Match</h3>
            </div>
            <p className="text-xs text-text-secondary mb-4">
              Match the hardware icons. How few moves can you do it in?
            </p>
            <MemoryGame />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white border border-border rounded-2xl p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">⚡</span>
              <h3 className="text-sm font-semibold text-text">Reaction Time</h3>
            </div>
            <p className="text-xs text-text-secondary mb-4">
              How fast are your reflexes? Click as soon as you see green.
            </p>
            <ReactionGame />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white border border-border rounded-2xl p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">❌</span>
              <h3 className="text-sm font-semibold text-text">Tic Tac Toe</h3>
            </div>
            <p className="text-xs text-text-secondary mb-4">
              Classic noughts and crosses — play against a friend!
            </p>
            <TicTacToe />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white border border-border rounded-2xl p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">🎯</span>
              <h3 className="text-sm font-semibold text-text">Whack-a-Mole</h3>
            </div>
            <p className="text-xs text-text-secondary mb-4">
              Hit the moles before they disappear! 30 seconds to score.
            </p>
            <WhackAMole />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white border border-border rounded-2xl p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">🧠</span>
              <h3 className="text-sm font-semibold text-text">Simon Says</h3>
            </div>
            <p className="text-xs text-text-secondary mb-4">
              Watch the pattern and repeat it. How far can you go?
            </p>
            <SimonSays />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white border border-border rounded-2xl p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">🔢</span>
              <h3 className="text-sm font-semibold text-text">Number Guess</h3>
            </div>
            <p className="text-xs text-text-secondary mb-4">
              Guess the number between 1-100. Higher or lower hints!
            </p>
            <NumberGuess />
          </motion.div>
        </div>
      </div>
    </section>
  )
}