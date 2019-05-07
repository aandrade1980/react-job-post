import React from 'react'

function Alert({ error, setError }) {
  return (
    <div className="alert alert-danger wth-50 d-flex justify-content-around align-items-baseline" role="alert">
      { error }
      <i style={{ cursor: 'pointer' }} className="fas fa-times ml-5" onClick={ () => setError(undefined) }></i>
    </div>
  )
}

export default Alert;
