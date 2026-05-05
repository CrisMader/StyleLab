import styles from '../styles/About.module.css'

export const About = () => (
  <div className={styles.page}>
    <h1 className={styles.heading}>About StyleLab</h1>

    <p className={styles.lead}>
      StyleLab is a curated collection of reusable CSS snippets designed to help developers
      build better interfaces, faster.
    </p>
    <p className={styles.body}>
      Browse through buttons, cards, animations, form inputs, and more — each with a live
      preview, clean code, and copy-paste simplicity. No frameworks required, just pure CSS
      ready to drop into your project.
    </p>

    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Why StyleLab?</h2>
      <p className={styles.body}>
        Modern web development moves fast. StyleLab gives you production-ready CSS components
        you can trust — well-structured, accessible, and battle-tested. Whether you're
        prototyping a new feature or polishing a production app, you'll find snippets that
        just work.
      </p>
    </section>

    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Built with</h2>
      <ul className={styles.stack}>
        <li className={styles.stackItem}>
          <span className={styles.stackLabel}>Frontend</span>
          <span>React + TypeScript</span>
        </li>
        <li className={styles.stackItem}>
          <span className={styles.stackLabel}>Backend</span>
          <span>Python (FastAPI) + PostgreSQL</span>
        </li>
        <li className={styles.stackItem}>
          <span className={styles.stackLabel}>Design</span>
          <span>CSS Modules, no frameworks</span>
        </li>
      </ul>
    </section>

    <hr className={styles.divider} />

    <p className={styles.footnote}>
      StyleLab is an open-source project created by <strong>Mader</strong> as a portfolio
      demonstration of full-stack development skills.
    </p>
  </div>
)
