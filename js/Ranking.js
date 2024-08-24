export default class Ranking {
  constructor() {
    this.bands = [];
    this.gender = null;
    this.max = null;
    this.min = null;
    this.new = null;
    this.out = null;
  }

  // add band to array of bands
  addBand(band) {
    this.bands.push(band);
  }

  // remove band from array of bands based on its id
  removeBandById(id) {
    this.bands = this.bands.filter((band) => band.id !== id);
  }

  // search band based on its id and return object
  searchBandById(id) {
    return this.bands.find((band) => band.id === id) || null;
  }

  // sort bands by global ranking
  sortBands() {
    this.bands.sort((a, b) => a.global - b.global);
  }

  // set local ranking for each band
  setLocal() {
    this.bands.forEach((band, index) => {
      band.setLocal(index + 1);
    });
  }

  // calculate the difference between past and current ranking positions
  setRelative() {
    this.bands.forEach((band) => {
      if (band.pastGlobal && band.global) {
        band.setRelativeGlobal(band.pastGlobal - band.global);
      }
      if (band.pastLocal && band.local) {
        band.setRelativeLocal(band.pastLocal - band.local);
      }
    });
  }

  // detect which bands left the ranking and remove them from the array
  setOut() {
    this.out = this.bands.filter((band) => band.global === null);
    if (this.out.length === 0) {
      this.out = null;
    } else {
      this.out.map((band) => this.removeBandById(band.id));
    }
  }

  // detect which bands are new in the ranking
  setNew() {
    this.new = this.bands.filter((band) => band.pastGlobal === null);
    if (this.new.length === 0) {
      this.new = null;
    }
  }

  // find the bands that moved up the most in the ranking
  setMax() {
    const maxValue = Math.max(...this.bands.map((band) => band.relativeGlobal));
    this.max = this.bands.filter((band) => band.relativeGlobal === maxValue);
    if (this.max.length === 0) {
      this.max = null;
    }
  }

  // find the bands that moved down the most in the ranking
  setMin() {
    const minValue = Math.min(...this.bands.map((band) => band.relativeGlobal));
    this.min = this.bands.filter((band) => band.relativeGlobal === minValue);
    if (this.min.length === 0) {
      this.min = null;
    }
  }

  // set the ranking music gender
  setGender(gender) {
    this.gender = gender;
  }

  // reset ranking properties
  reset() {
    this.bands = [];
    this.gender = null;
    this.max = null;
    this.min = null;
    this.new = null;
    this.out = null;
  }
}
