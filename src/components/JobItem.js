import React from 'react';
import PropTypes from 'prop-types';

import './JobItem.scss';

export default function JobItem({ jobId, title, description, imgUrl, createdAt, deleteJob }) {
  const createdAtDate =  new Date(createdAt);
  console.log("createdAtDate => ", createdAtDate);
  
  return (
    <div className="jobCard">
      <button type="button" className="btn btn-danger" style={ styles.button } onClick={ () => deleteJob(jobId) }>Delete</button>
      <h4>{ title }</h4>
      <p style={ styles.p }>{ description }</p>
      <img style={ styles.img } alt="Job" src={ imgUrl } />
      <span>Upload on: { createdAtDate.toDateString() }</span>
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
  createdAt: PropTypes.string,
  deleteJob: PropTypes.func
};
