import React, { Component } from 'react';

export default class SearchInput extends Component {

  handleChange = (event) => {
    this.props.onChange(event.target.value);
  }

  render() {
    
    return (
      <div className="gallery__search-input">
        <label>
          Search: 
          <input type="text" onChange={this.handleChange} placeholder="search" value={this.props.seachString}/>
        </label>
      </div>
    )
  }
}