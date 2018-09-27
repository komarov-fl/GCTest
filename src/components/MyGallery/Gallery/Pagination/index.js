import React, { Component } from 'react';

export default class Pagination extends Component {
  setAutoRotate = () => {
    const {autoRotateTime} = this.props;      
    clearInterval(this.rotateInterval);   
    if (autoRotateTime > 0) {
     this.rotateInterval = setInterval(this.handleNextClick, autoRotateTime * 1000);
    }
  }

  componentDidMount() {
    this.setAutoRotate();
  }

  componentWillUnmount() {
    clearInterval(this.rotateInterval);    
  }

  componentWillUpdate(prevProps) {
    if (prevProps.autoRotateTime !== this.props.autoRotateTime) {
      this.setAutoRotate();   
    }
  }

  handlePrevClick = () => {
    let {page, total, itemsPerPage} = this.props;
    const totalPages = Math.ceil(total / itemsPerPage);

    if (page === 1) {
      page = totalPages;
    } else {
      page -= 1;
    }

    this.props.onPrevClick(page);
  }

  handleNextClick = () => {
    let {page, total, itemsPerPage} = this.props;
    const totalPages = Math.ceil(total / itemsPerPage);

    if (page === totalPages) {
      page = 1;
    } else {
      page += 1;
    }
    this.props.onNextClick(page);
  }

  render() {
    const {page, total, itemsPerPage} = this.props;
    const totalPages = Math.ceil(total / itemsPerPage);

    if (totalPages === 1) {
      return false;
    }

    return (
      <div className="gallery__pagination">
        <div>
          total pages: {totalPages}
        </div>
        <div>
          <button onClick={this.handlePrevClick}>prev</button>
          {page}
          <button onClick={this.handleNextClick}>next</button>
        </div>
      </div>
    )
  }
}