import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const JobPost = ({ match, history }) => {
  const [job, setJob] = useState({});

  useEffect(() => {
    let isSubscribed = true;
    const { jobId } = match.params;

    jobId &&
      fetch(`/api/getJob/${jobId}`)
        .then(response => response.json())
        .then(jsonResponse => {
          isSubscribed &&
            setJob({
              jobId,
              title: jsonResponse.job.title,
              description: jsonResponse.job.description,
              imgUrl: jsonResponse.job.imgUrl,
              createdAt: new Date(jsonResponse.job.createdAt),
              email: jsonResponse.job.email,
              company: jsonResponse.job.company,
              category: jsonResponse.job.category
            });
        });
    return () => (isSubscribed = false);
  }, [match.params]);

  const openEditForm = () => {
    const path = `/updateJob/${job.jobId}`;
    history.push(path);
  };

  dayjs.extend(relativeTime);

  return (
    <div className="jobContainer d-flex m-top-25 justify-content-center alg-items-center">
      {job.imgUrl && (
        <img
          className="wth-55 height-55 m-right-15 max-wth-650"
          alt="Job"
          src={`/${job.imgUrl}`}
        />
      )}
      <div className="jobInfo m-right-15 max-wth-33">
        <h4>{job.title}</h4>
        <h5>{job.category}</h5>
        <h6>{job.email}</h6>
        <h6>{job.company}</h6>
        <p className="white-space-pw">{job.description}</p>
        <h6>{job.createdAt && dayjs(job.createdAt).fromNow()}</h6>
      </div>
      <div className="jobEditButtonContainer">
        {job.title && (
          <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            onClick={openEditForm}
          >
            Edit
            <i className="far fa-edit m-left-5" />
          </button>
        )}
      </div>
    </div>
  );
};

JobPost.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object
};

export default React.memo(JobPost);
