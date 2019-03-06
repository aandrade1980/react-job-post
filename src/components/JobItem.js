import React from 'react';
import PropTypes from 'prop-types';

export default function JobItem({ jobId, title, description, imgUrl, deleteJob }) {
  return (
    <div style={ styles.card }>
      <button style={ styles.button } onClick={ () => deleteJob(jobId) }>Delete</button>
      <h4>{ title }</h4>
      <p style={ styles.p }>{ description }</p>
      <img style={ styles.img } alt="Job" src={ imgUrl } />
    </div>
  )
}

const styles = {
  card: {
    width: '500px',
    margin: '1rem auto',
    textAlign: 'center',
    backgroundColor: '#fff',
    backgroundClip: 'border-box',
    border: '1px solid rgba(0,0,0,.125)',
    borderRadius: '.25rem'
  },
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
