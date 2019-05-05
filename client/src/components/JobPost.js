import React, { useEffect, useState } from 'react';

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
          company: jsonResponse.job.company,
          category: jsonResponse.job.category
        })
      );
  }, [props.match.params]);

  const openEditForm = () => {
    const path = `/updateJob/${job.jobId}`;
      props.history.push(path);
  }

  return (
    <div className="jobContainer d-flex m-top-25 justify-cont-center alg-items-center">
      { job.imgUrl && <img className="wth-55 height-55 m-right-15 max-wth-650" alt="Job" src={ `/${job.imgUrl}` } /> }
      <div className="jobInfo m-right-15 max-wth-33">
        <h4>{ job.title }</h4>
        <h5>{ job.category }</h5>
        <h6>{ job.email }</h6>
        <h6>{ job.company }</h6>
        <p className="white-space-pw">{ job.description }</p>
        <h6>{ job.createdAt && job.createdAt.toDateString() }</h6>
      </div>
      <div className="jobEditButtonContainer">
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
