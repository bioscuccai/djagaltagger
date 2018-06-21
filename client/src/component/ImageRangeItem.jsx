import React, { Component } from 'react';

class ImageRangeItem extends Component {
  render () {
    return (
      <div style={{
        color: this.props.imageRange.color
      }}>
        { this.props.imageRange.name }
      </div>
    );
  }
}

export default ImageRangeItem;
