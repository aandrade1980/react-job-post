import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import "./JobItem.scss";

function JobItem({ jobId, title, imgUrl, deleteJob, history }) {
  const routeChange = e => {
    if (e.target.tagName !== "BUTTON") {
      const path = `/jobPost/${jobId}`;
      history.push(path);
    }
  };

  return (
    <div
      className="jobCard"
      onClick={routeChange}
      onKeyDown={routeChange}
      role="button"
      tabIndex="0"
    >
      <button
        type="button"
        className="btn btn-outline-danger btn-sm"
        style={styles.button}
        onClick={() => deleteJob(jobId)}
      >
        Delete
        <i className="far fa-trash-alt m-left-5" />
      </button>
      <h5>{title}</h5>
      {imgUrl && <img style={styles.img} alt="Job" src={imgUrl} />}
    </div>
  );
}

const styles = {
  img: {
    maxWidth: "100%",
    marginTop: "10px"
  },
  button: {
    float: "right"
  }
};

JobItem.propTypes = {
  jobId: PropTypes.string,
  title: PropTypes.string,
  imgUrl: PropTypes.string,
  deleteJob: PropTypes.func,
  history: PropTypes.object
};

export default withRouter(React.memo(JobItem));
