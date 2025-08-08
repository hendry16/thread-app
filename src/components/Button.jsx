import PropTypes from 'prop-types';
import React from 'react';

function Button({ text, type, hidden }) {
  return (
    <button type={type} className={`p-2 w-full rounded-lg bg-blue-400 hover:bg-blue-500 text-white font-semibold ${hidden && 'hidden'}`}>
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  hidden: PropTypes.bool,
};

Button.defaultProps = {
  type: 'submit',
  hidden: false,
};

export default Button;
