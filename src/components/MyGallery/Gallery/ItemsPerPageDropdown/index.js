import React, { Component } from 'react';

export default class ItemsPerPageDropdown extends Component {

  handleChange = (event) => {
    this.props.onChange(event.target.value);
  }

  render() {
    const selected = parseInt(this.props.selected, 10);
    return (
      <div className="gallery__items-per-page-dropdown">
        <label>
          Items per page: 
          <select value={selected} onChange={this.handleChange}>
            {
              [5,10,15,20].map(value => <option key={value} value={value}>{value}</option>)
            }
          </select>
        </label>
      </div>
    )
  }
}