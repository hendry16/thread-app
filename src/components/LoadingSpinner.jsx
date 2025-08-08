import React from 'react';

function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50 backdrop-blur-sm">
      <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin" />
    </div>
  );
}

export default LoadingSpinner;
