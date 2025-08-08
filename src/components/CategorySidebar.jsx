import PropTypes from 'prop-types';
import React from 'react';
import CategoryItem from './CategoryItem';

function CategorySidebar({ categories, onSelectCategory, selectedCategory }) {
  return (
    <nav className="m-3 p-3 shadow rounded-lg backdrop-blur-xl bg-white/30">
      <h2 className="text-xl font-semibold text-gray-800">Kategori</h2>
      <ul className="flex flex-wrap gap-x-2 gap-y-3 my-4">
        <li>
          <CategoryItem
            category="Semua"
            onClick={() => onSelectCategory(null)}
            isActive={selectedCategory === null}
          />
        </li>

        {categories.map((category) => (
          <li key={category}>
            <CategoryItem
              category={category}
              onClick={() => onSelectCategory(category)}
              isActive={selectedCategory === category}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}

CategorySidebar.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onSelectCategory: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string.isRequired,
};

export default CategorySidebar;
