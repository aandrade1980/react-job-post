import React from 'react';
import PropTypes from 'prop-types';

import './JobItem.scss';

export default function JobItem({ jobId, title, description, imgUrl, deleteJob }) {
  return (
    <div className="jobCard">
      <button type="button" className="btn btn-danger" style={ styles.button } onClick={ () => deleteJob(jobId) }>Delete</button>
      <h4>{ title }</h4>
      <p style={ styles.p }>{ description }</p>
      <img style={ styles.img } alt="Job" src={ imgUrl } />
    </div>  
  )
}

const styles = {
  img: { maxWidth: '100%' },
  p: { whiteSpace: 'pre-line' },
  button: {
    float: 'right'
  }
}

JobItem.propTypes = {
  jobId: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  imgUrl: PropTypes.string,
  deleteJob: PropTypes.func
};
