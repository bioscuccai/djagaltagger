import React, { Component } from 'react';
import TagList from './TagList';
import ArtistLink from './ArtistLink';
import { observer, inject } from 'mobx-react';
import classNames from 'classnames';
import config from '../config';

class Image extends Component {
  render() {
    return (
      <div>
        <div>
          <a href={this.props.image.image} target="_blank">
            <img className="thumbnail" src={`${config.apiServer}${this.props.image.thumbnailUrl}`} alt=""/>
          </a>
        </div>

        <div>
          <ArtistLink image={this.props.image} />
        </div>

        <div>
          [ <a href="#" onClick={this.handleAddTag}
            className={classNames({
              'inactive-link': !(!!this.props.store.tags.tagBox.current)
            })}>Add Tag</a> ]
                </div>

        <TagList tags={this.props.image.tags} tagbarName={`image-tags-${this.props.image.pk}`} />
      </div>
    );
  }

  handleAddTag = async (e) => {
    e.preventDefault();
    if (!this.props.store.tags.tagBox.current) {
      return;
    }
    this.props.store.tags.applyCurrentTag(this.props.image.pk);
  }
};

export default inject('store')(observer(Image));
