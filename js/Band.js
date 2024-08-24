export default class Band {
  constructor() {
    this.name = null;
    this.id = null;
    this.pastGlobal = null;
    this.pastLocal = null;
    this.global = null;
    this.local = null;
    this.relativeGlobal = null;
    this.relativeLocal = null;
  }

  // name
  setName(name) {
    this.name = String(name);
  }

  // id
  setId(id) {
    this.id = String(id);
  }

  // global position from past ranking
  setPastGlobal(pastGlobal) {
    this.pastGlobal = Number(pastGlobal);
  }

  // local position from past ranking
  setPastLocal(pastLocal) {
    this.pastLocal = Number(pastLocal);
  }

  // global position from current ranking
  setGlobal(global) {
    this.global = Number(global);
  }

  // local position from current ranking
  setLocal(local) {
    this.local = Number(local);
  }

  // difference between past and current global positions
  setRelativeGlobal(relativeGlobal) {
    this.relativeGlobal = Number(relativeGlobal);
  }

  // difference between past and current local positions
  setRelativeLocal(relativeLocal) {
    this.relativeLocal = Number(relativeLocal);
  }
}
