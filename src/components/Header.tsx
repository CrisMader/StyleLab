import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import styles from '../styles/Header.module.css'

export const Header = () => {
  const { user, logout } = useAuth()
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
      <Link to="/" className={styles.logo}>StyleLab</Link>

      <nav className={styles.navCenter}>
        {user && <Link to="/favorites" className={styles.navLink}>Favorites</Link>}
        <Link to="/about" className={styles.navLink}>About</Link>
      </nav>

      <div className={styles.navRight}>
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
