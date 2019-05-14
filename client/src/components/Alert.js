import React from 'react';

import './Alert.scss';

function Alert({ error, setError }) {
  return (
    <div 
      className="alert alert-danger d-flex justify-content-between align-items-baseline" 
      role="alert"
    >
      { error }
      <i style={{ cursor: 'pointer', alignSelf: 'center' }} className="fas fa-times ml-5" onClick={ () => setError(undefined) }></i>
    </div>
  )
}

export default Alert;
