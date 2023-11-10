import React from 'react'
import { FaSearch } from 'react-icons/fa';


const SearchBox = () => {
  return (
    <div className="elementor-widget-container">
      <form
        className="hp-form--wide hp-form--primary hp-block hp-form hp-form--listing-search"
        action="https://collegesuvidha.in"
        method="GET"
        data-component="form"
        style={{padding:'0 1rem'}}
      >
        <div className="hp-form__messages" data-component="messages"></div>
        <div className="hp-form__fields">
          <input type="hidden" name="post_type" value="hp_listing" className="hp-field hp-field--hidden" />
          <select name="_category" className="hp-field hp-field--hidden">
            <option value="">All Categories</option>
            <option value="57">Bag</option>
            <option value="50">Bicycle</option>
            <option value="63">Book</option>
            <option value="52">Calculator</option>
            <option value="58">Chair</option>
            <option value="54">Cooler</option>
            <option value="56">Dumbbell</option>
            <option value="53">Electric kettle</option>
            <option value="55">Lab Dress</option>
            <option value="51">Mattress</option>
            <option value="62">other</option>
            <option value="64">Shoes</option>
          </select>
          <div className="hp-form__field hp-form__field--search">
            <input type="search" name="s" value="" placeholder="Keywords" maxLength="256" className="hp-field hp-field--search" />
          </div>
        </div>
        <div className="hp-form__footer">
          <button type="submit" className="hp-form__button button alt button hp-field hp-field--submit" style={{padding: '0.5rem 1rem 1.5rem 1rem',height:'1rem',fontSize:'1rem'}} >
            <span><FaSearch /></span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBox;

