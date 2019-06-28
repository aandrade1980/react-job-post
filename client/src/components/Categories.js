import React, { useState, useEffect } from 'react';

function Categories() {

  const [category, setCategory] = useState({});
  const [categories, setCategories] = useState([]);
  const [errMessage, setErrMessage] = useState(undefined);

  useEffect(() => {
    getCategories();
  }, []);
  
  const changeHandler = event => {
    setErrMessage(undefined);
    
    const { value } = event.target;
    setCategory({ label: value });
  }

  const createCategory = event => {
    setErrMessage(undefined);
    event.preventDefault();

    if (!category.label) {
      setErrMessage('Please enter a category');
      return false;
    }

    const data = new FormData();
    data.append('label', category.label);

    fetch('/api/putCategory', {
      method: 'POST',
      body: data
    })
    .then(res => res.json())
    .then(res => res.success ? getCategories() : console.error(res.error))
    .catch(error => console.error(error));
  }

  const getCategories = () => {
    fetch('/api/getCategories')
    .then(res => res.json())
    .then(jres => setCategories(jres.data));
  }

  const removeCategory = categoryId => {
    const data = new FormData();
    data.append('catId', categoryId);

    fetch('/api/deleteCat', {
      method: 'POST',
      body: data
    })
    .then(res => res.json())
    .then(() => getCategories())
    .catch(err => console.error('Error deleting category ', err));
  }

  return (
    <div style={{ margin: 50 }}>
      <input 
        type='text' 
        style={{ marginRight: 10, display: 'inline-block', width: 250 }} 
        placeholder="Enter category..." 
        onChange={ changeHandler }
        className="form-control"
      />
      <button 
        className="btn btn-outline-primary" 
        onClick={ createCategory }
      >
        Create
      </button>
      { errMessage && <span style={{ display: 'block', color: 'rgb(179, 15, 15)' }}><i className="fas fa-exclamation-circle"></i> { errMessage }</span> }
      <ul style={{ display: 'list-item', paddingLeft: 0, marginTop: 15 }}>
        { categories.length > 0 && categories.map(category => {
          return (
            <li style={{ marginTop: 5 }} key={ category._id }>
              - { category.label }  <i className="far fa-trash-alt" style={{ color: '#b30f0f', cursor: 'pointer', marginLeft: 5 }} onClick={ () => removeCategory(category._id) }></i>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Categories;
