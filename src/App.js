import React, { useEffect, useState,Component } from 'react';
import Recipe from './Recipe';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';
import './App.css';
import 'bootstrap-4-react';

const axios = require('axios');

const App = () =>{

  const APP_ID = "a0a32fd7";
  const APP_KEY = "01a63357cb67b67d339e62f61be78f63";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

  useEffect(()=>{
    getRecipes();
  },[query]);

  const getRecipes = async () => {

    // response by axios
    axios.get(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    .then( (response) => {
      console.log(response);
      const data = response.data;
      console.log(data);
      setRecipes(data.hits);
      console.log(data.hits);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });

    // response by fetch
    // const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    // const data = await response.json();
    // setRecipes(data.hits);
    // console.log(data.hits);
  }

  const updateSearch = e =>{
    setSearch(e.target.value);
    console.log(search);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };

  // handlePageClick = (data) => {
  //   let selected = data.selected;
  //   let offset = Math.ceil(selected * this.props.perPage);

  //   this.setState({ offset: offset }, () => {
  //     this.loadCommentsFromServer();
  //   });
  // };

  return(
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">search</button>
      </form>
      <div className="recipes">
      {recipes.map(recipe => (
        <Recipe
          key={recipe.recipe.label}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
        />
      ))}
      {/* <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        /> */}
      </div>
    </div>
  );
};

export default App;
