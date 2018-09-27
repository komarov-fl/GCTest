import React, { Component } from 'react';


export default class GalleryItem extends Component {
  render() {
    const {item} = this.props;
    return (
      <li>
        <img onClick={()=> {this.props.onOpenModal(item)}} src={item.url} alt="" />
      </li>
    )
  }
}