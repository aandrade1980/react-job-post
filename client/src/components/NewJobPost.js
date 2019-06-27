import React, { useEffect, useState } from 'react';

import './NewJobPost.scss';

import Spinner from './Spinner';

import { REDIRECT_TIMEOUT } from '../utilities/constants';

function NewJobPost({ match, history }) {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('/api/getCategories')
    .then(res => res.json())
    .then(jres => setCategories(jres.data));
  }, []);

  const [job, setJob] = useState({
    title: '',
    description: '',
    company: '',
    email: '',
    category: '',
    isFetching: false,
    postSuccess: false
  });

  let uploadInput;

  useEffect(() => {
    let isSubscribed = true;
    const { id } = match.params;
    id && fetch(`/api/getJob/${id}`)
      .then(response => response.json())
      .then(jsonRes => isSubscribed && 
        setJob({
        id: jsonRes.job._id,
        title: jsonRes.job.title,
        description: jsonRes.job.description || '',
        company: jsonRes.job.company || '',
        email: jsonRes.job.email || '',
        category: jsonRes.job.category
      }));
    return () => isSubscribed = false;
  }, [match.params]);

  const submitJobPost = event => {
    setJob({ ...job, isFetching: true });
    event.preventDefault();
    if (job.id) {
      fetch(`/api/updateJob`, {
        method: 'PUT',
        mode: 'cors',
        body: JSON.stringify(job),
        headers: {
          'Content-Type': 'application/json'
      }
      })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          setJob({ 
            ...job, 
            postSuccess: true,
            isFetching: false 
          });
          setTimeout(() => {
            history.push('/');  
          }, REDIRECT_TIMEOUT);
        } else {
          console.log('Error: ', res.error);
        };
        
      });
    } else {
      const data = new FormData();
      data.append('title', job.title);
      data.append('description', job.description);
      data.append('file', uploadInput && uploadInput.files[0]);
      data.append('email', job.email);
      data.append('company', job.company);
      data.append('category', job.category);
        
      fetch('/api/putJob', {
        method: 'POST',
        body: data
      }).then(res => res.json())
        .then(res => {
          if (res.success) {
            setJob({
              ...job,
              postSuccess: true,
              isFetching: false
              });
            setTimeout(() => {
              history.push('/')  
            }, REDIRECT_TIMEOUT);
          } else {
            console.log('Error: ', res.error);
          }
        });
    }
  }

  const changeHandler = event => {
    const { name, value } = event.target;
    setJob({ ...job, [name]: value });
  }

  return (
    <div>
      { job.isFetching && <Spinner /> }
      <section>
        { job.postSuccess ?
            <div className="alert alert-success text-center w-50" role="alert">
              Job Successfully Posted!
              <i className="far fa-thumbs-up m-left-5"></i>
            </div> 
          : 
          <form className="job-info-form" onSubmit={ submitJobPost }>
            <h3 className="text-center">Job Info</h3>
            <fieldset className="border-radius-3">
              <div className="form-group">
                <input 
                  type="text" 
                  name="title"
                  autoComplete="off"
                  className="form-control"
                  placeholder="Title"
                  value={ job.title } 
                  onChange={ changeHandler }
                  required
                />
              </div>
              <div className="form-group">
                <select name="category" className="form-control" value={ job.category } onChange={ changeHandler }>
                  <option>Select a Category</option>
                    { categories.map(category => <option key={ category._id } value={ category.label }>{ category.label }</option>) }
                </select> 
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">@</span>
                </div>
                <input 
                  type="text"
                  name="email"
                  autoComplete="off"
                  className="form-control" 
                  placeholder="Email"
                  value={ job.email } 
                  onChange={ changeHandler }
                />
              </div>
              <div className="form-group">
                <input 
                  type="text" 
                  name="company"
                  autoComplete="off"
                  className="form-control"
                  placeholder="Company"
                  value={ job.company } 
                  onChange={ changeHandler }
                />
              </div>
              <div className="form-group">
                <textarea 
                  name="description" 
                  rows="4" 
                  cols="50"
                  className="form-control"
                  placeholder="Description"
                  value={ job.description} 
                  onChange={ changeHandler }
                />
              </div>
              { !match.params.id && 
                <div className="form-group">
                  <input 
                    ref={ (ref) => { uploadInput = ref }} 
                    type="file"
                    className="form-control-file"
                  />
                </div>
              }
              <div>
                <button 
                  className="btn btn-primary btn-block" 
                  type="submit" 
                  disabled={ job.isFetching }
                >
                  { job.isFetching ? 'Fetching...' : 'Send this!' }
                  <i className="far fa-paper-plane m-left-5"></i>
                </button>
              </div>
            </fieldset>
        </form>
        }
      </section>
    </div>
  )
};

export default React.memo(NewJobPost);
