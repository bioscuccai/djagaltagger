import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import UploadStatusItem from './UploadStatusItem';

class UploadPage extends Component {
  constructor(props) {
    super(props);

    this.fileRef = React.createRef();
    this.formRef = React.createRef();

    this.state = {
      pendingUploads: []
    };
  }

  render() {
    return (
      <div>
        <form ref={this.formRef}>
          { this.state.pendingUploads.map((file, i) => {
            return <UploadStatusItem
              key={`file-${file.name}-${i}`}
              file={file}
            />;
          })}

          <input type="file" multiple ref={this.fileRef}/>
          <input type="submit" value="Upload" onClick={this.handleUpload} />
        </form>
      </div>
    );
  }

  handleUpload = async (e) => {
    this.setState({
      ...this.state,
      pendingUploads: []
    });

    e.preventDefault();
    console.log(this.fileRef);
    let fileSpinners = [];

    // doesn't support map out of the box
    for (let i = 0; i < this.fileRef.current.files.length; i++) {
      let file = this.fileRef.current.files[i];
      fileSpinners.push({
        name: file.name,
        pending: true
      });
    }

    this.setState({
      ...this.state,
      pendingUploads: fileSpinners
    });

    for (let i = 0; i < this.fileRef.current.files.length; i++) {
      await this.props.store.images.upload(this.fileRef.current.files[i]);
      fileSpinners[i].pending = false;
      this.setState({
        ...this.state,
        pendingUploads: fileSpinners
      });
    }

    this.formRef.current.reset();
  }
}

export default inject('store')(observer(UploadPage));
