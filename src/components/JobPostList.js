import React, { Component } from 'react'

import JobItem from './JobItem';

export default class JobPostList extends Component {

  state = {
    jobs: []
  }

  componentDidMount() {
    this.getJobsFromDb();
  }

  getJobsFromDb = () => {
    fetch('/api/getJobs')
      .then(data => data.json())
      .then(res => this.setState({ jobs: res.data}))
  }

  deleteJob = id => {
    fetch(`/api/deleteJob/${id}`, {
      method: 'DELETE'
    }).then(res => {
      if (res.status === 200) {
        this.getJobsFromDb();
      }
    })
  }

  render() {
    const { jobs } = this.state;
    return (
      <>
        { !jobs.length ? 'No Jobs Yet...' : jobs.map(job => {
          return (
            <JobItem 
              key={ job._id }
              jobId={ job._id }
              title={ job.title } 
              description={ job.description } 
              imgUrl={ job.imgUrl }
              deleteJob={ this.deleteJob }
            />
          )
        }) }
      </>
    )
  }
}
