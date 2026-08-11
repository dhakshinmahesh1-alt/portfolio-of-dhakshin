import { useState } from 'react'

const quotes = [
  { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
  { text: "I have not failed. I've just found 10,000 ways that won't work.", author: "Thomas Edison" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Stay hungry, stay foolish.", author: "Stewart Brand" },
  { text: "Move fast and break things.", author: "Mark Zuckerberg" },
  { text: "Every great developer you know got there by solving problems they were unqualified to solve.", author: "Patrick McKenzie" },
  { text: "The best error message is the one that never shows up.", author: "Thomas Fuchs" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
]

const hardwareFacts = [
  "A typical RC car motor spins at 30,000+ RPM.",
  "Solder melts at just 183C for leaded, 217C for lead-free.",
  "PWM controls motor speed by switching power on/off rapidly.",
  "I2C protocol lets multiple devices communicate with just 2 wires.",
  "Capacitors store energy and release it instantly — like a tiny battery.",
  "Hot glue is the universal fix — it holds, insulates, and fills gaps.",
  "A 9V battery can power an LED strip for about 2 hours.",
  "Wire strippers save more time than any other tool.",
  "Broken toys are the best source of free motors and gears.",
  "Electrical tape fixes almost anything temporarily.",
]

export function RandomQuote() {
  const [quote, setQuote] = useState(quotes[Math.floor(Math.random() * quotes.length)])
  const [key, setKey] = useState(0)

  const next = () => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)])
    setKey(k => k + 1)
  }

  return (
    <div className="bg-white border border-border rounded-2xl p-5 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold text-muted uppercase tracking-wider">Quote</p>
        <button onClick={next} className="text-[10px] text-muted hover:text-text transition-colors underline">
          New quote
        </button>
      </div>
      <blockquote key={key} className="text-sm text-text-secondary leading-relaxed italic">
        "{quote.text}"
      </blockquote>
      <p className="text-xs text-muted mt-2">— {quote.author}</p>
    </div>
  )
}

export function RandomFact() {
  const [fact, setFact] = useState(hardwareFacts[Math.floor(Math.random() * hardwareFacts.length)])
  const [key, setKey] = useState(0)

  const next = () => {
    setFact(hardwareFacts[Math.floor(Math.random() * hardwareFacts.length)])
    setKey(k => k + 1)
  }

  return (
    <div className="bg-[#f0f0f0] border border-border/50 rounded-2xl p-5 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold text-muted uppercase tracking-wider">Hardware Fact</p>
        <button onClick={next} className="text-[10px] text-muted hover:text-text transition-colors underline">
          Another fact
        </button>
      </div>
      <p key={key} className="text-sm text-text-secondary leading-relaxed">
        {fact}
      </p>
    </div>
  )
}
