import api from '../api';
import { observable } from 'mobx';
import config from '../config';

class ImageRangeStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  imageRanges = observable([])

  suggestions = observable([])

  async fetchImageRanges() {
    let resp = await api.get(`${config.apiServer}/api/image_ranges/`);

    this.imageRanges.replace(resp.data);
  }

  async fetchSuggestions(prefix) {
    if (!prefix) {
      return;
    }

    let resp = await api.get('/api/image_ranges/', {
      params: {
        prefix
      }
    });

    this.suggestions.replace(resp.data);

    return resp.data;
  }

  async createImageRange(imageRange) {
    let resp = await api.post(`${config.apiServer}/api/image_ranges/`, {
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
