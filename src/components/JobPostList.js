import React, { useState, useEffect } from 'react'

import JobItem from './JobItem';

const JobPostList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch('/api/getJobs')
      .then(response => response.json())
      .then(jsonResponse => setJobs(jsonResponse.data));
  }, []);

  const deleteJob = id => {
    fetch(`/api/deleteJob/${id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(response => removeJobById(response.id));
  }

  const removeJobById = jobId => setJobs(jobs.filter(job => job._id !== jobId));

  return (
    <div className="jobList-container">
      { !jobs.length ? 'No Jobs Yet...' : jobs.map(job => {
        return (
          <JobItem 
            key={ job._id }
            jobId={ job._id }
            title={ job.title } 
            description={ job.description } 
            imgUrl={ job.imgUrl }
            createdAt={ job.createdAt }
            deleteJob={ deleteJob }
          />
        )
      }) }
    </div>
  )
}

export default JobPostList;
