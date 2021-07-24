//___________________________
//Declarations des variables;
//---------------------------
let datas; //variables qui va récupérer les données;
let urlObject;
let mediasIsMatchingWithId; //Les Médias correspondants à l'Id du photographes;
let arrayIdIsNotFiltering; //les id des medias SANS l'activation des filtres;
let arrayIdIsFiltering; // les id des medias AVEC l'activation des filtres;
let arrayIdMedia; //tableau généré pour récupérer les id des medias dans l'ordre d'apparition;
let photographe; //renferme les données DU photographe de la page;
let idMedia_TypeOfNumber; // L'id DU media visualisé -type of number-;
let blocksContentModalLink; // ELMTS DU DOM -- les blocks btn pour ouvrir la modale;
let likesBtnPerBlocks; //ELMTS DU DOM --les btns qui servent à liker les médias;
let blockOfTotalLikes; //ELMTS DU DOM --Le block fixe qui indique le total de likes -en bas à droite-;
let theRightMedia; // Le media et ses données correspondant à la modal lors de sa visualisation;
let theModalPhoto = document.querySelector(".modalPhotographies--change");
const ulContentForPhotos = document.querySelector("#photosBody"); //Pour injecter les medias dynamiquement;
const selectBtn = document.querySelector("#sort-select"); //btn select
//Pour la modale photo
const figureContent = document.querySelector(
  ".modalPhotographies__content__body__blockPhoto"
);
//_________________________________________________________________________
//FONCTION QUI RECUPERE LES BONS ELEMENTS DU DOM POUR LES LIKER LORS DU CLICK;
//appelée dans showDatas(); et showDatasFiltering();
const onClickAddOrRemoveLikes = (elements) => {
  elements.forEach((elt) => {
    elt.addEventListener("click", () => {
      let arrayOfTotalLikes = [];
      let storeNumberOfLikes;
      //-------------------------------------
      const idDataTypeOfString = elt.parentElement.parentElement.dataset.value; //La valeur est une string;
      const idDataTypeOfNumb = parseInt(idDataTypeOfString); //elle devient un type number;
      let idMediaDatas = mediasIsMatchingWithId.filter((item) => {
        return item.id === idDataTypeOfNumb;
      });
      storeNumberOfLikes = idMediaDatas[0].likes; //output le nbs de likes actuel
      if (elt.children[0].dataset.add === "no") {
        //on lui ajoute le like;
        storeNumberOfLikes++;
        //On "sauvegarde" la nouvelle donnée du nbs de like + son status si liker ou non ;
        idMediaDatas[0].moreLike = "yes";
        idMediaDatas[0].likes = storeNumberOfLikes;
        idMediaDatas = mediasIsMatchingWithId.filter((item) => {
          return item.id === idDataTypeOfNumb;
        });
        console.log(idMediaDatas);
        elt.innerHTML = `<span data-add="${idMediaDatas[0].moreLike}" aria-label="nombre de j'aime" class="heart__nbs">${idMediaDatas[0].likes}</span>
          <span class="heart__img"
          ><img src="./img/Vector.png" alt="J'aime"
          /></span>`;
      } else if (elt.children[0].dataset.add === "yes") {
        storeNumberOfLikes--;

        idMediaDatas[0].moreLike = "no";
        idMediaDatas[0].likes = storeNumberOfLikes;
        idMediaDatas = mediasIsMatchingWithId.filter((item) => {
          return item.id === idDataTypeOfNumb;
        });
        elt.innerHTML = `<span data-add="${idMediaDatas[0].moreLike}" aria-label="nombre de j'aime" class="heart__nbs">${idMediaDatas[0].likes}</span>
          <span class="heart__img"
          ><img src="./img/Vector.png" alt="J'aime"
          /></span>`;
      }
      // ___________________________________________
      // ADDITIONNER LE TOTAL DE LIKES DYNAMIQUEMENT
      mediasIsMatchingWithId.forEach((media) => {
        const nbsOflikes = Object.values(media);
        const likesInArray = [nbsOflikes[5]]; //output :[52]; pour chaque likes de chaque medias;
        arrayOfTotalLikes.push(...likesInArray); //output :[1,2,3,36,12,36]par ex; tout est regroupé dans 1 seul tableau;
        return arrayOfTotalLikes;
      });
      const reducer = (accumulator, currentValue) => {
        return accumulator + currentValue;
      };
      let TotalDataOfLikes = arrayOfTotalLikes.reduce(reducer);
      blockOfTotalLikes.innerHTML = `${TotalDataOfLikes}
          <img
          class="blockPrice____nbsOfLikes__heartIcone"
          src="./img/heart__black.png"
          alt=""
            />`;
    });
  });
};
//FONCTION QUI VIENT TRIER SI BLOCK VIDEO OU PHOTO;
//appelée dans showDatas(); et showDatasFiltering();
//[!]Factory Pattern;
//Utilisé dans isChoosingBlocksVideosOrPhotosToInjectMedias();
class FactoryMedias {
  static init(media, photographe) {
    const mediaInArray = Object.values(media);
    const isVideo = mediaInArray[3].endsWith(".mp4");
    if (isVideo) {
      return new Video(media, photographe);
    } else {
      return new Img(media, photographe);
    }
  }
}
class Video {
  constructor(media, photographe) {
    this.media = media; //media de la map mis en place;
    this.photographe = photographe; //photographe de la variable photographe initialisé plus haut;
  }
  html() {
    return `<li class="block__bodyPhotos__li ">
       <!-- ___________________________________________ -->
       <!--BlockVideo-valide- 03-->
        <figure class="blockPhoto__content" data-value="${this.media.id}">
         <div
         tabindex="0"
         class="blockPhoto__content__linkImg"
         >
           <span
             class="
               blockPhoto__content__linkImg__blockImg
             "
           >
             <video
             src="./img/${this.photographe.nameFile}/${this.media.video}"
             aria-label="${this.media.title} by ${this.photographe.name}, video closeup view"
             class="blockPhoto__content__linkImg__blockImg__video"
             controls
             >
             </video>
           </span>
         </div>
          <figcaption data-value="${this.media.id}" class="blockPhoto__content__legend">
           <span class="blockPhoto__content__legend__photoName">${this.media.title}</span>
            <div>
            <button class="heart">
              <span data-add="${this.media.moreLike}" class="heart__nbs">${this.media.likes}</span>
             <span class="heart__img"
               ><img src="./img/Vector.png" alt="J'aime"/></span>
           </button>
           </div>

         </figcaption>
       </figure>
       <!-- ___________________________________________ -->
     </li>`;
  }
}
class Img {
  constructor(media, photographe) {
    this.media = media;
    this.photographe = photographe;
  }
  html() {
    return `<li class="block__bodyPhotos__li">
    <!-- ___________________________________________ -->
    <!--BlockPhotos 01-->
    <figure class="blockPhoto__content" data-value="${this.media.id}">
      <div 
      tabindex="0"
      class="blockPhoto__content__linkImg"
      >
        <span class="blockPhoto__content__linkImg__blockImg">
          <img
            class="blockPhoto__content__linkImg__blockImg__img"
            src="./img/${this.photographe.nameFile}/${this.media.image}"
            alt="${this.media.title} by ${this.photographe.name}, image closeup view"/>
        </span>
      </div>
      <figcaption data-value="${this.media.id}" class="blockPhoto__content__legend">
        <span class="blockPhoto__content__legend__photoName">${this.media.title}</span>
        <div>
        <button class="heart">
          <span data-add="${this.media.moreLike}" class="heart__nbs">${this.media.likes}</span>
          <span class="heart__img"
            ><img src="./img/Vector.png" alt="J'aime"
          /></span>
        </button>
        </div>
      </figcaption>
    </figure>
    <!-- ___________________________________________ -->
  </li>`;
  }
}
//------------------------------------------------------------------------------
const isChoosingBlocksVideosOrPhotosToInjectMedias = (array, photographe) => {
  ulContentForPhotos.innerHTML = array
    .map((media) => {
      const isItVideo = FactoryMedias.init(media, photographe);
      return isItVideo.html();
    })
    .join("");
};
//FONCTION QUI MONTRE LES MEDIAS SI LES FILTRES SONT UTILISES;
// appelée dans ShowDatas;
const showDatasFiltering = () => {
  let newArray;
  let icone;
  const blockContentSelect = document.querySelector(".block__content");
  selectBtn.addEventListener("click", () => {
    icone = "";
    if (icone === blockContentSelect.dataset.value) {
      blockContentSelect.dataset.value = "";
    } else {
      blockContentSelect.dataset.value = icone;
    }
  });
  selectBtn.addEventListener("keydown", (e) => {
    const keyCode = e.keyCode;
    if (keyCode === 13) {
      selectBtn.click();
    }
  });
  selectBtn.onfocus = function getFocus() {
    blockContentSelect.style.border = "solid black 1px";
  };
  selectBtn.onblur = function getBlur() {
    blockContentSelect.style.border = "solid transparent 2px";
    blockContentSelect.dataset.value = "";
  };
  //_________________________________________________________________
  selectBtn.addEventListener("change", (e) => {
    const value = e.target.value;
    //___________
    if (value === "date") {
      newArray = mediasIsMatchingWithId.sort((data1, data2) => {
        return data1.date.localeCompare(data2.date);
      });
    } else if (value === "titre") {
      newArray = mediasIsMatchingWithId.sort((data1, data2) => {
        return data1.title.localeCompare(data2.title);
      });
    } else if (value === "popularite") {
      newArray = mediasIsMatchingWithId.sort((data1, data2) => {
        return data2.likes - data1.likes;
      });
    }
    //On récupère les media filtrés rangés dans un nouvel array, que l'on injecte dynamiquement;
    isChoosingBlocksVideosOrPhotosToInjectMedias(newArray, photographe);

    //On récupère les nouveau éléments du DOM:
    likesBtnPerBlocks = document.querySelectorAll(".heart"); // les btn likes
    blockOfTotalLikes = document.querySelector(".blockPrice__nbsOfLikes"); //les btn img pour ouvrir la modale;

    //Lors des click sur les likes:
    onClickAddOrRemoveLikes(likesBtnPerBlocks);

    // OUVRIR LA MODALE PHOTO APRES AVOIR FILTRE;
    // On peut accéder à la modal photo's view;
    blocksContentModalLink = document.querySelectorAll(
      ".blockPhoto__content__linkImg"
    );
    //----
    isfocusingElementToOpeningModalPhoto(blocksContentModalLink);
    //----
    //On récupère les id dans l'ordre corespondant aux filtres;
    arrayIdIsFiltering = newArray.map((media) => media.id);
    arrayIdMedia = arrayIdIsFiltering;
    console.log("arrayIdMedia IS filtering per :" + " " + `${value}`);
    console.log(arrayIdMedia);
  });
};
//------------
//MODALE FORM
//------------
//FONCTION POUR VALIDER LE FORMULAIRE
const form = document.querySelector("#myForm");
form.onsubmit = function validate(event) {
  event.preventDefault();
  const first = document.querySelector("#firstName");
  const name = document.querySelector("#familyName");
  const email = document.querySelector("#email");
  const textArea = document.querySelector("#textArea");
  const allArrayInputs = [first, name, email, textArea];

  for (let i = 0; i < allArrayInputs.length; i++) {
    const isValid = allArrayInputs[i].validity.valid;

    if (!isValid) {
      allArrayInputs[i].parentElement.dataset.errorVisible = "true";
    }
    if (isValid === true) {
      allArrayInputs[i].parentElement.dataset.errorVisible = "false";
    }
  }
  const allIsValid = (currentValue) => {
    return currentValue.validity.valid === true;
  };
  if (allArrayInputs.every(allIsValid) === true) {
    console.log("Form Data");
    console.log({
      prenom: `${allArrayInputs[0].value}`,
      nom: `${allArrayInputs[1].value}`,
      email: `${allArrayInputs[2].value}`,
      textArea: `${allArrayInputs[3].value}`,
    });
    isClosingTheModal();
  }
};
//FONCTION QUI INDIQUE SI LA VALEUR INPUT EST VALID OU NON LORS DU ONCHANGE;
//appelée dans showDatas;
const isChangingValueInsideFormModal = () => {
  const first = document.querySelector("#firstName");
  const name = document.querySelector("#familyName");
  const email = document.querySelector("#email");
  const textArea = document.querySelector("#textArea");
  const allArrayInputs = [first, name, email, textArea];

  for (let i = 0; i < allArrayInputs.length; i++) {
    allArrayInputs[i].addEventListener("change", () => {
      const valid = allArrayInputs[i].validity.valid;
      if (!valid) {
        allArrayInputs[i].parentElement.dataset.errorVisible = "true";
        allArrayInputs[i].setAttribute(
          "aria-label",
          `Erreur pour le champ ${allArrayInputs[i].id}, ${allArrayInputs[i].parentElement.dataset.error}`
        );
      }
      if (valid === true) {
        allArrayInputs[i].parentElement.dataset.errorVisible = "false";
        allArrayInputs[i].removeAttribute("aria-label");
        allArrayInputs[i].setAttribute(
          "aria-label",
          `Le champ ${allArrayInputs[i].id} est valide`
        );
      }
    });
  }
};
//FONCTIONS POUR FERMER ET OUVRIR LA MODAL AVEC LE FORMULAIRE;
//toute deux appellées dans isLaunchingTheOpenModalEvent(); et isLaunchingTheCloseModalEvent();
const isOpeningTheModal = async () => {
  await fetchDatas();

  const formulaire = document.querySelector(".modalContent__body__form");
  const bgdModal = document.querySelector(".modal");
  const photographName = document.querySelector(
    ".modalContent__body__blockTitle__Title"
  );
  //-----------------
  formulaire.reset();
  const first = document.querySelector("#firstName");
  const name = document.querySelector("#familyName");
  const email = document.querySelector("#email");
  const textArea = document.querySelector("#textArea");

  const allArrayInputs = [first, name, email, textArea];
  for (let i = 0; i < allArrayInputs.length; i++) {
    if (allArrayInputs[i].value === "") {
      allArrayInputs[i].removeAttribute("aria-label");
      allArrayInputs[i].parentElement.dataset.errorVisible = "false";
    }
  }
  //-----------------
  const url = window.location.href;
  let url_idString = url.split("=")[1]; //par ex: 123; typeof ="string";
  const url_IdNmb = parseInt(url_idString); // notre id devient un typeof = number;
  const photographe = datas.photographers.find((item) => {
    return item.id === url_IdNmb;
  });
  //----------------------------------------------------
  bgdModal.style.display = "block";
  if (bgdModal.style.display === "block") {
    const modalFormBgd = document.querySelector("#modal-form");
    modalFormBgd.ariaModal = "true";
    if (modalFormBgd.ariaModal === "true") {
      modalFormBgd.focus();
    }
  }
  photographName.dataset.photographer = `${photographe.name}`;
};
//applée aussi dans validate pour le btnSubmit;
const isClosingTheModal = () => {
  //------------------------------------------------
  const bgdModal = document.querySelector(".modal");
  //---------------------------------------------------
  bgdModal.style.display = "none";
  if (bgdModal.style.display === "none") {
    const modalFormBgd = document.querySelector(".modal");
    modalFormBgd.ariaModal = "false";
  }
};
//Lancement de l'ouverture et fermeture de la modal
//Toute deux sont appelées dans ShowDatas();
const isLaunchingTheOpenModalEvent = () => {
  const btnOpenModal = document.querySelectorAll(".openModalForm");
  console.log(btnOpenModal);
  btnOpenModal.forEach((btn) => {
    btn.addEventListener("click", isOpeningTheModal);
  });
};
const isLaunchingTheCloseModalEvent = () => {
  const btnCloseModal = document.querySelector(".iconeX");
  btnCloseModal.addEventListener("click", isClosingTheModal);
};
//------------
//MODALE PHOTO
//------------
//FONCTION QUI AJOUTE LE CONTENU VIDEOS OU PHOTOS DANS LA MODALE;
//appellée dans isfocusingElementToOpeningAndClosingModalPhoto;
const isAddingVideoOrPhotoContentIntoTheModal = () => {
  const mediaInArray = Object.values(theRightMedia);
  const isVideo = mediaInArray[3].endsWith(".mp4");
  if (isVideo === true) {
    return (figureContent.innerHTML = `
        
          <div id="imgContent">
          <video
          controls
          aria-label="Video, ${theRightMedia.title} by ${photographe.name}"
          src="./img/${photographe.nameFile}/${theRightMedia.video}"
          class="modalPhotographies__content__body__photo"
          >
          </video>
          </div>
  
          <figcaption class="modalPhotographies__content__body__legend">
            <span id="modalLegend">${theRightMedia.title}</span>
          </figcaption>
       `);
  }
  return (figureContent.innerHTML = `
      
        <div id="imgContent">
        <img
           class="modalPhotographies__content__body__photo"
           src="./img/${photographe.nameFile}/${theRightMedia.image}"
           alt="${theRightMedia.title} by ${photographe.name}"/>
        </div>

        <figcaption class="modalPhotographies__content__body__legend">
          <span id="modalLegend">${theRightMedia.title}</span>
        </figcaption>
      
`);
};
//FONCTION QUI RECUPERE LES BTNS QUI VONT PERMETTRE L'OUVERTURE DE LA MODALE;
//appelée dans showDatas() et showDatasFiltering();
const isfocusingElementToOpeningModalPhoto = (elements) => {
  elements.forEach((elt) => {
    elt.addEventListener("click", () => {
      theModalPhoto.style.display = "block";
      if (theModalPhoto.style.display === "block") {
        theModalPhoto.ariaModal = "true";
        theModalPhoto.focus();
      }
      const idMedia_TypeOfString = elt.parentElement.dataset.value;
      idMedia_TypeOfNumber = parseInt(idMedia_TypeOfString);
      //________________________________
      // on met à jour le searchParams de l'URL:
      urlObject = new URL(window.location);
      const state = { media_id: `${idMedia_TypeOfNumber}` };
      const title = "";
      urlObject.searchParams.set("id_media", `${idMedia_TypeOfNumber}`);
      window.history.pushState(state, title, urlObject);
      //________________________________
      theRightMedia = mediasIsMatchingWithId.find((media) => {
        return media.id === idMedia_TypeOfNumber;
      });
      isAddingVideoOrPhotoContentIntoTheModal();
    });
    elt.addEventListener("keydown", (e) => {
      const keyCode = e.code;
      if (keyCode === "Enter") {
        e.preventDefault();
        elt.click();
      }
    });
  });
  //ON ferme la modale;
  isClosingModalPhoto();
};
//FONCTION QUI CHANGE LES MEDIAS SI BTN NEXT OU PREVIOUS;
//appelé dans isOnClickToPassNextImg();
const isChangingMediaNext = (arrayIdElmts) => {
  const currentId = (elt) => {
    return elt === idMedia_TypeOfNumber; //ne pas oublier de return un resultat !!!
  };
  let currentIndexMedia = arrayIdElmts.findIndex(currentId);
  const nextMedia = currentIndexMedia + 1;
  //On actualise le nouvel id du nouveau media en visualisation;
  idMedia_TypeOfNumber = arrayIdElmts[nextMedia];
  //On met à jour dans l'url;
  urlObject = new URL(window.location);
  const state = { media_id: `${arrayIdElmts[nextMedia]}` };
  const title = "";
  urlObject.searchParams.set("id_media", `${arrayIdElmts[nextMedia]}`);
  window.history.pushState(state, title, urlObject);
  //_______________________________________
  if (idMedia_TypeOfNumber === undefined) {
    console.log("On retourne à l'index 0");
    let arrayLength = arrayIdElmts.length;
    let returnToIndex0 = 0 % arrayLength; // output 0;
    idMedia_TypeOfNumber = arrayIdElmts[returnToIndex0];
    //On met à jour dans l'url;
    urlObject = new URL(window.location);
    const state = { media_id: `${arrayIdElmts[returnToIndex0]}` };
    const title = "";
    urlObject.searchParams.set("id_media", `${arrayIdElmts[returnToIndex0]}`);
    window.history.pushState(state, title, urlObject);
  }
  //On récupère l'id du media présent dans l'url;
  let getTheIdFromUrl = window.location.href
    .split("?")[1]
    .split("&")[1]
    .split("=")[1];
  let theIdFromUrlNumber = parseInt(getTheIdFromUrl);

  mediasIsMatchingWithId.map((media) => {
    if (media.id === theIdFromUrlNumber) {
      theRightMedia = mediasIsMatchingWithId.find((media) => {
        return media.id === theIdFromUrlNumber;
      });
      isAddingVideoOrPhotoContentIntoTheModal();
    }
  });
};
//appelé dans isOnClickToPassPreviousImg();
const isChangingMediaPrevious = (arrayIdElmts) => {
  const currentId = (elt) => {
    return elt === idMedia_TypeOfNumber; //ne pas oublier de return un resultat !!!
  };
  let currentIndexMedia = arrayIdElmts.findIndex(currentId);
  const nextMedia = currentIndexMedia - 1;
  //On actualise le nouvel id du nouveau media en visualisation;
  idMedia_TypeOfNumber = arrayIdElmts[nextMedia];
  //On met à jour dans l'url;
  urlObject = new URL(window.location);
  const state = { media_id: `${arrayIdElmts[nextMedia]}` };
  const title = "";
  urlObject.searchParams.set("id_media", `${arrayIdElmts[nextMedia]}`);
  window.history.pushState(state, title, urlObject);
  //_______________________________________
  if (idMedia_TypeOfNumber === undefined) {
    console.log("On retourne à l'index 0");
    let arrayLength = arrayIdElmts.length;
    let returnToIndex0 = (arrayLength - 1) % arrayLength; // output ?;

    idMedia_TypeOfNumber = arrayIdElmts[returnToIndex0];
    //On met à jour dans l'url;
    urlObject = new URL(window.location);
    const state = { media_id: `${arrayIdElmts[returnToIndex0]}` };
    const title = "";
    urlObject.searchParams.set("id_media", `${arrayIdElmts[returnToIndex0]}`);
    window.history.pushState(state, title, urlObject);
  }
  //On récupère l'id du media présent dans l'url;
  let getTheIdFromUrl = window.location.href
    .split("?")[1]
    .split("&")[1]
    .split("=")[1];
  let theIdFromUrlNumber = parseInt(getTheIdFromUrl);

  mediasIsMatchingWithId.map((media) => {
    if (media.id === theIdFromUrlNumber) {
      theRightMedia = mediasIsMatchingWithId.find((media) => {
        return media.id === theIdFromUrlNumber;
      });
      isAddingVideoOrPhotoContentIntoTheModal();
    }
  });
};
//FONCTION POUR PASSER LES IMAGES DE LA MODALE -EVENT ONCLICK-.
//toute deux appelées dans showdatas;
const isOnClickToPassPreviousImg = (array) => {
  array = arrayIdMedia;

  if (array === arrayIdIsNotFiltering) {
    console.log("je ne suis pas filtré : < previous");
    isChangingMediaPrevious(array);
  }
  if (array === arrayIdIsFiltering) {
    console.log("je suis filtré : < previous");
    isChangingMediaPrevious(array);
  }
};
const isOnClickToPassNextImg = (array) => {
  array = arrayIdMedia;
  if (array === arrayIdIsNotFiltering) {
    console.log("je ne suis pas filtré : > next ");
    isChangingMediaNext(array);
  }
  if (array === arrayIdIsFiltering) {
    console.log("je suis filtré : > next");
    isChangingMediaNext(array);
  }
};
//FONCTION POUR PASSER LES IMAGES DE LA MODALE -EVENT ONKYDOWN-.
//appellée dans showDatas;
const isOnKeyDown = (e, array) => {
  array = arrayIdMedia;
  const keyCode = e.code;
  if (keyCode === "ArrowRight" && theModalPhoto.ariaModal === "true") {
    if (array === arrayIdIsNotFiltering) {
      console.log("je ne suis pas filtré :" + " " + "> next");
      isChangingMediaNext(array);
    }
    if (array === arrayIdIsFiltering) {
      console.log("je suis filtré :" + " " + "> next");
      isChangingMediaNext(array);
    }
  }
  if (keyCode === "ArrowLeft" && theModalPhoto.ariaModal === "true") {
    if (array === arrayIdIsNotFiltering) {
      console.log("je ne suis pas filtré :" + " " + "< previous");
      isChangingMediaPrevious(array);
    }
    if (array === arrayIdIsFiltering) {
      console.log("je suis filtré :" + " " + "< previous");
      isChangingMediaPrevious(array);
    }
  }
};
//FONCTION QUI FERME LA MODALE PHOTO;
//appellée dans ???;
const isClosingModalPhoto = () => {
  const theCrossBtn = document.querySelector(
    ".modalPhotographies__content__body__BlockIconeX__iconeX"
  );
  theCrossBtn.addEventListener("click", () => {
    theModalPhoto.style.display = "none";
    selectBtn.focus();
    if (theModalPhoto.style.display === "none") {
      theModalPhoto.ariaModal = "false";
    }
    //On remet à jour le searchParams de l'URL;
    //_______________
    urlObject = new URL(window.location);
    urlObject.searchParams.delete("id_media");
    window.history.pushState({}, "", urlObject);
  });
};
//______________________________________________________
//______________________________________________________
//______________________________________________________
//I).RECUPERER LES DONNEES;
//API REQUEST
const fetchDatas = async () => {
  datas = await fetch("./data/photographes.json")
    .then((response) => {
      return response.json();
    })
    .then((body) => {
      return body;
    });
};
//II).FONCTION QUI INJECTE LES DONNEES EN FONCTION DE L'ID DU PHOTOGRAPHE;
//Show DATAS
const showDatas = async () => {
  await fetchDatas();
  isLaunchingTheOpenModalEvent(); //FORM MODAL
  isLaunchingTheCloseModalEvent(); //FORM MODAL
  // console.log(datas);
  const url = window.location.href;
  let url_idString = url.split("=")[1]; //par ex: 123; typeof ="string";
  const url_IdNmb = parseInt(url_idString); // notre id devient un typeof = number;
  let arrayOfTotalLikes = [];
  const txtContent = document.querySelector(".blockIntro--pages"); //le header qui va contenir les données du photographe;
  const btnAndPhotoContent = document.querySelector(".blockIntro__link--page");
  const priceData = document.querySelector(".blockPrice__thePrice");
  blockOfTotalLikes = document.querySelector(".blockPrice__nbsOfLikes");
  //______________________________________________________________________________
  //On veut chercher dans le tableau des données le même id que celui de l'url;
  //On va comme cela récupérer automatiquement "Le" photographe en question et ses données;
  photographe = datas.photographers.find((item) => {
    return item.id === url_IdNmb;
  });
  // console.log(photographe);
  //Maintenant on inject les données;
  //_________________________________
  //HEADER-Le block txt avec les infos photographes;
  txtContent.innerHTML = `<h1 class="blockIntro__titlePages">${
    photographe.name
  }</h1>
  <p class="blockIntro__blocktxt">
    <strong class="blockIntro__blocktxt1p">${photographe.city}, ${
    photographe.country
  }</strong>
    <span class="blockIntro__blocktxt2p"
      >${photographe.tagline}</span
    >
  </p>
  <ul class="blockIntro__ul blockIntro__ul--page">
    ${photographe.tags
      .map(
        (tag) => `<li class="blockIntro__ul__linksTags">
      <span 
       class="tagName tagName--change" 
       data-value="${tag}"
       tabindex="0"
      >
        #${tag}
        <span class="tagName__bgd"></span>
      </span>
    </li>`
      )
      .join("")}
  </ul>`;
  //_________________________________
  //HEADER-Le block btn="contactez-moi" et la photo;
  btnAndPhotoContent.innerHTML = `<span
  class="blockIntro__link__blockImg blockIntro__link__blockImg--change"
>
  <img class="blockIntro__link__blockImg__img" src="./img/Photographers_ID_Photos/${photographe.portrait}" alt="${photographe.alt}" />
</span>`;
  //-------------------------------
  isChangingValueInsideFormModal();
  //-------------------------------
  //_________________________________
  //Le block en bas de page, qui contient le prix;
  priceData.innerHTML = `<span class="blockPrice__thePrice__data">${photographe.price}€/jour</span>`;
  //____________________________________
  //RECUPERER LES MEDIAS DU PHOTOGRAPHE;
  mediasIsMatchingWithId = datas.media.filter((item) => {
    const photosMatchWithId = item.photographerId === url_IdNmb;
    return photosMatchWithId === true;
  });
  //On ajoute une nouvelle paire de clef/valeur pour savoir si le média à déjà été liké;
  mediasIsMatchingWithId.forEach((media) => {
    Object.assign(media, { moreLike: "no" });
  });

  //ON TRIE LES DONNEES RECUPEREES PAR POPULARITE
  let theMostPopular = mediasIsMatchingWithId.sort((data1, data2) => {
    return data2.likes - data1.likes;
  });
  //_____________________________________________________________
  // INJECTER LES IMAGES + VIDEOS DANS LA PAGE DYNAMIQUEMENT;
  isChoosingBlocksVideosOrPhotosToInjectMedias(theMostPopular, photographe);
  // ___________________________________________
  // ADDITIONNER LE TOTAL DE LIKES et INJECTER LA DONNEE;
  mediasIsMatchingWithId.forEach((media) => {
    const nbsOflikes = Object.values(media);
    const likesInArray = [nbsOflikes[5]]; //output :[52]; pour chaque likes de chaque medias;
    arrayOfTotalLikes.push(...likesInArray); //output :[1,2,3,36,12,36]par ex; tout est regroupé dans 1 seul tableau;
    return arrayOfTotalLikes;
  });
  const reducer = (accumulator, currentValue) => {
    return accumulator + currentValue;
  };
  let TotalDataOfLikes = arrayOfTotalLikes.reduce(reducer);
  blockOfTotalLikes.innerHTML = `${TotalDataOfLikes}
      <img
        class="blockPrice____nbsOfLikes__heartIcone"
        src="./img/heart__black.png"
        alt="j'aime"
    />`;
  //On appel les éléments du DOM qui viennent d'être injectés dynamiquement;
  likesBtnPerBlocks = document.querySelectorAll(".heart");
  blockOfTotalLikes = document.querySelector(".blockPrice__nbsOfLikes");

  //on appel la fonction qui vient ajouter ou retirer un like pour le média;
  onClickAddOrRemoveLikes(likesBtnPerBlocks);
  //_____________________________________________________________
  //IF IS FILTERING
  showDatasFiltering();
  //_____________________________________________________________
  //LA MODALE PHOTO
  //----------------
  //On peut accéder à la modal photo's view;
  blocksContentModalLink = document.querySelectorAll(
    ".blockPhoto__content__linkImg"
  );
  //-----
  isfocusingElementToOpeningModalPhoto(blocksContentModalLink);
  //-----
  //Recupération des ids, des medias actuelle, dans un array;
  arrayIdIsNotFiltering = mediasIsMatchingWithId.map((media) => media.id);
  arrayIdMedia = arrayIdIsNotFiltering;
  console.log("arrayIdMedia NOT filtering");
  console.log(arrayIdMedia);

  //1.event onclick
  //--------
  //BTN NEXT
  //--------
  let btnNextImg = document.querySelector("#nextBtn");
  //---
  btnNextImg.parentNode.replaceChild(btnNextImg.cloneNode(true), btnNextImg);
  btnNextImg = document.querySelector("#nextBtn");
  //---
  btnNextImg.addEventListener("click", isOnClickToPassNextImg);

  //-------------
  //BTN PREVIOUS
  //-------------
  let btnPreviousImg = document.querySelector("#previousBtn");
  //---
  btnPreviousImg.parentNode.replaceChild(
    btnPreviousImg.cloneNode(true),
    btnPreviousImg
  );
  btnPreviousImg = document.querySelector("#previousBtn");
  btnPreviousImg.addEventListener("click", isOnClickToPassPreviousImg);
  // ________________________________________________________________

  //2.event onkeydown
  window.addEventListener("keydown", isOnKeyDown);
};
//_________________________________________________________________
// III).Dès le chargement du contenu HTML ont appel "La dernière fonction qui appelerai toute les autres".
//______________________________
window.addEventListener("load", () => {
  showDatas(); //await fetchDatas();
});
