import React from 'react';

function Alert({ error, setError }) {
  return (
    <div style={{ minWidth: '450px', position: 'absolute', top: '60px', right: 0, left: 0 }} className="alert alert-danger w-25 d-flex justify-content-between align-items-baseline" role="alert">
      { error }
      <i style={{ cursor: 'pointer' }} className="fas fa-times ml-5" onClick={ () => setError(undefined) }></i>
    </div>
  )
}

export default Alert;
