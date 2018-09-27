import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

import GalleryItem from './GalleryItem';
import Pagination from './Pagination';
import SortDropdown from './SortDropdown';
import SearchInput from './SearchInput';
import ItemsPerPageDropdown from './ItemsPerPageDropdown';
import Modal from './Modal';


export default class Gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      sortParam: '',
      searchString: '',
      itemsPerPage: props.itemsPerPage,
      autoRotateStop: false,
      modalItem: false,
    }
  } 

  handlePrevClick = (page) => {
    this.setState({
      page
    });
  }

  handleNextClick = (page) => {
    this.setState({
      page
    });
  }

  handleSort = (sortParam) => {
    this.setState({
      page: 1,
      sortParam
    });
  }

  handleSearch = (searchString) => {
    this.setState({
      page: 1,
      searchString
    });
  }

  handleItemsPerPageChange = (itemsPerPage) => {
    this.setState({
      page: 1,
      itemsPerPage
    });
  }

  handleOpenModal = (item) => {
    this.setState({
      modalItem: item,
      autoRotateStop: true,
    })
  }

  handleCloseModal = () => {
    this.setState({
      modalItem: false,
      autoRotateStop: false,
    })
  }

  renderItems(items) {
    return items.map((item) => <GalleryItem onOpenModal={this.handleOpenModal} key={item.url} item={item} />)
  }

  render() {
    const { items: allItems, sorting, search, autoRotateTime, modalRootId } = this.props;
    const { page, sortParam, searchString, itemsPerPage, autoRotateStop, modalItem } = this.state;

    let items = allItems.slice(0);

    if (sorting) {
      items.sort((a, b) => {

        if (sortParam === 'date') {
          if (moment(a[sortParam]) > moment(b[sortParam])) {
            return 1;
          }
          if (moment(a[sortParam]) < moment(b[sortParam])) {
            return -1;
          }
          return 0;
        }

        if (a[sortParam] > b[sortParam]) {
          return 1;
        }
        if (a[sortParam] < b[sortParam]) {
          return -1;
        }
        return 0;
      })
    }

    if (searchString) {
      items = items.filter((item) => item.title.toLowerCase().indexOf(searchString.toLowerCase()) !== -1)   
    }

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    const pageItems = items.slice(start, end);

    return (
      <div className="gallery">
        {search && <SearchInput searchString={searchString} onChange={this.handleSearch} />}
        <Pagination 
          page={page}
          itemsPerPage={itemsPerPage}
          total={items.length}
          onPrevClick={this.handlePrevClick}
          onNextClick={this.handleNextClick}
          autoRotateTime={autoRotateStop ? false : autoRotateTime}
        />
        {sorting && <SortDropdown onChange={this.handleSort}/>}
        <ItemsPerPageDropdown 
          onChange={this.handleItemsPerPageChange}
          selected={itemsPerPage}
        />
        <ul className="gallery__list">
          {this.renderItems(pageItems)}
        </ul>
        {modalItem && ReactDOM.createPortal((
        <Modal 
          item={modalItem} 
          page={page}
          itemsPerPage={itemsPerPage}
          total={items.length}
          onPrevClick={this.handlePrevClick}
          onNextClick={this.handleNextClick}
          onCloseModal={this.handleCloseModal}
        />
        ), document.getElementById(modalRootId) )}
      </div>
    )
  }
}