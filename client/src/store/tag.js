import axios from 'axios';
import { observable, toJS } from 'mobx';
import config from '../config';
import _ from 'lodash';

class TagStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  tags = observable([]);
  tagBox = observable({
    current: '',
    recent: []
  });

  async fetchTags() {
    let resp = await axios.get(`${config.apiServer}/api/tags/`);
    this.tags.replace(resp.data.map(result => result.name));
  }

  addTag(tag) {
    this.tags.push(tag);
  }

  insertTag(tag) {
    if (this.tags.indexOf(tag) === -1) {
      this.addTag(tag);
    }
  }

  setCurrentTag(newTag) {
    this.tagBox.current = newTag;
  }

  async applyCurrentTag(imageId) {
    this.rootStore.images.addTag(imageId, this.tagBox.current);
    await this.rootStore.images.fetchAddTag(imageId, this.tagBox.current);
    this.insertTag(this.tagBox.current);
  }

  addRecentTag(tag) {
    this.tagBox.recent.replace(this.tagBox.recent.filter(elem => elem !== tag));
    this.tagBox.recent.replace(this.tagBox.recent.splice(0, 29));
    this.tagBox.recent.unshift(tag);

    this.saveRecentTags();
  }

  saveRecentTags() {
    localStorage.setItem('djagal:tags:recent', JSON.stringify(toJS(this.tagBox.recent)));
  }

  loadRecentTags() {
    let recentJSON = localStorage.getItem('djagal:tags:recent');

    if (recentJSON) {
      this.tagBox.recent.replace(JSON.parse(recentJSON));
    }
  }
}

export default TagStore;
