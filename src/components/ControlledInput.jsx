import PropTypes from 'prop-types';
import React from 'react';

function ControlledInput({
  type, placeholder, value, onChange,
}) {
  return (
    <input
      className="p-2 border text-m rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-300"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
    />
  );
}

ControlledInput.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ControlledInput;
