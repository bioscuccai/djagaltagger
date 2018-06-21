import React, { Component } from 'react';
import qs from 'qs';
import _ from 'lodash';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';

class ArtistLink extends Component {
  render() {
    let filename = _.last(this.props.image.image.split('/'));
    let matchedArtist = _.find(this.props.store.artists.artists, artist => {
      // TODO: make this pretty
      return filename.startsWith(artist.prefix)
    });

    if (!matchedArtist) {
      return null;
    }

    return (
      <Link to={{
        path: '/',
        search: qs.stringify({
          artist_id: matchedArtist.pk
        })
      }}>
        {matchedArtist.name}
      </Link>
    )

  }
}

export default inject('store')(observer(ArtistLink));
