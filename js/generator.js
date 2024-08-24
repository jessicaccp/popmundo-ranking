import Band from "./Band.js";
import Ranking from "./Ranking.js";

export const ranking = new Ranking();
export const generateRanking = () => {
  // init ranking
  ranking.reset();

  // get data from past ranking
  // get music gender
  const strongTags = document
    .getElementById("past-paste")
    .querySelectorAll("strong");
  let gender = null;
  Object.values(strongTags).forEach((node) => {
    if (node.innerText.includes("Ranking"))
      gender = node.innerText.split("Ranking de ")[1];
  });
  ranking.setGender(gender);

  // get bands properties
  const pastBands = document.getElementById("past-paste").querySelectorAll("a");
  pastBands.forEach((node) => {
    const band = new Band();
    band.setName(node.innerText);
    band.setId(node.href.split("/")[6]);
    band.setPastGlobal(
      node.previousSibling.textContent.split("#")[1].match(/\d/g).join("")
    );
    band.setPastLocal(node.previousSibling.previousSibling.textContent);
    ranking.addBand(band);
  });

  console.log(ranking);

  // get data from current ranking
  const currentBands = document
    .getElementById("current-paste")
    .querySelectorAll("tbody tr");
  currentBands.forEach((node) => {
    const id =
      node.cells[2]?.childNodes[1]?.href.split("/")[6] ||
      node.cells[2]?.childNodes[0]?.href.split("/")[6];
    const band = ranking.searchBandById(id);
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
      ranking.addBand(band);
    }
  });

  console.log(ranking);

  ranking.setLocal();
  ranking.setRelative();
  ranking.setOut();
  ranking.setNew();
  ranking.setMax();
  ranking.setMin();
  ranking.sortBands();

  console.log(ranking);

  //   const currentDiv = document.getElementById("current-paste");
  //   const cells = currentDiv.getElementsByTagName("tr");
};
