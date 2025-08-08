import PropTypes from 'prop-types';
import React from 'react';

function IconActionItem({
  icon: Icon, onClick, value, isUpVoted, isDownVoted,
}) {
  const iconClassName = `h-5 w-5  ${(isUpVoted || isDownVoted) ? 'text-red-500' : 'text-gray-700'}`;

  return (
    <div className="flex items-center space-x-1">
      <button
        type="button"
        onClick={onClick}
        className={`${onClick ? 'cursor-pointer' : 'cursor-default'}`}
      >
        <Icon className={iconClassName} />
      </button>
      <span className="text-sm font-medium text-gray-600 relative top-[1px]">{value}</span>
    </div>
  );
}

IconActionItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  onClick: PropTypes.func,
  value: PropTypes.number.isRequired,
  isUpVoted: PropTypes.bool,
  isDownVoted: PropTypes.bool,
};

IconActionItem.defaultProps = {
  isUpVoted: false,
  isDownVoted: false,
  onClick: () => {},
};

export default IconActionItem;
