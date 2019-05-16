import React, { useState } from 'react';

import './Alert.scss';

function Alert({ error, setError }) {
  const [addFadeOutClass, setAddFadeOutClass] = useState(false);

  const dismissAlert = () => {
    setTimeout(() => {
      setError(undefined);  
    }, 1000);
    setAddFadeOutClass(true);
  };

  return (
    <div 
      className={`alert alert-danger d-flex justify-content-between align-items-baseline ${addFadeOutClass && 'fadeOut'}`}
      role="alert"
    >
      { error }
      <i style={{ cursor: 'pointer', alignSelf: 'center' }} className="fas fa-times ml-5" onClick={ dismissAlert }></i>
    </div>
  )
}

export default Alert;
