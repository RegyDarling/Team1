import ThemeToggle from './ThemeToggle'

function Header() {
  return (
    <header className="app-header">
      <div>
        <p className="eyebrow">React Todo</p>
        <h1>Stay on top of your day.</h1>
      </div>
      <ThemeToggle />
    </header>
  )
}

export default Header
