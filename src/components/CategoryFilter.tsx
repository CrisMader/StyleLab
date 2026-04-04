interface CategoriesFilterProps {
    categories: string[]
    onSelected: (param: string) => void
}

export const CategoryFilter = ({ categories, onSelected}: CategoriesFilterProps) =>{

    return(
        <>
        <button onClick={() => onSelected('All')}>All</button>
        {categories.map(category => (
            <button onClick={() => onSelected(category)} key={category}>{category}</button>
        ))}
        </>
    )
}