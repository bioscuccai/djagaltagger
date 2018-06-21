import axios from 'axios';
import { observable } from 'mobx';
import config from '../config';

class ArtistStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  artists = observable([]);

  async fetchArtists() {
    let resp = await axios.get(`${config.apiServer}/api/artists/`);
    this.artists.replace(resp.data);
  }
}

export default ArtistStore;
