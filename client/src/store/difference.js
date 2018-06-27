import config from '../config';
import api from '../api';
import { observable } from 'mobx';

class DifferenceStore {
  differences = observable([]);

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  async fetchDifferences(files) {
    let resp = await api.post(`${config.apiServer}/api/differences/`, {
      files
    });

    this.differences.replace(resp.data);
  }
}

export default DifferenceStore;
