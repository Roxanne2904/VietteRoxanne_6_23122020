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
  const contentPhotographer = document.getElementById("photographerIndex"); //le bloc <ul></ul> principal;
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
    console.log(datas); //la variable qui renferme les données;ici il y a deux array(photographers et media)
  };

  //SHOWING DATAS PHOTOGRAPHERS
  const showDataPhotographers = async () => {
    await fetchDataPhotographers(); // c'est ici qu'on appel notre fonction qui a récupéré les données;

    contentPhotographer.innerHTML = datas.photographers
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
          <strong class="blockIntro__blocktxt1">${data.city}, ${data.country}</strong>
          <span class="blockIntro__blocktxt2">
            ${data.tagline}
          </span>
          <span class="blockIntro__blocktxt3">${data.price}/jour</span>
        </p>
        <ul class="blockIntro__ul">
            <li class="blockIntro__ul__linksTags">
              <a
                aria-label="tags"
                href="#"
                class="tagName blockIntro__links__theLink"
              >
                #${data.tags[0]}
                <span class="tagName__bgd"></span>
              </a>
            </li>
            <li class="blockIntro__ul__linksTags">
              <a
                aria-label="tags"
                href="#"
                class="tagName blockIntro__links__theLink"
              >
                #${data.tags[1]}
                <span class="tagName__bgd"></span>
              </a>
            </li>
            <li class="blockIntro__ul__linksTags">
              <a
                aria-label="tags"
                href="#"
                class="tagName blockIntro__links__theLink"
              >
                #${data.tags[2]}
                <span class="tagName__bgd"></span>
              </a>
            </li>
            <li class="blockIntro__ul__linksTags">
              <a
                aria-label="tags"
                href="#"
                class="tagName blockIntro__links__theLink"
              >
                #${data.tags[3]}
                <span class="tagName__bgd"></span>
              </a>
            </li>
          </ul>
        </li>
      </ul>
      </li>`
      )
      .join(""); // c'est pour retirer les virgules entre chaque éléments;
  };

  showDataPhotographers();
};
window.addEventListener("load", () => {
  // un event qui permet d'attendre que tout le html soit chargé avant d'exectuter le js(attendre que le html soit chargé )
  getData();
});
