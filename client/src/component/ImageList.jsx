import React, { Component } from 'react';
import { observer } from 'mobx-react';
import _ from 'lodash';

import Image from './Image';

class ImageList extends Component {
  render() {
    return (
      <div>
        {_.chunk(this.props.images, 5).map((chunk, chunkIndex) => {
          return <div className="row" key={`image-chunk-${chunkIndex}`}>
            {chunk.map((image, imageIndex) => {
              return (
                <div className="column column-20" key={`chunk-${chunkIndex}-image-${imageIndex}`} >
                  <Image
                    image={image}
                  />
                </div>
              );
            })}
          </div>;
        })}
      </div>
    );
  }
}

export default observer(ImageList);
