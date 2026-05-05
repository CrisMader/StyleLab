import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import styles from '../styles/Header.module.css'

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
)

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
)

export const Header = () => {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    setOpen(false)
    navigate('/')
  }

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <img src="/images/stylelab.png" alt="" className={styles.logoImg} />
        <span>StyleLab</span>
      </Link>

      <nav className={styles.navCenter}>
        {user && <Link to="/favorites" className={styles.navLink}>Favorites</Link>}
        <Link to="/about" className={styles.navLink}>About</Link>
      </nav>

      <div className={styles.navRight}>
        <button
          type="button"
          className={styles.themeToggle}
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>

        {user ? (
          <div className={styles.userMenu} ref={dropdownRef}>
            <button className={styles.userButton} onClick={() => setOpen(o => !o)}>
              {user.username} <span className={styles.caret}>▾</span>
            </button>

            {open && (
              <div className={styles.dropdown}>
                <Link to="/edit" className={styles.dropdownItem} onClick={() => setOpen(false)}>
                  Edit profile
                </Link>
                <button className={styles.dropdownItem} onClick={handleLogout}>
                  Log out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className={styles.btnGhost}>Log in</Link>
            <Link to="/register" className={styles.btnPrimary}>Sign up</Link>
          </>
        )}
      </div>
    </header>
  )
}
