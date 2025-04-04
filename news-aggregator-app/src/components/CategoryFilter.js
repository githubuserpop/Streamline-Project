import React from 'react';

// UC6: Filter News Feed by Category
function CategoryFilter({ category, onToggleCategory }) {
  return (
    <button
      className={`category-chip ${category.active ? 'active' : ''}`}
      onClick={() => onToggleCategory(category.id)}
    >
      {category.name}
      {category.active ? (
        <i className="fas fa-check-circle"></i>
      ) : (
        <i className="far fa-circle"></i>
      )}
    </button>
  );
}

export default CategoryFilter;
