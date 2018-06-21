import axios from 'axios';
import { observable } from 'mobx';
import config from '../config';

class ImageRangeStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  imageRanges = observable([])

  async fetchImageRanges() {
    let resp = await axios.get(`${config.apiServer}/api/image_ranges/`);

    this.imageRanges.replace(resp.data);
  }

  async createImageRange(imageRange) {
    let resp = await axios.post(`${config.apiServer}/api/image_ranges/`, {
      start: imageRange.start,
      end: imageRange.end,
      name: imageRange.name,
      color: imageRange.color || '#000000',
      mixed: !!imageRange.mixed,
    });

    this.addImageRange(resp.data);
  }

  addImageRange(imageRange) {
    this.imageRanges.push(imageRange);
  }
}

export default ImageRangeStore;
