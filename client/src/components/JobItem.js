/* eslint-disable no-restricted-globals */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import './JobItem.scss';

function JobItem({ jobId, title, description, imgUrl, createdAt, deleteJob, history }) {
  const createdAtDate =  new Date(createdAt);
  
  const routeChange = e => {
    if (e.target.tagName !== 'BUTTON') {
      const path = `/new-post/${jobId}`;
      history.push(path);
    }
  }

  return (
    <div className="jobCard" onClick={ routeChange }>
      <button type="button" className="btn btn-danger" style={ styles.button } onClick={ () => deleteJob(event, jobId) }>Delete</button>
      <h5>{ title }</h5>
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

export default withRouter(JobItem);
