import Band from "./Band.js";
import Alert from "./Alert.js";

export default class Ranking {
  constructor() {
    this.bands = [];
    this.genre = null;
    this.max = null;
    this.min = null;
    this.new = null;
    this.out = null;
    this.post = null;
    this.alert = new Alert();
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
    this.out = this.bands.filter(
      (band) => band.global === null && band.pastGlobal !== null
    );
    if (this.out.length === 0) {
      this.out = null;
    } else {
      this.out.map((band) => this.removeBandById(band.id));
    }
  }

  // detect which bands are new in the ranking
  setNew() {
    this.new = this.bands.filter((band) => band.pastGlobal === null);
    this.new.sort((a, b) => a.name - b.name);
    if (this.new.length === 0) {
      this.new = null;
    }
  }

  // find the bands that moved up the most in the ranking
  setMax() {
    const maxValue = Math.max(...this.bands.map((band) => band.relativeGlobal));
    if (maxValue > 0) {
      this.max = this.bands.filter((band) => band.relativeGlobal === maxValue);
      if (this.max?.length === 0) {
        this.max = null;
      }
    }
  }

  // find the bands that moved down the most in the ranking
  setMin() {
    const minValue = Math.min(...this.bands.map((band) => band.relativeGlobal));
    if (minValue < 0) {
      this.min = this.bands.filter((band) => band.relativeGlobal === minValue);
      if (this.min?.length === 0) {
        this.min = null;
      }
    }
  }

  // set the ranking music genre
  setGenre(genre) {
    this.genre = genre;
  }

  // reset ranking properties
  reset() {
    this.bands = [];
    this.genre = null;
    this.max = null;
    this.min = null;
    this.new = null;
    this.out = null;
  }

  // get ranking properties from past and current ranking
  update() {
    this.reset();

    if (
      document.getElementById("past-paste").innerHTML === "" ||
      document.getElementById("current-paste").innerHTML === ""
    ) {
      this.alert.show(
        "Por favor, cole ambos os rankings antes de gerar uma atualização."
      );
      return;
    } else {
      // get genre
      const strongTags = document
        .getElementById("past-paste")
        .querySelectorAll("strong");
      let genre = null;
      Object.values(strongTags).forEach((node) => {
        if (node.innerText.includes("Ranking"))
          genre = node.innerText.split("Ranking de ")[1];
      });
      this.setGenre(genre);

      // get bands properties from past ranking
      const pastBands = document
        .getElementById("past-paste")
        .querySelectorAll("a");
      pastBands.forEach((node) => {
        if (node.previousSibling.tagName === "BR") return;
        const band = new Band();
        band.setName(node.innerText);
        band.setId(node.href.split("/")[6]);
        band.setPastGlobal(
          node.previousSibling.textContent.split("#")[1].match(/\d/g).join("")
        );
        band.setPastLocal(node.previousSibling.previousSibling.textContent);
        this.addBand(band);
      });

      // get genre from current ranking
      const h2Tags = document
        .getElementById("current-paste")
        .querySelector("h2");
      if (h2Tags) {
        if (!this.genre) {
          this.setGenre(h2Tags.textContent || null);
        } else if (this.genre !== h2Tags.textContent) {
          this.alert.show(
            "Verifique se os rankings são do mesmo gênero musical."
          );
        }
      }

      // get data from current ranking
      const currentBands = document
        .getElementById("current-paste")
        .querySelectorAll("tbody tr");
      currentBands.forEach((node) => {
        const id =
          node.cells[2]?.childNodes[1]?.href.split("/")[6] ||
          node.cells[2]?.childNodes[0]?.href.split("/")[6];
        const band = this.searchBandById(id);
        if (band) {
          band.setGlobal(node.cells[1].textContent);
          band.setLocal(node.cells[0].textContent);
          const name = node.cells[2].innerText;
          if (band.name !== name) {
            band.setName(name);
          }
        } else {
          const band = new Band();
          band.setName(node.cells[2].innerText);
          band.setId(id);
          band.setGlobal(node.cells[1].textContent);
          band.setLocal(node.cells[0].textContent);
          this.addBand(band);
        }
      });

      // run ranking methods
      this.setOut();
      this.setNew();
      this.setLocal();
      this.sortBands();
      this.setRelative();
      this.setMax();
      this.setMin();
      this.setPost();
      document.getElementById("result-paste").innerHTML = this.post;
    }
  }

  setPost() {
    this.post = `[quote]Para fazer parte do ranking, um dos integrantes deve solicitar sua inscrição no nosso [tribeid=6582 name=clube social]. Se você estiver no clube e sua banda/gangue não aparecer aqui, por favor, avise no tópico.[/quote][br][b][u]Ranking ${
      this.genre ? `de ${this.genre}` : ``
    }[/u][/b][br]Atualizado em ${new Date().toLocaleDateString(
      "pt-BR"
    )}[br][br]${this.bands
      .map(
        (band) =>
          `[b]${band.local < 10 ? `0` : ``}${band.local}[/b] (${
            band.relativeLocal > 0 ? `+` : band.relativeLocal < 0 ? `` : `=`
          }${band.relativeLocal ? band.relativeLocal : ``}) #${
            band.global
          } [artistid=${band.id} name=${band.name}] (${
            band.relativeGlobal > 0 ? `+` : band.relativeGlobal < 0 ? `` : `=`
          }${band.relativeGlobal ? band.relativeGlobal : ``})[br] ${
            band.local % 10 === 0 ? `[br]` : ``
          }`
      )
      .join("")}[br][b]Maior subida:[/b][br]${
      this.max
        ? `${this.max
            .map((band) => `[artistid=${band.id} name=${band.name}]`)
            .join(", ")} (+${this.max[0].relativeGlobal})`
        : `-`
    }[br][br][b]Maior queda:[/b][br]${
      this.min
        ? `${this.min
            .map((band) => `[artistid=${band.id} name=${band.name}]`)
            .join(", ")} (${this.min[0].relativeGlobal})`
        : `-`
    }[br][br][b]Entrando na atualização:[/b][br]${
      this.new
        ? this.new
            .map((band) => `[artistid=${band.id} name=${band.name}]`)
            .join(", ")
        : `-`
    }[br][br][b]Fora da atualização:[/b][br]${
      this.out
        ? this.out
            .map((band) => `[artistid=${band.id} name=${band.name}]`)
            .join(", ")
        : `-`
    }`;
  }
}
