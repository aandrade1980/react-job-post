import React, { useState, useEffect } from 'react'

const JobPost = props => {

  const [job, setJob] = useState({});

  useEffect(() => {
    const { jobId } = props.match.params;
    
    jobId && fetch(`/api/getJob/${jobId}`)
      .then(response => response.json())
      .then(jsonResponse => 
        setJob({
          jobId,
          title: jsonResponse.job.title,
          description: jsonResponse.job.description,
          imgUrl: jsonResponse.job.imgUrl,
          createdAt: new Date(jsonResponse.job.createdAt),
          email: jsonResponse.job.email,
          company: jsonResponse.job.company
        })
      );
  }, []);

  const openEditForm = () => {
    const path = `/updateJob/${job.jobId}`;
      props.history.push(path);
  }

  return (
    <div className="d-flex m-top-25 justify-cont-center alg-items-center">
      { job.imgUrl && <img className="wth-55 height-55 m-right-15" alt="Job" src={ `/${job.imgUrl}` } /> }
      <div className="m-right-15">
        <h4>{ job.title }</h4>
        <h6>{ job.email }</h6>
        <h6>{ job.company }</h6>
        <h6>{ job.description }</h6>
        <h6>{ job.createdAt && job.createdAt.toDateString() }</h6>
      </div>
      <div>
        { job.title && 
          <button type="button" className="btn btn-outline-primary btn-sm" onClick={ openEditForm }>
            Edit<i className="far fa-edit m-left-5"></i>
          </button>
        }
      </div>
    </div>
  )
}



export default JobPost;
