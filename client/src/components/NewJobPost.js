import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './NewJobPost.scss';

class NewJobPost extends Component {
  state = {
    id: '',
    title: '',
    description: '',
    isFetching: false
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.setState({ id });
    id && fetch(`/api/getJob/${id}`)
      .then(response => response.json())
      .then(jsonResponse => this.setState({
        title: jsonResponse.job.title,
        description: jsonResponse.job.description,
      }));
  }

  submitJobPost = event => {
    this.setState({ isFetching: true });
    event.preventDefault();
    if (this.state.id) {
      fetch(`/api/updateJob`, {
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json'
      }
      })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          this.props.history.push('/');
        } else {
          console.log('Error: ', res.error);
        };
        
      });
    } else {
      const data = new FormData();
      data.append('title', this.state.title);
      data.append('description', this.state.description);
      data.append('file', this.uploadInput.files[0]);
        
      fetch('/api/putJob', {
        method: 'POST',
        body: data
      }).then(res => res.json())
        .then(res => {
          if (res.success) {
            this.props.history.push('/')
          } else {
            console.log('Error: ', res.error);
          }
        });
    }
  }

  changeHandler = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <section>
        { this.state.isFetching ? 
          <span>Fetching...</span>
           : 
          <form onSubmit={ this.submitJobPost }>
            <h3>Job Info</h3>
            <fieldset>
              <div className="form-group">
                <input 
                  type="text" 
                  name="title" 
                  className="form-control"
                  placeholder="Title"
                  value={ this.state.title } 
                  onChange={ this.changeHandler }
                  required
                />
              </div>
              <div className="form-group">
                <textarea 
                  name="description" 
                  rows="4" 
                  cols="50"
                  className="form-control"
                  placeholder="Description"
                  value={ this.state.description } 
                  onChange={ this.changeHandler }
                />
              </div>
              <div className="form-group">
                <label>PrintScreen: </label>
                <input 
                  ref={ (ref) => { this.uploadInput = ref }} 
                  type="file"
                  className="form-control-file"
                />
              </div>
              <div>
                <button className="btn btn-primary d-block wth-100" type="submit">Send this!</button>
              </div>
            </fieldset>
        </form>
        }
      </section>
    )
  }
}

export default withRouter(NewJobPost);
