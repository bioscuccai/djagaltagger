import React, { Component } from 'react';
import classNames from 'classnames';

import TagList from './TagList';

class TagListOpener extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: true
    };
  }

  render() {
    return (
      <span>
        <span style={{
          cursor: 'pointer'
        }}
        onClick={this.handleToggleOpen}>
          Tags:
          <i className={classNames({
            fa: true,
            'fa-folder-open': !this.state.open,
            'fa-window-close': this.state.open
          })}></i>
        </span>
        &nbsp;
        { this.state.open && <TagList {...this.props}/> }
      </span>
    );
  }

  handleToggleOpen = (e) => {
    this.setState({
      ...this.state,
      open: !this.state.open
    })
  }
}

export default TagListOpener;
