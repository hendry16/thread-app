import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';

function Textarea({
  placeholder, value, onChange, rows,
}) {
  const textareaRef = useRef(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
    }
  }, [value]);

  return (
    <textarea
      className="p-2 border text-m rounded-lg resize-none overflow-hidden focus:outline-none focus:ring-1 focus:ring-blue-300 w-full"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      ref={textareaRef}
    />
  );
}

Textarea.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  rows: PropTypes.number.isRequired,
};

export default Textarea;
