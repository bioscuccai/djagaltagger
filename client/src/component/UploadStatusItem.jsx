import React, { Component } from 'react';

class UploadStatusItem extends Component {
  render () {
    return (
      <pre>
        {this.props.file.name}:
        <strong>{this.props.file.pending ? '...' : 'FINISHED'}</strong>
      </pre>
    );
  }
}

export default UploadStatusItem;
