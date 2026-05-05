import styles from '../styles/Footer.module.css'

export const Footer = () => (
  <footer className={styles.footer}>
    <p className={styles.name}>
      Cristian Trapiello <span className={styles.separator}>|</span> Mader
    </p>
    <div className={styles.links}>
      <a href="https://www.linkedin.com/in/cristian-trapiello" target="_blank" rel="noreferrer">LinkedIn</a>
      <span className={styles.separator}>·</span>
      <a href="https://github.com/CrisMader" target="_blank" rel="noreferrer">GitHub</a>
      <span className={styles.separator}>·</span>
      <a href="mailto:mader.projects@gmail.com?subject=Hi%20from%20StyleLab">Contact me</a>
    </div>
  </footer>
)
