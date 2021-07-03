//______________________________
//Declarations des variables;
let datas; //variables qui va récupérer les données;
let url;
let MediasIsMatchingWithId; //Les Médias correspondants à l'Id du photographes;
let photographe; //renferme les données du photographes;
let blocksContentModalLink;
let likesBtnPerBlocks; //les btns qui servent à liker les médias; DOM ELEMENTS
let blockOfTotalLikes; //Le block fixe qui indique le total de likes -en bas à droite-; DOM ELEMENTS
let theRightMedia; // Le media correspondant à la modal lors de sa visualisation;
let theModalPhoto = document.querySelector(".modalPhotographies--change");
const ulContentForPhotos = document.querySelector("#photosBody");
const selectBtn = document.querySelector("#sort-select");
const figureContent = document.querySelector(
  ".modalPhotographies__content__body__blockPhoto"
);
//_________________________________________________________________________
//FONCTION QUI RECUPERE LES BONS ELEMENTS DU DOM POUR LES LIKER LORS DU CLICK;
//appelée dans showDatas(); et isFlitering();
const onClickAddOrRemoveLikes = (elements) => {
  elements.forEach((elt) => {
    let isAlreadyAdd = false;

    elt.addEventListener("click", () => {
      let arrayOfTotalLikes = [];
      let storeNumberOfLikes;
      const idDataTypeOfString = elt.parentElement.dataset.value; //La valeur est une string;
      const idDataTypeOfNumb = parseInt(idDataTypeOfString); //elle devient un type number;
      let idMediaDatas = MediasIsMatchingWithId.filter((item) => {
        return item.id === idDataTypeOfNumb;
      });
      storeNumberOfLikes = idMediaDatas[0].likes; //output le nbs de likes actuel
      if (isAlreadyAdd === false) {
        storeNumberOfLikes++;

        idMediaDatas[0].likes = storeNumberOfLikes;
        idMediaDatas = MediasIsMatchingWithId.filter((item) => {
          return item.id === idDataTypeOfNumb;
        });
        elt.innerHTML = `<span aria-label="nombre de j'aime" class="heart__nbs">${idMediaDatas[0].likes}</span>
          <span class="heart__img"
          ><img src="./img/Vector.png" alt="J'aime"
          /></span>`;
        isAlreadyAdd = true;
      } else if (isAlreadyAdd === true) {
        storeNumberOfLikes--;

        idMediaDatas[0].likes = storeNumberOfLikes;
        idMediaDatas = MediasIsMatchingWithId.filter((item) => {
          return item.id === idDataTypeOfNumb;
        });
        elt.innerHTML = `<span aria-label="nombre de j'aime" class="heart__nbs">${idMediaDatas[0].likes}</span>
          <span class="heart__img"
          ><img src="./img/Vector.png" alt="J'aime"
          /></span>`;
        isAlreadyAdd = false;
      }
      // ___________________________________________
      // ADDITIONNER LE TOTAL DE LIKES DYNAMIQUEMENT
      MediasIsMatchingWithId.forEach((media) => {
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
//appelée dans showDatas(); et isFlitering();
const isChoosingBlocksVideosOrPhotosToInjectMedias = (array) => {
  ulContentForPhotos.innerHTML = array
    .map((media) => {
      const mediaInArray = Object.values(media);
      const isVideo = mediaInArray[3].endsWith(".mp4");
      if (isVideo === true) {
        return `<li class="block__bodyPhotos__li ">
       <!-- ___________________________________________ -->
       <!--BlockVideo-valide- 03-->
        <figure class="blockPhoto__content" data-value="${media.id}">
         <button class="blockPhoto__content__linkImg">
           <div
             class="
               blockPhoto__content__linkImg__blockImg
             "
           >
             <video
               controls
               src="./img/${photographe.name}/${media.video}"
               class="blockPhoto__content__linkImg__blockImg__video"
             ></video>
           </div>
         </button>
          <figcaption data-value="${media.id}" class="blockPhoto__content__legend">
           <span class="blockPhoto__content__legend__photoName">${media.title}</span>
             <button class="heart">
              <span aria-label="nombre de j'aime" class="heart__nbs">${media.likes}</span>
             <span class="heart__img"
               ><img src="./img/Vector.png" alt="J'aime"
             /></span>
           </button>
         </figcaption>
       </figure>
       <!-- ___________________________________________ -->
     </li>`;
      }
      return `<li class="block__bodyPhotos__li">
        <!-- ___________________________________________ -->
        <!--BlockPhotos 01-->
        <figure class="blockPhoto__content" data-value="${media.id}">
          <button class="blockPhoto__content__linkImg">
            <div class="blockPhoto__content__linkImg__blockImg">
              <img
                class="blockPhoto__content__linkImg__blockImg__img"
                src="./img/${photographe.name}/${media.image}"
                alt="${media.title} by ${photographe.name}"
              />
            </div>
          </button>
          <figcaption data-value="${media.id}" class="blockPhoto__content__legend">
            <span class="blockPhoto__content__legend__photoName">${media.title}</span>
            <button class="heart">
              <span aria-label="nombre de j'aime" class="heart__nbs">${media.likes}</span>
              <span class="heart__img"
                ><img src="./img/Vector.png" alt="J'aime"
              /></span>
            </button>
          </figcaption>
        </figure>
        <!-- ___________________________________________ -->
      </li>`;
    })
    .join("");
};
//FONCTIONS POUR FERMER ET OUVRIR LA MODAL AVEC LE FORMULAIRE;
//toute deux appellées dans isLaunchingTheOpenModalEvent(); et isLaunchingTheCloseModalEvent();
const isOpeningTheModal = async () => {
  await fetchDatas();
  const bgdModal = document.querySelector(".modal");
  const photographName = document.querySelector(
    ".modalContent__body__blockTitle__Title"
  );
  const url = window.location.href;
  let url_idString = url.split("=")[1]; //par ex: 123; typeof ="string";
  const url_IdNmb = parseInt(url_idString); // notre id devient un typeof = number;
  const photographe = datas.photographers.find((item) => {
    return item.id === url_IdNmb;
  });
  bgdModal.style.display = "block";
  photographName.dataset.photographer = `${photographe.name}`;
};
const isClosingTheModal = () => {
  const bgdModal = document.querySelector(".modal");
  bgdModal.style.display = "none";
};
//Lancement de l'ouverture et fermeture de la modal
//Toute deux sont appelées dans ShowDatas();
const isLaunchingTheOpenModalEvent = () => {
  const btnOpenModal = document.querySelector("#openModal");
  btnOpenModal.addEventListener("click", isOpeningTheModal);
};
const isLaunchingTheCloseModalEvent = () => {
  const btnCloseModal = document.querySelector(".iconeX");
  btnCloseModal.addEventListener("click", isClosingTheModal);
};
//FONCTION POUR OUVRIR LA MODALE PHOTO
//appelée dans la fonction isfocusingElementsToOpenModalPhoto();
const isOpeningTheModalPhoto = () => {
  theModalPhoto;
  theModalPhoto.style.display = "block";
};
//FOCNTION POUR FERMER LA MODALE PHOTO
const isClosingTheModalPhoto = () => {
  theModalPhoto;
  theModalPhoto.style.display = "none";
};
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
          src="./img/${photographe.name}/${theRightMedia.video}"
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
           src="./img/${photographe.name}/${theRightMedia.image}"
           alt="${theRightMedia.image} by ${photographe.name}"
         />
        </div>

        <figcaption class="modalPhotographies__content__body__legend">
          <span id="modalLegend">${theRightMedia.title}</span>
        </figcaption>
      
`);
};
//FONCTION QUI RECUPERE LES BTNS QUI VONT PERMETTRE L'OUVERTURE DE LA MODALE;
//appelée dans showDatas();
const isfocusingElementToOpeningAndClosingModalPhoto = (elements) => {
  elements.forEach((elt) => {
    elt.addEventListener("click", () => {
      isOpeningTheModalPhoto();
      console.log(elt.parentElement.dataset.value);
      const idMedia_TypeOfString = elt.parentElement.dataset.value;
      const idMedia_TypeOfNumber = parseInt(idMedia_TypeOfString);
      //________________________________
      // on met à jour le searchParams de l'URL:
      url = new URL(window.location);
      url.searchParams.set("id_media", `${idMedia_TypeOfNumber}`);
      window.history.pushState({}, "", url);
      //________________________________
      theRightMedia = MediasIsMatchingWithId.find((media) => {
        return media.id === idMedia_TypeOfNumber;
      });
      isAddingVideoOrPhotoContentIntoTheModal();
    });
  });
  const theCrossBtn = document.querySelector(
    ".modalPhotographies__content__body__BlockIconeX__iconeX"
  );
  theCrossBtn.addEventListener("click", () => {
    isClosingTheModalPhoto();
    //On remet à jour le searchParams de l'URL;
    //_______________
    url = new URL(window.location);
    url.searchParams.delete("id_media");
    window.history.pushState({}, "", url);
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
//II).FONCTION QUI FILTRE LES MEDIAS PAR POPULARITE/DATE/TITRE;
//Fonction appelée dans showDatas();
const isFlitering = () => {
  //____________________________________________
  selectBtn.addEventListener("change", (e) => {
    const value = e.target.value;
    let newArray;
    console.log(value);
    if (value === "date") {
      newArray = MediasIsMatchingWithId.sort((data1, data2) => {
        return data1.date.localeCompare(data2.date);
      });
      console.log(newArray);
      //On inject les nouveaux médias triés;
      isChoosingBlocksVideosOrPhotosToInjectMedias(newArray);
      //On appel les nouveaux éléments du DOM
      likesBtnPerBlocks = document.querySelectorAll(".heart");
      blockOfTotalLikes = document.querySelector(".blockPrice__nbsOfLikes");
      //On applique la fonction qui "onclick" ajoute ou retire les likes;
      onClickAddOrRemoveLikes(likesBtnPerBlocks);
      blocksContentModalLink = document.querySelectorAll(
        ".blockPhoto__content__linkImg"
      );
      isfocusingElementToOpeningAndClosingModalPhoto(blocksContentModalLink);
    }
    if (value === "titre") {
      newArray = MediasIsMatchingWithId.sort((data1, data2) => {
        return data1.title.localeCompare(data2.title);
      });
      isChoosingBlocksVideosOrPhotosToInjectMedias(newArray);
      likesBtnPerBlocks = document.querySelectorAll(".heart");
      blockOfTotalLikes = document.querySelector(".blockPrice__nbsOfLikes");
      onClickAddOrRemoveLikes(likesBtnPerBlocks);
      blocksContentModalLink = document.querySelectorAll(
        ".blockPhoto__content__linkImg"
      );
      isfocusingElementToOpeningAndClosingModalPhoto(blocksContentModalLink);
    }
    if (value === "popularite") {
      newArray = MediasIsMatchingWithId.sort((data1, data2) => {
        return data2.likes - data1.likes;
      });
      isChoosingBlocksVideosOrPhotosToInjectMedias(newArray);
      likesBtnPerBlocks = document.querySelectorAll(".heart");
      blockOfTotalLikes = document.querySelector(".blockPrice__nbsOfLikes");
      onClickAddOrRemoveLikes(likesBtnPerBlocks);
      blocksContentModalLink = document.querySelectorAll(
        ".blockPhoto__content__linkImg"
      );
      isfocusingElementToOpeningAndClosingModalPhoto(blocksContentModalLink);
    }
  });
};
//III).FONCTION QUI INJECTE LES DONNEES EN FONCTION DE L'ID DU PHOTOGRAPHE;
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
      <a 
       href="#" 
       class="tagName tagName--change" 
       data-value="${tag}"
      >
        #${tag}
        <span class="tagName__bgd"></span>
      </a>
    </li>`
      )
      .join("")}
  </ul>`;
  //_________________________________
  //HEADER-Le block btn et photo;
  btnAndPhotoContent.innerHTML = `<span
  class="blockIntro__link__blockImg"
>
  <img class="blockIntro__link__blockImg__img" src="./img/Photographers ID Photos/${photographe.portrait}" alt="${photographe.alt}" />
</span>`;
  //_________________________________
  //Le block en bas de page, qui contient le prix;
  priceData.innerHTML = `<span class="blockPrice__thePrice__data">${photographe.price}€/jour</span>`;
  //____________________________________
  //RECUPERER LES MEDIAS DU PHOTOGRAPHE;
  MediasIsMatchingWithId = datas.media.filter((item) => {
    const photosMatchWithId = item.photographerId === url_IdNmb;
    return photosMatchWithId === true;
  });
  //ON TRIE LES DONNEES RECUPEREES PAR POPULARITE
  let theMostPopular = MediasIsMatchingWithId.sort((data1, data2) => {
    return data2.likes - data1.likes;
  });
  //_____________________________________________________________
  // INJECTER LES IMAGES + VIDEOS DANS LA PAGE DYNAMIQUEMENT;
  isChoosingBlocksVideosOrPhotosToInjectMedias(theMostPopular);
  // ___________________________________________
  // ADDITIONNER LE TOTAL DE LIKES et INJECTER LA DONNEE;
  MediasIsMatchingWithId.forEach((media) => {
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
  //On appel les éléments du DOM qui viennent d'être injectés dynamiquement;
  likesBtnPerBlocks = document.querySelectorAll(".heart");
  blockOfTotalLikes = document.querySelector(".blockPrice__nbsOfLikes");
  //on appel la fonction qui vient ajouter ou retirer un like pour le média;
  onClickAddOrRemoveLikes(likesBtnPerBlocks);
  //On peut accéder à la modal photo's view;
  blocksContentModalLink = document.querySelectorAll(
    ".blockPhoto__content__linkImg"
  );
  isfocusingElementToOpeningAndClosingModalPhoto(blocksContentModalLink);
  //Les médias peuvent être triés;
  isFlitering();
};
//_________________________________________________________________
// IV).Dès le chargement du contenu HTML ont appel "La dernière fonction qui appelerai toute les autres".
//______________________________
window.addEventListener("load", () => {
  showDatas();
});
