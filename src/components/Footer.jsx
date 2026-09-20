export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-slate-900 bg-slate-950/80 text-center text-xs font-mono text-slate-500 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} Leonardo Hernández. Todos los derechos reservados.</p>
        <p className="flex items-center gap-2">
          <span>Construido con React 18, Three.js & Tailwind</span>
          <span className="text-cyan-400">•</span>
          <span className="text-emerald-400">AI-Engineered</span>
        </p>
      </div>
    </footer>
  )
}
