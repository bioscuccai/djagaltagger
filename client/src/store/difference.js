import config from '../config';
import axios from 'axios';
import { observable } from 'mobx';

class DifferenceStore {
  differences = observable([]);

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  async fetchDifferences(files) {
    let resp = await axios.post(`${config.apiServer}/api/differences/`, {
      files
    });

    this.differences.replace(resp.data);
  }
}

export default DifferenceStore;
