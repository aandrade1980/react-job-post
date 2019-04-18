import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './NewJobPost.scss';

class NewJobPost extends Component {
  state = {
    id: '',
    title: '',
    description: '',
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
      <form onSubmit={ this.submitJobPost }>
        <fieldset>
          <legend>Job Info</legend>
          <div>
            <label htmlFor="title">Title:</label>
            <input 
              type="text" 
              name="title" 
              value={ this.state.title } 
              onChange={ this.changeHandler }
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea 
              name="description" 
              rows="4" 
              cols="50"
              value={ this.state.description } 
              onChange={ this.changeHandler }
            />
          </div>
          <div>
            <label>PrintScreen: </label>
            <input 
              ref={ (ref) => { this.uploadInput = ref }} 
              type="file" 
            />
          </div>
          <div className="button">
            <button type="submit">Send this!</button>
          </div>
        </fieldset>
      </form>
    )
  }
}

export default withRouter(NewJobPost);
