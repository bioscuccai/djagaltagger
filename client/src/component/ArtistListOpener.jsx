import React, { Component } from 'react';
import { observer } from 'mobx-react';
import ArtistList from './AristList';
import classNames from 'classnames';

class ArtistListOpener extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: true
    };
  }

  render() {
    return (
      <div className="long-list">
        <span style={{
          cursor: 'pointer'
        }}
        onClick={this.handleToggleOpen}>
          Artists: 
          <i className={classNames({
            fa: true,
            'fa-folder-open': !this.state.open,
            'fa-window-close': this.state.open
          })}></i>
        </span>

        &nbsp;

        {this.state.open && <ArtistList artists={this.props.artists}/>}
      </div>
    );
  }

  handleToggleOpen = (e) => {
    this.setState({
      ...this.state,
      open: !this.state.open
    })
  }
}

export default observer(ArtistListOpener);
