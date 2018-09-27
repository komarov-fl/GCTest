import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Gallery from './Gallery';
import Loader from './Loader';

export default class MyGallery extends Component {
  state = {
    items: [],
    isFetch: true,
    loadError: false,
  }

  feedLoad() {
    const {feed} = this.props;

    if (typeof feed === 'string') {
      axios.get(feed)
        .then((result) => {
          this.setState({
            isFetch: false,
            items: result.data,
          });
        })
        .catch(() => {
          this.setState({
            loadError: true,
          });
        });
    } else {
      this.setState({
        isFetch: false,
        items: feed,
      });
    }
  }

  componentDidMount() {
    this.feedLoad();
  }

  componentDidUpdate(prevProps) {    
    if (prevProps.feed !== this.props.feed) {
      this.feedLoad();
    }
  }

  render() {
    const {items, isFetch} = this.state;
    const {feed, ...rest} = this.props;

    return isFetch ? <Loader /> : <Gallery items={items} {...rest} /> ;
  }
}

MyGallery.propTypes = {
  feed: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.object)
  ]),
  itemsPerPage: PropTypes.number,
  sorting: PropTypes.bool,
  search: PropTypes.bool,
  autoRotateTime: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool
  ]),
  modalRootId: PropTypes.string,
}

MyGallery.defaultProps = {
  itemsPerPage: 10,
  sorting: true,
  search: true,
  autoRotateTime: 0,
  modalRootId: 'root',
}