let scrollYPosition; //On déclare la variable
const onScrollDisplayOn = () => {
  const btnToGoUp = document.querySelector("#linkToGoUp");

  window.addEventListener("scroll", () => {
    scrollYPosition = window.scrollY;
    if (scrollYPosition >= 10) {
      btnToGoUp.style.display = "block";
    } else if (scrollYPosition === 0) {
      btnToGoUp.style.display = "none";
    }
  });
};
//_____________________________________________
//_____________________________________________
//GESTION DES DONNEES DYNAMIQUES
//*******************************/
let datas; //les données seront stocké dans cette variable;
//FONCTION: LORS DU CLICK SUR LES TAGS, LES PHOTOGRAPHES SONT FILTRES;
//applé dans ShowDatas();
const onClickNavTags = () => {
  const contentPhotographer = document.getElementById("photographerIndex"); //le bloc <ul></ul> principal;
  const tagsContent = document.querySelectorAll("nav .tagName"); // On récupère les tags de la navigation;
  const arrayTags = []; //pour afficher dans l'url;
  let isMatching; //-OBJECT-récupération des données des photographes concernépar les filtres;
  let urlObject;
  tagsContent.forEach((tag) => {
    let tagValue = tag.dataset.value;
    tag.addEventListener("click", (e) => {
      e.preventDefault();
      // //--------------------------------------------------------
      // //1/a.On créer des nouveaux tableaux de données, dynamiques et filtrés, en fonction des tags cliqués.
      // //--------------------------------------------------------
      // const isMatching = datas.photographers.filter((data) => {
      //   return data.tags.includes(`${tag.dataset.value}`);
      // });
      // //1/b.Ici on ajoute dans un tableau vide, l'index de chaque tableaux isMatching;
      // arrayBasedOnTagsClicked.push(...isMatching);
      // //1/c.Il faut transformer ce Set en array;
      // const uniqueSetFromTagsBasedOnClick = new Set(arrayBasedOnTagsClicked);
      // //1/d.On vient de transformer le set en array;
      // const backToArrayFromTagsBasedOnClick = [
      //   ...uniqueSetFromTagsBasedOnClick,
      // ];
      //--------------------------------------------
      //On met en place notre condition;
      //--------------------------------------------
      if (arrayTags.includes(tagValue) === false) {
        //1/. On ajoute une classList pour changer l'apparence des tags lors du click;
        tag.classList.add("tagName__onclick");
        tag.setAttribute("aria-label", `#${tag.dataset.value} is active`);
        //2/.ARRAY DATA TAGS_ON_CLICK //--> On range toutes les données dans un array;
        arrayTags.push(tagValue); //-->On ajoute les valeur dans le tableau lors du clic;
        //1/a.isMatching est un object qui récupère les données des photographes correspondant aux filtres cliqués;
        //--------------------------------------------------------
        isMatching = datas.photographers.filter((data) => {
          return arrayTags.every((e) => {
            return data.tags.includes(e);
          });
        });
        //3/e.On utilise isMatching pour injecter uniquement les photographes filtrés;
        contentPhotographer.innerHTML = isMatching
          .map(
            (data) => `<!-- ___________________________________________ -->
        <!--BlockIntroduceIndex 01<li>-->
        <li class="body__blockIntro">
          <h2 class="blockIntro">
            <a class="blockIntro__link" href="./page.html?id=${data.id}">
              <span class="blockIntro__link__blockImg">
                <img
                  class="blockIntro__link__blockImg__img"
                  src="./img/Photographers_ID_Photos/${data.portrait}"
                  alt="${data.alt}"
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
              <span
              class="tagName tagName--changeForIndexBlock blockIntro__links__theLink"
              data-value="${tag}"
              tabindex="0"
            >
              #${tag}
              <span class="tagName__bgd"></span>
            </span>
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
        tag.removeAttribute("aria-label");
        for (let i = 0; i < arrayTags.length; i++) {
          if (arrayTags[i] === tagValue) {
            arrayTags.splice(i, 1);
          }
        }

        isMatching = datas.photographers.filter((data) => {
          return arrayTags.every((e) => {
            return data.tags.includes(e);
          });
        });
        contentPhotographer.innerHTML = isMatching
          .map(
            (data) => `<!-- ___________________________________________ -->
        <!--BlockIntroduceIndex 01<li>-->
        <li class="body__blockIntro">
          <h2 class="blockIntro">
            <a class="blockIntro__link" href="./page.html?id=${data.id}">
              <span class="blockIntro__link__blockImg">
                <img
                  class="blockIntro__link__blockImg__img"
                  src="./img/Photographers_ID_Photos/${data.portrait}"
                  alt="${data.alt}"
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
              <span
              class="tagName tagName--changeForIndexBlock blockIntro__links__theLink"
              data-value="${tag}"
              tabindex="0"
            >
              #${tag}
              <span class="tagName__bgd"></span>
            </span>
          </li>`
            )
            .join("")}
            </ul></li>
          </ul>
          </li>`
          )
          .join("");
      }
      urlObject = new URL(window.location);

      const state = { tags: `${arrayTags}` };
      const title = "";
      urlObject.searchParams.set("tags", `${arrayTags}`);
      window.history.pushState(state, title, urlObject);
      if (arrayTags.length === 0) {
        // On remet à jour l'url;
        urlObject = new URL(window.location);
        urlObject.searchParams.delete("tags");
        window.history.pushState({}, "", urlObject);
      }
    });
  });
};
//____________________________
//I) API REQUEST
const fetchDataPhotographers = async () => {
  datas = await fetch("./data/photographes.json")
    .then((response) => {
      return response.json(); //retourne une promise;
    })
    .then((body) => {
      return body; //retourne le résultat;
    });
  //console.log(datas); //la variable qui renferme les données;ici il y a deux array(photographers et media)
};
//____________________________
//II) SHOWING DATAS PHOTOGRAPHERS
const showDataPhotographers = async () => {
  await fetchDataPhotographers(); // on attend que cette fonction récupère les donnée;
  const contentPhotographer = document.getElementById("photographerIndex"); //le bloc <ul></ul> principal;
  contentPhotographer.innerHTML = datas.photographers
    .map(
      (data) =>
        `<!-- ___________________________________________ -->
    <!--BlockIntroduceIndex 01<li>-->
    <li class="body__blockIntro">
     <a class="blockIntro__link" href="./page.html?id=${data.id}">
     <h2 class="blockIntro">
      <span class="blockIntro__title">${data.name}</span>
      </h2>
      <span class="blockIntro__link__blockImg">
        <img
          class="blockIntro__link__blockImg__img"
          src="./img/Photographers_ID_Photos/${data.portrait}"
          alt="image of ${data.alt}"
        />
      </span>
    </a>
      
      <p class="blockIntro__blocktxt">
        <strong class="blockIntro__blocktxt1">${data.city}, ${
          data.country
        }</strong>
        <span class="blockIntro__blocktxt2">
          ${data.tagline}
        </span>
        <span class="blockIntro__blocktxt3">${data.price}€/jour</span>
      </p><ul class="blockIntro__ul"> ${data.tags
        .map(
          (tag) => `<li class="blockIntro__ul__linksTags">
        <span
          class="tagName tagName--changeForIndexBlock blockIntro__links__theLink"
          data-value="${tag}"
          tabindex="0"
        >
          #${tag}
          <span class="tagName__bgd"></span>
        </span>
      </li>`
        )
        .join("")}
        </ul></li>
      </ul>
      </li>`
    )
    .join(""); // c'est pour retirer les virgules entre chaque éléments;

  onClickNavTags();
};
//Dès le chargement du contenu HTML, getData(); sera applée;
window.addEventListener("load", () => {
  onScrollDisplayOn();
  showDataPhotographers();
});
