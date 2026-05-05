import styles from '../styles/App.module.css'

export const About = () => (
  <div className={styles.page}>
    <h1 className={styles.heading}>About</h1>
    <p className={styles.subheading}>
      StyleLab is a curated gallery of CSS snippets — built as a personal portfolio project.
    </p>
    <p className={styles.status}>More content coming soon.</p>
  </div>
)
