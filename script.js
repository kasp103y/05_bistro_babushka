const madTemplate = document.querySelector("template");
const container = document.querySelector(".container");
const header = document.querySelector("header h2");

const options = { headers: { "x-apikey": "600ec2fb1346a1524ff12de4" } };

window.addEventListener("DOMContentLoaded", start);
let retter;
let filter = "menu";

function start() {
  const url = "https://babushka-dd8a.restdb.io/rest/menu";
  const filterKnapper = document.querySelectorAll("nav button");
  console.log(filterKnapper);

  filterKnapper.forEach((knap) => knap.addEventListener("click", filtrerMenu));
  //EventListener vælger hvad for et filter der er aktivt
  hentData(url);
}

function filtrerMenu() {
  filter = this.dataset.mad;
  //Sætter filter på værdien menu (Alle retter)

  document.querySelector(".valgt").classList.remove("valgt");
  //Fjerne class fra forrige knap
  this.classList.add("valgt");
  //Tilføjer class til klikket knap
  vis(); //Kalder vis function efter nyt filter er påsat

  header.textContent = this.textContent;
  //This henviser til klikket knap og ændrer overskrift til det der står i knappen
  console.log(this);
}

async function hentData(url) {
  //Promise - data lover program at komme med date, imen det køre videre
  const result = await fetch(url, options);
  const json = await result.json();
  console.log(json);
  vis(json);
}

function vis(retter) {
  header.textContent = this.textContent;
  container.textContent = ""; //Ryd container inden loop

  retter.forEach((ret) => {
    if (filter == ret.mad || filter == "menu") {
      let klon = madTemplate.cloneNode(true).content;
      const md = "-md.jpg";
      //Placer i HTML

      klon.querySelector("h3").textContent = ret.navn;
      klon.querySelector(".ret").textContent = ret.kategori;
      klon.querySelector(".details").textContent = ret.kortbeskrivelse;
      klon.querySelector(".pris").textContent = ret.pris + " kr";
      klon.querySelector("img").src = "medium/" + ret.billednavn + md;

      //klon.querySelector("img").src = "faces/" + ret.billede;
      container.appendChild(klon);
    }
  });
}
