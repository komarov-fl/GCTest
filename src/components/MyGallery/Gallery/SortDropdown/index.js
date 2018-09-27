import React, { Component } from 'react';

export default class SortDropdown extends Component {

  handleChange = (event) => {
    this.props.onChange(event.target.value);
  }

  render() {
    return (
      <div className="gallery__sort-dropdown">
        <label>
          Sort: 
          <select onChange={this.handleChange}>
            <option value="">none</option>
            <option value="date">date</option>
            <option value="title">title</option>
          </select>
        </label>
      </div>
    )
  }
}