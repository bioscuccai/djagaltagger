import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import qs from 'qs';

class ArtistListOpener extends Component {
  render() {
    return (
      <span>
        {
          this.props.artists.map(artist => {
            return (
              <Link
                className='artist'
                key={`artist-list-${artist.pk}`}
                to={{
                  pathname: '/',
                  search: qs.stringify({
                    artist_id: artist.pk
                  })
                }}>
                {artist.name}
              </Link>
            )
          })
        }
      </span>
    );
  }
}

export default observer(ArtistListOpener);
