let datas; //les données des photographes;
//API REQUEST
const fetchDataPhotographers = async () => {
  datas = await fetch("./data/photographes.json")
    .then((response) => {
      return response.json(); //response.json = response.body.json;
    })
    .then((body) => {
      return body;
    });
  //console.log(datas); //la variable qui renferme les données;ici il y a deux array(photographers et media)
};

//SHOWING DATAS PHOTOGRAPHERS
const showDataPhotographers = async () => {
  const contentPhotographer = document.getElementById("photographerIndex"); //le bloc <ul></ul> principal;
  await fetchDataPhotographers(); // on attend que cette fonction récupère les donnée;

  contentPhotographer.innerHTML = datas.photographers
    .map(
      (data) =>
        `<!-- ___________________________________________ -->
    <!--BlockIntroduceIndex 01<li>-->
    <li class="body__blockIntro">
      <h2 class="blockIntro">
        <a class="blockIntro__link" href="#">
          <span class="blockIntro__link__blockImg">
            <img
              class="blockIntro__link__blockImg__img"
              src="./img/Photographers ID Photos/${data.portrait}"
              alt="profile pictures"
            />
          </span>
        </a>
        <span class="blockIntro__title">${data.name}</span>
      </h2>
      <p class="blockIntro__blocktxt">
        <strong class="blockIntro__blocktxt1">${data.city}, ${
          data.country
        }</strong>
        <span class="blockIntro__blocktxt2">
          ${data.tagline}
        </span>
        <span class="blockIntro__blocktxt3">${data.price}/jour</span>
      </p><ul class="blockIntro__ul"> ${data.tags
        .map(
          (tag) => `<li class="blockIntro__ul__linksTags">
        <a
          aria-label="tags"
          href="#"
          class="tagName blockIntro__links__theLink"
          data-value="${tag}"
        >
          #${tag}
          <span class="tagName__bgd"></span>
        </a>
      </li>`
        )
        .join("")}
        </ul></li>
      </ul>
      </li>`
    )
    .join(""); // c'est pour retirer les virgules entre chaque éléments;
};

const onClickNavTags = () => {
  fetchDataPhotographers();
  const contentPhotographer = document.getElementById("photographerIndex"); //le bloc <ul></ul> principal;
  const tagsContent = document.querySelectorAll("nav .tagName"); // On récupère les tags de la navigation;
  const arrayTags = [];
  const arrayBasedOnTagsClicked = [];
  let url;
  tagsContent.forEach((tag) => {
    let tagValue = "#" + tag.dataset.value;
    tag.addEventListener("click", (e) => {
      e.preventDefault();
      //--------------------------------------------------------
      //1/a.On créer des nouveaux tableaux de données, dynamiques et filtrés, en fonction des tags cliqués.
      //--------------------------------------------------------
      const isMatching = datas.photographers.filter((data) => {
        data.tags.includes(`${tag.dataset.value}`);
        return data.tags.includes(`${tag.dataset.value}`);
      });
      //1/b.Ici on ajoute dans un tableau vide, l'index de chaque tableaux isMatching;
      for (i = 0; i < isMatching.length; i++) {
        arrayBasedOnTagsClicked.push(isMatching[i]);
      }
      //1/c.Il faut transformer ce Set en array;
      const uniqueSetFromTagsBasedOnClick = new Set(arrayBasedOnTagsClicked);
      //1/d.On vient de transformer le set en array;
      const backToArrayFromTagsBasedOnClick = [
        ...uniqueSetFromTagsBasedOnClick,
      ];
      //--------------------------------------------
      //On met en place notre condition;
      //--------------------------------------------
      if (arrayTags.includes(tagValue) === false) {
        //1/. On ajoute une classList pour changer l'apparence des tags lors du click;
        tag.classList.add("tagName__onclick");
        //2/.ARRAY DATA TAGS_ON_CLICK //--> On range toutes les données dans un array;
        arrayTags.push(tagValue); //-->On ajoute les valeur dans le tableau lors du clic;

        //3/e.On utilise le tableau qui contient le nouvelles données filtrées,
        //pour les injecter avec un innerHTML, tjrs en fonction des tags cliqués;
        contentPhotographer.innerHTML = backToArrayFromTagsBasedOnClick
          .map(
            (data) => `<!-- ___________________________________________ -->
        <!--BlockIntroduceIndex 01<li>-->
        <li class="body__blockIntro">
          <h2 class="blockIntro">
            <a class="blockIntro__link" href="#">
              <span class="blockIntro__link__blockImg">
                <img
                  class="blockIntro__link__blockImg__img"
                  src="./img/Photographers ID Photos/${data.portrait}"
                  alt="profile pictures"
                />
              </span>
            </a>
            <span class="blockIntro__title">${data.name}</span>
          </h2>
          <p class="blockIntro__blocktxt">
            <strong class="blockIntro__blocktxt1">${data.city}, ${
              data.country
            }</strong>
            <span class="blockIntro__blocktxt2">
              ${data.tagline}
            </span>
            <span class="blockIntro__blocktxt3">${data.price}/jour</span>
          </p><ul class="blockIntro__ul"> ${data.tags
            .map(
              (tag) => `<li class="blockIntro__ul__linksTags">
            <a
              aria-label="tags"
              href="#"
              class="tagName blockIntro__links__theLink"
              data-value="${tag}"
            >
              #${tag}
              <span class="tagName__bgd"></span>
            </a>
          </li>`
            )
            .join("")}
            </ul></li>
          </ul>
          </li>`
          )
          .join("");
      } else if (arrayTags.includes(tagValue) === true) {
        tag.classList.remove("tagName__onclick");
        for (i = 0; i < arrayTags.length; i++) {
          if (arrayTags[i] === tagValue) {
            arrayTags.splice(i, 1);
          }
        }
        console.log(backToArrayFromTagsBasedOnClick);
      }
      url = new URL(
        `../?tags=${arrayTags}`,
        `http://127.0.0.1:5500/index.html`
      );
      window.location.href = url;
    });
  });
};

const getData = () => {
  // //On crée la fonction getData pour récupérer les données
  // fetch("./data/photographes.json") // on utilise fetch (qui attend une promise, toujours!)
  //   .then((response) => {
  //     // voici la promise avec .then() --- apporte une réponse;
  //     console.log(response); // petit console.log pour voir la réponse.
  //     return response.json(); // on return la response pour obtenir un resultat de fetch !
  //   })
  //   .then((body) => {
  //     const dataPhotographers = body.photographers;
  //     dataPhotographers.forEach((items) => {
  //       const photographersIndex = document.querySelector("#photographerIndex");
  //       photographersIndex.innerHTML = `<div><h2>${items.name}</h2></div>`;
  //     });
  //   });
  fetchDataPhotographers(); //ici on récupère les données;
  showDataPhotographers(); //ici on fait apparaitre dynamiquement les données;
};
window.addEventListener("load", () => {
  // un event qui permet d'attendre que tout le html soit chargé avant d'exectuter le js(attendre que le html soit chargé )
  getData();
  onClickNavTags();
});
