import React from 'react';

function Alert(props: { error: string, setError: Function }) {
  return (
    <div style={{ minWidth: '450px' }} className="alert alert-danger w-25 d-flex justify-content-between align-items-baseline" role="alert">
      { props.error }
      <i style={{ cursor: 'pointer' }} className="fas fa-times ml-5" onClick={ () => props.setError(undefined) }></i>
    </div>
  )
}

export default Alert;
