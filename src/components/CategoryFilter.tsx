import styles from '../styles/CategoryFilter.module.css'

interface CategoriesFilterProps {
  categories: string[]
  selected: string
  onSelected: (param: string) => void
}

export const CategoryFilter = ({ categories, selected, onSelected }: CategoriesFilterProps) => {
  const all = ['All', ...categories]

  return (
    <div className={styles.filters}>
      {all.map(category => (
        <button
          key={category}
          onClick={() => onSelected(category)}
          className={`${styles.pill} ${selected === category ? styles.pillActive : ''}`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
