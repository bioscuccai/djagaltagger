import api from '../api';
import { observable, set } from 'mobx';
import _ from 'lodash';
import config from '../config';

class ImageStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  currentPage = observable({});

  async fetchImages(filter) {
    let resp = await api.get(`${config.apiServer}/api/images/`, {
      params: filter
    });

    set(this.currentPage, resp.data);
    return resp.data;
  }

  async fetchAddTag(imageId, tag) {
    let resp = await api.post(`${config.apiServer}/api/images/${imageId}/add_tag/`, {
      tag
    });

    return resp.data;
  }

  addTag(imageId, tag) {
    let image = _.find(this.currentPage.results, image => image.pk === imageId);
    if (image && image.tags.indexOf(tag) === -1) {
      image.tags.push(tag);
    }
  }

  async upload(file) {
    let data = new FormData();
    data.append('image', file);

    let resp = await api.put(`${config.apiServer}/api/upload/`, data);
    return resp.data;
  }
}

export default ImageStore;
