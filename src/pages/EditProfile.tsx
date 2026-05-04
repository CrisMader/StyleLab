import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import styles from '../styles/Auth.module.css'

export const EditProfile = () => {
  const { user, token, updateUser } = useAuth()
  const navigate = useNavigate()
  const backendURL = import.meta.env.VITE_API_URL

  const [username, setUsername] = useState(user?.username ?? '')
  const [email, setEmail] = useState(user?.email ?? '')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  if (!user) {
    navigate('/login')
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    const body: Record<string, string> = { username, email }
    if (password) body.password = password

    try {
      const res = await fetch(`${backendURL}/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.detail ?? 'Could not save changes')
        return
      }

      const updated = await res.json()
      updateUser({ id: updated.id, username: updated.username, email: updated.email, role: updated.role })
      setPassword('')
      setSuccess(true)
    } catch {
      setError('Could not connect to the server')
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h2 className={styles.title}>Edit profile</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>Username</label>
          <input
            className={styles.input}
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />

          <label className={styles.label}>Email</label>
          <input
            className={styles.input}
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <label className={styles.label}>Password</label>
          <input
            className={styles.input}
            type="password"
            placeholder="Change password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.successMsg}>Changes saved!</p>}

          <button className={styles.submit} type="submit">Save changes</button>
        </form>
      </div>
    </div>
  )
}
