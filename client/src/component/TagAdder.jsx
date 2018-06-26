import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames';

import TagAdderColumn from './TagAdderItemColumn';

class TagAdder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRecent: true
    };
  }

  render() {
    const halfTagCount = Math.ceil(this.props.store.tags.tagBox.recent.length / 2);
    const leftTags = this.props.store.tags.tagBox.recent.slice(0, halfTagCount);
    const rightTags = this.props.store.tags.tagBox.recent.slice(halfTagCount, this.props.store.tags.tagBox.recent.length);
    return (
      <div className="bordered-widget tag-adder">
        <div className="row" style={{
          display: this.state.showRecent ? 'flex' : 'none',
          cursor: 'pointer'
        }}>
          <TagAdderColumn tags={leftTags}/>
          <TagAdderColumn tags={rightTags}/>
        </div>

        <div className="row">
          <input type="text" placeholder="Tag"
            value={this.props.store.tags.tagBox.current}
            onChange={this.handleTagChange}
            onBlur={this.handleTagBlur}/>
          <button onClick={this.handleToggleRecent}
            className={classNames({
              button: true,
              'button-outline': this.state.showRecent
            })}
          ><i className="fa fa-history"></i></button>
        </div>
      </div>
    )
  }

  handleRecentTagClick = (tag) => {
    this.props.store.tags.setCurrentTag(tag);
  }

  handleTagChange = (e) => {
    this.props.store.tags.setCurrentTag(e.target.value);
  }

  handleTagBlur = (e) => {
    this.props.store.tags.addRecentTag(e.target.value);
  }

  handleToggleRecent = (e) => {
    this.setState({
      ...this.state,
      showRecent: !this.state.showRecent
    });
  }
}

export default inject('store')(observer(TagAdder));
