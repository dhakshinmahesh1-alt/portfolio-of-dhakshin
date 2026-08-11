import { useState, useEffect, useRef } from 'react'

const quotes = [
  { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
  { text: "I have not failed. I've just found 10,000 ways that won't work.", author: "Thomas Edison" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Stay hungry, stay foolish.", author: "Stewart Brand" },
  { text: "Move fast and break things.", author: "Mark Zuckerberg" },
  { text: "Hardware is the soup, software is the spice.", author: "Unknown" },
  { text: "Every great developer you know got there by solving problems they were unqualified to solve.", author: "Patrick McKenzie" },
  { text: "The best error message is the one that never shows up.", author: "Thomas Fuchs" },
]

const hardwareFacts = [
  "LED strips use WS2812B chips — each LED has its own IC built in.",
  "A typical RC car motor spins at 30,000+ RPM.",
  "Solder melts at just 183°C (361°F) for leaded, 217°C for lead-free.",
  "ESP32 has dual-core 240MHz processors — more powerful than early laptops.",
  "NeoPixel LEDs can display 16.7 million colors each.",
  "A drone's flight controller processes sensor data 1000+ times per second.",
  "PWM (Pulse Width Modulation) controls motor speed by switching power on/off rapidly.",
  "I2C protocol lets multiple devices communicate with just 2 wires.",
  "Capacitors can store energy and release it instantly — like a tiny battery.",
  "The average human eye can detect a single photon of light.",
]

export function RandomQuote() {
  const [quote, setQuote] = useState(quotes[0])
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
  const [fact, setFact] = useState(hardwareFacts[0])
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
