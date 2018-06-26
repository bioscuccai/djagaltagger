import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

class TagAdderColumn extends Component {
  render() {
    return (
      <div className="column column-50">
        { this.props.tags.map(tag => {
          return (
            <div key={`tag-adder-recent-${tag}`}
              onClick={this.handleRecentTagClick.bind(this,tag)}
            >{tag}</div>
          );
        })}
      </div>
    );
  }

  handleRecentTagClick = (tag) => {
    this.props.store.tags.setCurrentTag(tag);
  }
}

export default inject('store')(observer(TagAdderColumn));
