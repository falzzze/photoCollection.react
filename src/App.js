import React, { useEffect, useState } from 'react';

import { Collection } from './Collection';
import './index.scss';



function App() {

  const [collections, setCollections] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [page, setPage] = useState(1);

  const cats = [
    { "name": "Все" },
    { "name": "Море" },
    { "name": "Горы" },
    { "name": "Архитектура" },
    { "name": "Города" }
  ]

  useEffect(() => {
    setIsLoading(true);

    const category = categoryId ? `category=${categoryId}` : '';

    fetch(`https://64b8521b21b9aa6eb079c726.mockapi.io/photoz?page=${category}${page}&limit=3&`)
    .then(res => res.json())
    .then(json => {
      setCollections(json)
    }).catch(err => console.warn(err))
    .finally(setIsLoading(false))
  }, [categoryId, page])


  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {
            cats.map((obj, index) => (
              <li onClick={() => setCategoryId(index)} className={categoryId === index ? 'active' : ''} key={obj.name}>{obj.name}</li>
            ))
          }
        </ul>
        <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className="search-input" placeholder="Поиск по названию" />
      </div>
      <div className="content">
        {
          isLoading ? <h2>Идет загрузка...</h2> :
          collections
          .filter(obj => {
            return obj.name.toLowerCase().includes(searchValue.toLocaleLowerCase())
          })
          .map((obj, index) => (
            <Collection
              key={index}
              name={obj.name}
              images={obj.photos}
            />
          ))
        }
      </div>
      <ul className="pagination">
        {
          [...Array(5)].map((_, index) => (
            <li onClick={() => setPage(index+1)} className={page === index+1 ? 'active' : ''} key={index}>{index+1}</li>
          ))
          
        }
      </ul>
    </div>
  );
}

export default App;
