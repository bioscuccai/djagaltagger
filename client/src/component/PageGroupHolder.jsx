import React, { Component } from 'react';
import { observer } from 'mobx-react';
import ImageRangeItem from './ImageRangeItem';

class PageGroupHolder extends Component {
  render() {
    return (
      <span className="image-range-holder">
        { this.props.imageRanges.map(imageRange => {
          return (
            <ImageRangeItem imageRange={imageRange} key={`page-${this.props.page}-range-${imageRange.pk}`}/>
          );
        }) }
      </span>
    );
  }
}

export default observer(PageGroupHolder);
