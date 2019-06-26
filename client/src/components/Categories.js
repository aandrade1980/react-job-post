import React, { useState, useEffect } from 'react';

function Categories() {

  const [category, setCategory] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);
  
  const changeHandler = event => {

    console.log("onChange={ changeHandler }");
    
    const { value } = event.target;
    setCategory({ label: value });
  }

  const createCategory = event => {
    event.preventDefault();

    const data = new FormData();
    data.append('label', category.label);

    fetch('/api/putCategory', {
      method: 'POST',
      body: data
    }).then(res => res.json())
      .then(res => {
        if (res.success) {
          getCategories();
        } else {
          console.log('Error: ', res.error);
        }
      });
  }

  const getCategories = () => {
    fetch('/api/getCategories')
    .then(res => res.json())
    .then(jres => setCategories(jres.data));
  }

  return (
    <div>
      <input type='text' placeholder="Enter category..." onChange={ changeHandler } />
      <button onClick={ createCategory }>Create!</button>
      <div>
        <ul style={{ display: 'list-item'}}>
          { categories.length > 0 && categories.map(category => {
            console.log("Categoty => ", category);
            return (
              <li key={ category._id }>{ category.label }</li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Categories;
