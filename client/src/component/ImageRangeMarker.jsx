import React, { Component } from 'react';
import _ from 'lodash';

function gradientStyle(imageRanges) {
  let colors = _.map(imageRanges, 'color');

  if (colors.length === 0) {
    return {};
  }

  if (colors.length === 1) {
    return {
      'background-color': colors[0]
    };
  }

  return {
    background: `linear-gradient(${colors.join(',')})`
  }
}

class ImageRangeMarker extends Component {
  render() {
    return (
      <div style={{
        ...gradientStyle(this.props.imageRanges),
        display: 'inline-block',
        height: '1em',
        width: '5px'
      }}></div>
    );
  }
}

export default ImageRangeMarker;
