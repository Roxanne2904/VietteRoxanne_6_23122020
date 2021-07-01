let scrollYPosition; //On déclare la variable
const onScrollDisplayOn = () => {
  const btnToGoUp = document.querySelector("#linkToGoUp");
  window.addEventListener("scroll", (e) => {
    scrollYPosition = e.path[1].scrollY;
    // console.log(scrollYPosition);
    if (scrollYPosition >= 49) {
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
  const arrayTagsWithoutHastag = []; //pour ranger les données de l'url sans le #;
  let arrayBasedOnTagsClicked = []; //réorganiser le tableau "photographers" en fonction des tags séléctionnés;
  let url = `http://127.0.0.1:5500/index.html/`;
  tagsContent.forEach((tag) => {
    let tagValue = "#!" + tag.dataset.value;
    tag.addEventListener("click", (e) => {
      e.preventDefault();
      //--------------------------------------------------------
      //1/a.On créer des nouveaux tableaux de données, dynamiques et filtrés, en fonction des tags cliqués.
      //--------------------------------------------------------
      const isMatching = datas.photographers.filter((data) => {
        return data.tags.includes(`${tag.dataset.value}`);
      });
      //1/b.Ici on ajoute dans un tableau vide, l'index de chaque tableaux isMatching;
      arrayBasedOnTagsClicked.push(...isMatching);
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
        arrayTagsWithoutHastag.push(tag.dataset.value); //-->même données, sans le #;

        //3/e.On utilise le tableau qui contient le nouvelles données filtrées,
        //pour les injecter avec un innerHTML, tjrs en fonction des tags cliqués;
        contentPhotographer.innerHTML = backToArrayFromTagsBasedOnClick
          .map(
            (data) => `<!-- ___________________________________________ -->
        <!--BlockIntroduceIndex 01<li>-->
        <li class="body__blockIntro">
          <h2 class="blockIntro">
            <a class="blockIntro__link" href="./page.html?id=${data.id}">
              <span class="blockIntro__link__blockImg">
                <img
                  class="blockIntro__link__blockImg__img"
                  src="./img/Photographers ID Photos/${data.portrait}"
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
            <a
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
            arrayTagsWithoutHastag.splice(i, 1);
          }
        }
        arrayBasedOnTagsClicked = arrayBasedOnTagsClicked.filter((item) => {
          return item.tags.some((tag) => {
            return arrayTagsWithoutHastag.includes(tag);
          });
        });
        const uniqueSetFromTagsBasedOnClickAfterRemovingTag = new Set(
          arrayBasedOnTagsClicked
        );
        const backToArrayAfterRemovingTag = [
          ...uniqueSetFromTagsBasedOnClickAfterRemovingTag,
        ];
        contentPhotographer.innerHTML = backToArrayAfterRemovingTag
          .map(
            (data) => `<!-- ___________________________________________ -->
        <!--BlockIntroduceIndex 01<li>-->
        <li class="body__blockIntro">
          <h2 class="blockIntro">
            <a class="blockIntro__link" href="./page.html?id=${data.id}">
              <span class="blockIntro__link__blockImg">
                <img
                  class="blockIntro__link__blockImg__img"
                  src="./img/Photographers ID Photos/${data.portrait}"
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
            <a
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
      }
      url = new URL(`..?tags=${arrayTags}`, url);
      window.location.href = url;
    });
  });
};
//____________________________
//I) API REQUEST
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
      <h2 class="blockIntro">
        <a class="blockIntro__link" href="./page.html?id=${data.id}">
          <span class="blockIntro__link__blockImg">
            <img
              class="blockIntro__link__blockImg__img"
              src="./img/Photographers ID Photos/${data.portrait}"
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
        <a
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

  onClickNavTags();
};
//Dès le chargement du contenu HTML, getData(); sera applée;
window.addEventListener("load", () => {
  onScrollDisplayOn();
  showDataPhotographers();
});
