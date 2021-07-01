//On appel les variables;
let datas; // toutes les données;
let mediasFromPhotographerId;
let theRightMedia; //Les datas du média;
let thePhotographe; //les datas du photographes
let crossBtnContent; // elements du dom;
let blockContent; //elements du dom;
let modalLegend; //elemnts du dom
//___________________________
//FONCTION QUI TRIE SI C'EST UN MEDIA PHOTO OU VIDEO.
//Appelé dans ShowDatas;
const isChoosingBlocksVideosOrPhotosToInjectMedias = () => {
  const mediaInArray = Object.values(theRightMedia);
  const isVideo = mediaInArray[3].endsWith(".mp4");
  if (isVideo === true) {
    return (blockContent.innerHTML = `
    <div class="modalPhotographies__content">
      <div
        role="dialog"
        class="modalPhotographies__content__body"
        aria-label="image closeup view"
      >
        <div class="modalPhotographies__content__body__BlockIconeX">
          <a
            class="modalPhotographies__content__body__BlockIconeX__iconeX"
            aria-label="Close dialog"
            tabindex="1"
            href="./page.html?id=${theRightMedia.photographerId}"
          >
            <img src="./img/cross icone.png" alt="" />
          </a>
        </div>
  
        <a
          tabindex="0"
          href=""
          aria-label="Next image"
          class="
            modalPhotographies__content__body__iconeToSwitch
            modalPhotographies__content__body__iconeToSwitch--change
          "
          ><img src="img/icone L.png" alt=""
        /></a>
        <figure class="modalPhotographies__content__body__blockPhoto">
          <div id="imgContent">
          <video
          controls
          src="./img/${thePhotographe.name}/${theRightMedia.video}"
          class="modalPhotographies__content__body__photo"
          >
          </video>
          </div>
  
          <figcaption class="modalPhotographies__content__body__legend">
            <span id="modalLegend">${theRightMedia.title}</span>
          </figcaption>
        </figure>
        <a
          tabindex="1"
          aria-label="Previous image"
          href=""
          class="modalPhotographies__content__body__iconeToSwitch"
          ><img src="img/icone L.png" alt=""
        /></a>
      </div>
    </div>`);
  }

  return (blockContent.innerHTML = `
  <div class="modalPhotographies__content">
    <div
      role="dialog"
      class="modalPhotographies__content__body"
      aria-label="image closeup view"
    >
      <div class="modalPhotographies__content__body__BlockIconeX">
        <a
          class="modalPhotographies__content__body__BlockIconeX__iconeX"
          aria-label="Close dialog"
          tabindex="1"
          href="./page.html?id=${theRightMedia.photographerId}"
        >
          <img src="./img/cross icone.png" alt="" />
        </a>
      </div>

      <a
        tabindex="0"
        href=""
        aria-label="Next image"
        class="
          modalPhotographies__content__body__iconeToSwitch
          modalPhotographies__content__body__iconeToSwitch--change
        "
        ><img src="img/icone L.png" alt=""
      /></a>
      <figure class="modalPhotographies__content__body__blockPhoto">
        <div id="imgContent">
        <img
           class="modalPhotographies__content__body__photo"
           src="./img/${thePhotographe.name}/${theRightMedia.image}"
           alt="${theRightMedia.image} by ${thePhotographe.name}"
         />
        </div>

        <figcaption class="modalPhotographies__content__body__legend">
          <span id="modalLegend">${theRightMedia.title}</span>
        </figcaption>
      </figure>
      <a
        tabindex="1"
        aria-label="Previous image"
        href=""
        class="modalPhotographies__content__body__iconeToSwitch"
        ><img src="img/icone L.png" alt=""
      /></a>
    </div>
  </div>`);
};
//___________________________
// API REQUEST
const fetchData = async () => {
  datas = await fetch("./data/photographes.json")
    .then((response) => {
      return response;
    })
    .then((body) => {
      return body.json();
    });
  return datas;
};
//_____________________________
//Injection des données;
const showDatas = async () => {
  await fetchData();
  crossBtnContent = document.querySelector(
    ".modalPhotographies__content__body__BlockIconeX"
  );
  //Récupérer le médias correspondant à l'id du photographe et du media;
  //___________________________________________________________________
  const url = window.location.href;
  let idPhotographer_TypeOfString = url
    .split("?")[1]
    .split("&")[0]
    .split("=")[1];
  let idMedia_TypeOfString = url.split("?")[1].split("&")[1].split("=")[1];
  //___________
  //On fait correspondre le type de variables en typeOf Number;
  let idPhotographe_nmb = parseInt(idPhotographer_TypeOfString);
  let idMedia_nmb = parseInt(idMedia_TypeOfString);

  //Le media correspondant à l'id;
  theRightMedia = datas.media.find((media) => {
    return media.id === idMedia_nmb;
  });

  //Le photographe correspondant aux medias;
  thePhotographe = datas.photographers.find((theOne) => {
    return theOne.id === idPhotographe_nmb;
  });

  //On obtient tout les medias correspondant à l'id du photographe;
  mediasFromPhotographerId = datas.media.filter((medias) => {
    return medias.photographerId === idPhotographe_nmb;
  });
  console.log(mediasFromPhotographerId);
  //On appel l'elmnt du dom;
  blockContent = document.querySelector(".modalPhotographies--change");
  //On injecte le bon media;
  isChoosingBlocksVideosOrPhotosToInjectMedias();
};
window.addEventListener("load", () => {
  showDatas();
});
