import PropTypes from 'prop-types';
import React from 'react';

function CategoryItem({ category, onClick, isActive = false }) {
  return (
    <button
      className={onClick ? 'cursor-pointer' : 'cursor-default'}
      onClick={onClick}
    >
      <span
        className={`border px-4 py-1 rounded-xl text-sm
          ${isActive
          ? 'bg-blue-500 text-white border-blue-500'
          : 'border-blue-200 bg-blue-100 text-gray-700 hover:bg-blue-200'}
        `}
      >
        {category}
      </span>
    </button>
  );
}

CategoryItem.propTypes = {
  category: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  isActive: PropTypes.func.isRequired,
};

CategoryItem.defaultProps = {
  onClick: null,
};

export default CategoryItem;
