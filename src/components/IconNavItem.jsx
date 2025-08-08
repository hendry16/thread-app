import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function IconNavItem({
  icon: Icon, label, to, onClick,
}) {
  const className = 'flex flex-col items-center text-gray-500 hover:text-blue-300 cursor-pointer bg-transparent border-0 p-0';
  return to ? (
    <Link to={to} className={className}>
      <Icon className="w-5 h-5 mb-1" />
      <span className="text-sm font-semibold">{label}</span>
    </Link>
  ) : (
    <button type="button" onClick={onClick} className={className}>
      <Icon className="w-5 h-5 mb-1" />
      <span className="text-sm font-semibold">{label}</span>
    </button>
  );
}

IconNavItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  to: PropTypes.string,
  onClick: PropTypes.func,
};

IconNavItem.defaultProps = {
  to: null,
  onClick: undefined,
};

export default IconNavItem;
