import Ranking from "./Ranking.js";

export default class GenreRanking extends Ranking {
  constructor() {
    super();
    this.genre = null;
  }

  // detect genre from the pasted data
  getGenreFromData() {
    // look up in the past ranking
    const strongTags = document
      .getElementById("past-paste")
      .querySelectorAll("strong");
    let genre = null;
    Object.values(strongTags).forEach((node) => {
      if (node.innerText.includes("Ranking"))
        genre = node.innerText.split("Ranking de ")[1];
    });
    this.setGenre(genre);
    this.genre = genre;

    // look up in the current ranking
    const h2Tags = document.getElementById("current-paste").querySelector("h2");
    if (h2Tags) {
      if (!this.genre) {
        this.setGenre(h2Tags.textContent || null);
      } else if (this.genre !== h2Tags.textContent) {
        this.alert.show(
          "Verifique se os rankings são do mesmo gênero musical."
        );
      }
    }
  }

  // set music genre
  setGenre(genre) {
    this.genre = genre;
  }

  // erase all data from the object
  reset() {
    super.reset();
    this.genre = null;
  }

  // get ranking properties from past and current ranking
  getBandsData() {
    super.getBandsData();
    this.getGenreFromData();
  }

  // generate the post with the ranking update
  update() {
    this.getBandsData();
    super.runMethods();
    super.showUpdate();
  }

  // set the post content
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
