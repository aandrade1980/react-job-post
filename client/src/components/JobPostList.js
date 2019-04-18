import React, { useState, useEffect, lazy, Suspense } from 'react'

const JobItem = lazy(() => import('./JobItem'));

const JobPostList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch('/api/getJobs')
      .then(response => response.json())
      .then(jsonResponse => setJobs(jsonResponse.data));
  }, []);

  const deleteJob = (event, id) => {
    fetch(`/api/deleteJob/${id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(response => removeJobById(response.id));
  }

  const removeJobById = jobId => setJobs(jobs.filter(job => job._id !== jobId));

  return (
    <div className="jobList-container">
      <Suspense fallback={ <div>Loading...</div>}>
        { jobs.length > 0 && jobs.map(job => {
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
          })
        }
      </Suspense>
    </div>
  )
}

export default JobPostList;
