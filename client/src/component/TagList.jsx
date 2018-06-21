import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import qs from 'qs';

class TagList extends Component {
  render() {
    return (
      <span>
        {(this.props.tags || []).map(tag =>
          <Link className="tag" to={
            {
              pathname: '/',
              search: qs.stringify({ tag })
            }

          } key={`tag-${this.props.tagbarName}-${tag}`}>{tag}</Link>
        )}
      </span>
    );
  }
};

export default observer(TagList);
