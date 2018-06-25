import React, { Component } from 'react';
import classNames from 'classnames';
import config from '../config';

class ArtistPreviewTooltip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasBeenActivated: false
    };
  }

  render() {
    return (
      <div className="artist-preview-tooltip" onMouseOver={this.handleHover}>
        <strong>{this.props.artist.name}</strong>
        <div className="artist-description">{this.props.artist.description}</div>
        { this.state.hasBeenActivated && <div className="row">
            {
              this.props.artist.previewImages.map(image => {
                return (
                  <div key={`artist-${this.props.artist.pk}-preview-${image.pk}`} className={classNames({
                    column: true,
                    'column-100': this.props.artist.previewImages.length === 1,
                    'column-50': this.props.artist.previewImages.length === 2,
                    'column-33': this.props.artist.previewImages.length === 3,
                  })}>
                    <img src={`${config.apiServer}${image.thumbnailUrl}`}/>
                  </div>
                );
              })
            }
        </div>}
      </div>
    );
  }

  handleHover = e => {
    if(!this.state.hasBeenActivated && this.props.artist.previewImages.length !== 0) {
      console.log('activated ' + this.props.artist.name);
      this.setState({
        ...this.state,
        hasBeenActivated: true
      })
    }
  }
};

export default ArtistPreviewTooltip;
