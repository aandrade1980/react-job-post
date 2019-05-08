import React from 'react';

function Alert({ error, setError }) {
  return (
    <div style={{ minWidth: '450px' }} className="alert alert-danger w-25 d-flex justify-content-between align-items-baseline" role="alert">
      { error }
      <i style={{ cursor: 'pointer' }} className="fas fa-times ml-5" onClick={ () => setError(undefined) }></i>
    </div>
  )
}

export default Alert;
