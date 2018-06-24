import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import qs from 'qs';

import TagList from './TagList';
import ImageList from './ImageList';
import TagAdder from './TagAdder';
import Paginator from './Paginator';
import ImageRangeFrom from './ImageRangeForm';
import TagListOpener from './TagListOpener';
import ArtistListOpener from './ArtistListOpener';
import PatternFilter from './PatternFilter';

class ImagePage extends Component {
  componentWillMount() {
    let parsedQuery = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true
    });
    this.props.store.tags.fetchTags(parsedQuery);
    this.props.store.images.fetchImages();
    this.props.store.imageRanges.fetchImageRanges();
    this.props.store.artists.fetchArtists();
    this.props.store.tags.loadRecentTags();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      let parsedQuery = qs.parse(this.props.location.search, {
        ignoreQueryPrefix: true
      });

      this.props.store.images.fetchImages(parsedQuery);
    }
  }

  render() {
    let parsedQuery = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true
    });

    return (
      <div>
        <div className="row">
          <ArtistListOpener artists={this.props.store.artists.artists}/>
        </div>

        <div className="row">
          <TagListOpener tags={this.props.store.tags.tags} tagbarName='top' />
        </div>

        <PatternFilter/>

        <div className="row">
          <Paginator
            paginatorName='top'
            pageSize={this.props.store.images.currentPage.pageSize}
            count={this.props.store.images.currentPage.count}
            current={parsedQuery.page || 1}
            query={parsedQuery}
            imageRanges={this.props.store.imageRanges.imageRanges}
          />
        </div>

        <ImageList images={this.props.store.images.currentPage.results} />

        <TagAdder />
        <ImageRangeFrom
          pageSize={this.props.store.images.currentPage.pageSize}
          page={parsedQuery.page || 1}
        />
      </div>
    );
  }
};

export default inject('store')(observer(ImagePage));
