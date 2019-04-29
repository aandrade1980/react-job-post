import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './NewJobPost.scss';

const timeOut = 2000;

class NewJobPost extends Component {
  state = {
    id: '',
    title: '',
    description: '',
    isFetching: false,
    postSuccess: false
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
          this.setState({ 
            postSuccess: true,
            isFetching: false 
          });
          setTimeout(() => {
            this.props.history.push('/');  
          }, timeOut);
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
            this.setState({ 
              postSuccess: true,
              isFetching: false
             });
            setTimeout(() => {
              this.props.history.push('/')  
            }, timeOut);
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
        { this.state.postSuccess ?
            <div className="alert alert-success txt-align-center wth-50" role="alert">
              Job Successfully Posted!
              <i className="far fa-thumbs-up m-left-5"></i>
            </div> 
          : 
          <form onSubmit={ this.submitJobPost }>
            <h3 className="txt-align-center">Job Info</h3>
            <fieldset className="border-radius-3">
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
                <input 
                  ref={ (ref) => { this.uploadInput = ref }} 
                  type="file"
                  className="form-control-file"
                />
              </div>
              
              <div>
                <button 
                  className="btn btn-primary btn-block" 
                  type="submit" 
                  disabled={ this.state.isFetching }
                >
                  { this.state.isFetching ? 'Fetching...' : 'Send this!' }
                  <i className="far fa-paper-plane m-left-5"></i>
                </button>
              </div>
            </fieldset>
        </form>
        }
      </section>
    )
  }
}

export default withRouter(NewJobPost);
