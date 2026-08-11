import { Mail } from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from './Icons'

export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted">
          &copy; {new Date().getFullYear()} Dhakshin Mahesh
        </p>
        <div className="flex items-center gap-5">
          <a href="https://github.com/agni-007" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-text transition-colors">
            <GitHubIcon />
          </a>
          <a href="https://linkedin.com/in/dhakshin-mahesh" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-text transition-colors">
            <LinkedInIcon />
          </a>
          <a href="mailto:dhakshinmahesh1@gmail.com" className="text-muted hover:text-text transition-colors">
            <Mail size={16} />
          </a>
        </div>
      </div>
    </footer>
  )
}
