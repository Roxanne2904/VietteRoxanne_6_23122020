//______________________________
//Declarations des variables;
let datas; //variables qui va récupérer les données;
let MediasIsMatchingWithId; //Les Médias correspondants à l'Id du photographes;
let photographe; //renferme les données du photographes;
let likesBtnPerBlocks; //les btns qui servent à liker les médias; DOM ELEMENTS
let blockOfTotalLikes; //Le block fixe qui indique le total de likes -en bas à droite-; DOM ELEMENTS
const ulContentForPhotos = document.querySelector("#photosBody");
const selectBtn = document.querySelector("#sort-select");
//_________________________________________________________________________
//FONCTION QUI RECUPERE LES BONS ELEMENTS DU DOM POUR LES LIKER LORS DU CLICK;
const isTakingTheRightElementsForUpdatingLikesOnClick = (elements) => {
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
//_________________________
//FONCTION QUI VIENT TRIER SI BLOCK VIDEO OU PHOTO;
const isSortingVideosAndPhotosBlocks = (array) => {
  ulContentForPhotos.innerHTML = array
    .map((media) => {
      const mediaInArray = Object.values(media);
      const isVideo = mediaInArray[3].endsWith(".mp4");
      if (isVideo === true) {
        return `<li class="block__bodyPhotos__li ">
       <!-- ___________________________________________ -->
       <!--BlockVideo-valide- 03-->
        <figure class="blockPhoto__content ">
         <a class="blockPhoto__content__linkImg" href="#">
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
         </a>
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
        <figure class="blockPhoto__content">
          <a class="blockPhoto__content__linkImg" href="#">
            <div class="blockPhoto__content__linkImg__blockImg">
              <img
                class="blockPhoto__content__linkImg__blockImg__img"
                src="./img/${photographe.name}/${media.image}"
                alt="${media.title} by ${photographe.name}"
              />
            </div>
          </a>
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
//______________________________
//?).FONCTIONS POUR FERMER ET OUVRIR LA MODAL QUI VISUALISE LES PHOTOS.
//Ouvrir et fermer la modal pour visualiser les photos;
//ouvrir;
// const isOpeningTheModalPhoto = () => {
//   const btnOpenModalPhoto = document.querySelectorAll(
//     ".blockPhoto__content__linkImg"
//   );
//   btnOpenModalPhoto.forEach((photo) => {
//     photo.addEventListener("click", () => {
//       const bgdModalPhoto = document.querySelector(".modalPhotographies");
//       bgdModalPhoto.style.display = "block";
//     });
//   });
// };
// //______________________________
// //Fermer;
// const isClosingTheModalPhoto = () => {
//   const btnCloseModalPhoto = document.querySelector(
//     ".modalPhotographies__content__body__iconeX"
//   );
//   btnCloseModalPhoto.addEventListener("click", () => {
//     const bgdModalPhoto = document.querySelector(".modalPhotographies");
//     bgdModalPhoto.style.display = "none";
//   });
// };
//_________________________________________________________________________
//II).FONCTION QUI "ONCLICK" INCREMENTE LE NOMBRE DE LIKES/MEDIA ET AFFICHE LE TOTAL;
//Fonction appellée dans ShowDatas();
const onClickUpdatingLikes = () => {
  likesBtnPerBlocks = document.querySelectorAll(".heart");
  blockOfTotalLikes = document.querySelector(".blockPrice__nbsOfLikes");
  isTakingTheRightElementsForUpdatingLikesOnClick(likesBtnPerBlocks);
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
  // console.log(datas.media);
  //____________________________________
  //RECUPERER LES MEDIAS DU PHOTOGRAPHE;
  MediasIsMatchingWithId = datas.media.filter((item) => {
    const photosMatchWithId = item.photographerId === url_IdNmb;
    return photosMatchWithId === true;
  });
  //ON TRIE LES DONNEES RECUPEREES PAR POPULARITE
  let theMostPopular = MediasIsMatchingWithId.sort((data1, data2) => {
    return data1.likes - data2.likes;
  });
  //_____________________________________________________________
  // INJECTER LES IMAGES + VIDEOS DANS LA PAGE DYNAMIQUEMENT;
  isSortingVideosAndPhotosBlocks(theMostPopular);
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
  onClickUpdatingLikes();
};
//IV).FONCTION QUI FILTRE LES MEDIAS PAR POPULARITE/DATE/TITRE;
//IsFlitering();
const isFlitering = async () => {
  await showDatas();
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
      isSortingVideosAndPhotosBlocks(newArray);
      //On appel les nouveaux éléments du DOM
      likesBtnPerBlocks = document.querySelectorAll(".heart");
      blockOfTotalLikes = document.querySelector(".blockPrice__nbsOfLikes");
      //On applique la fonction qui "onclick" ajoute ou retire les likes;
      isTakingTheRightElementsForUpdatingLikesOnClick(likesBtnPerBlocks);
    }
    if (value === "titre") {
      newArray = MediasIsMatchingWithId.sort((data1, data2) => {
        return data1.title.localeCompare(data2.title);
      });
      isSortingVideosAndPhotosBlocks(newArray);
      likesBtnPerBlocks = document.querySelectorAll(".heart");
      blockOfTotalLikes = document.querySelector(".blockPrice__nbsOfLikes");
      isTakingTheRightElementsForUpdatingLikesOnClick(likesBtnPerBlocks);
    }
    if (value === "popularite") {
      newArray = MediasIsMatchingWithId.sort((data1, data2) => {
        return data1.likes - data2.likes;
      });
      isSortingVideosAndPhotosBlocks(newArray);
      likesBtnPerBlocks = document.querySelectorAll(".heart");
      blockOfTotalLikes = document.querySelector(".blockPrice__nbsOfLikes");
      isTakingTheRightElementsForUpdatingLikesOnClick(likesBtnPerBlocks);
    }
  });
};

const getDynamiqueContent = async () => {
  await isFlitering();
};
//_________________________________________________________________
// VI).Dès le chargement du contenu HTML ont appel "La dernière fonction qui appelerai toute les autres".
//______________________________
window.addEventListener("load", () => {
  getDynamiqueContent();
});
