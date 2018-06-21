import TagStore from './tag';
import ImageStore from './image';
import ImageRangeStore from './imageRange';
import ArtistStore from './artist';
import DifferenceStore from './difference';

class RootStore {
  constructor() {
    this.tags = new TagStore(this);
    this.images = new ImageStore(this);
    this.imageRanges = new ImageRangeStore(this);
    this.artists = new ArtistStore(this);
    this.differences = new DifferenceStore(this);
  }
}

export default new RootStore();
