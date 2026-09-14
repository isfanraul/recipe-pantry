import './CategoryList.css';

export function CategoryList({ categories }) {
  return (
    <div className="recipe-categories">
      {categories.map((category) => {
        return (
          <div
            key={`recipe-badge-${category.id}`}
            className="category-badge"
            style={{ backgroundColor: category.color ?? '#ccc' }}
          >
            {category.name}
          </div>
        );
      })}
    </div>
  );
}
