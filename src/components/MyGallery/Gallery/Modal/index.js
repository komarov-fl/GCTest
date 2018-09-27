import React, { Component } from 'react';

export default class Modal extends Component {

  render() {
    const {item} = this.props;
    
    return (
      <div onClick={this.props.onCloseModal} className="gallery__modal-overlay">
        
        <div className="gallery__modal-content">
          <img src={item.url} alt="" />
        </div>
      </div>
    )
  }
}