import api from '../api';
import { observable } from 'mobx';
import config from '../config';

class ArtistStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  artists = observable([]);

  async fetchArtists() {
    let resp = await api.get(`${config.apiServer}/api/artists/`);
    this.artists.replace(resp.data);
  }
}

export default ArtistStore;
