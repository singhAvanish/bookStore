import React from 'react';

const Toast = ({ message }) => {
  if (!message) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      backgroundColor: '#333',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '5px',
      zIndex: 1000
    }}>
      {message}
    </div>
  );
};

export default Toast;
