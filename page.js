//______________________________
//I).Récupérer les données;
let datas; //variables qui va récupérer les données;
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
//II).FONCTIONS POUR FERMER ET OUVRIR LA MODAL AVEC LE FORMULAIRE.
//Ouvrir et fermer la modal FORM;
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
const isLaunchingTheOpenModalEvent = () => {
  const btnOpenModal = document.querySelector("#openModal");
  btnOpenModal.addEventListener("click", isOpeningTheModal);
};
const isLaunchingTheCloseModalEvent = () => {
  const btnCloseModal = document.querySelector(".iconeX");
  btnCloseModal.addEventListener("click", isClosingTheModal);
};
//______________________________
//III).FONCTIONS POUR FERMER ET OUVRIR LA MODAL POUR VISUALISER LES PHOTOS.
//Ouvrir et fermer la modal pour visualiser les photos;
//ouvrir;
const isOpeningTheModalPhoto = () => {
  const btnOpenModalPhoto = document.querySelectorAll(
    ".blockPhoto__content__linkImg"
  );
  btnOpenModalPhoto.forEach((photo) => {
    photo.addEventListener("click", () => {
      const bgdModalPhoto = document.querySelector(".modalPhotographies");
      bgdModalPhoto.style.display = "block";
    });
  });
};
//______________________________
//Fermer;
const isClosingTheModalPhoto = () => {
  const btnCloseModalPhoto = document.querySelector(
    ".modalPhotographies__content__body__iconeX"
  );
  btnCloseModalPhoto.addEventListener("click", () => {
    const bgdModalPhoto = document.querySelector(".modalPhotographies");
    bgdModalPhoto.style.display = "none";
  });
};
//IV).FONCTIONS QUI MONTRE LES DONNEES EN FONCTION DE L'ID.
//___________
//Show DATAS
const showDatas = async () => {
  await fetchDatas();
  isLaunchingTheOpenModalEvent();
  isLaunchingTheCloseModalEvent();
  isOpeningTheModalPhoto();
  isClosingTheModalPhoto();
  console.log(datas);
  const url = window.location.href;
  let url_idString = url.split("=")[1]; //par ex: 123; typeof ="string";
  const url_IdNmb = parseInt(url_idString); // notre id devient un typeof = number;
  const txtContent = document.querySelector(".blockIntro--pages"); //le header qui va contenir les données du photographe;
  const btnAndPhotoContent = document.querySelector(".blockIntro__link--page");
  const priceData = document.querySelector(".blockPrice__thePrice");
  const ulContentForPhotos = document.querySelector("#photosBody");
  //______________________________________________________________________________
  //On veut chercher dans le tableau des données le même id que celui de l'url;
  //On va comme cela récupérer automatiquement "Le" photographe en question et ses données;
  const photographe = datas.photographers.find((item) => {
    return item.id === url_IdNmb;
  });
  console.log(photographe);
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
</span>
</div>`;
  //_________________________________
  //Le block qui contient le prix;
  priceData.innerHTML = `<span class="blockPrice__thePrice__data">${photographe.price}€/jour</span>`;
  console.log(datas.media);
  //RECUPERER LES MEDIAS DU PHOTOGRAPHE;
  //____________________________________
  const filterMediasMatchingwithId = datas.media.filter((item) => {
    const photosMatchWithId = item.photographerId === url_IdNmb;
    return photosMatchWithId === true;
  });
  //RECUPERER LES IMAGES DU PHOTOGRAPHE;
  //____________________________________
  const imgMedias = filterMediasMatchingwithId.filter((img) => {
    return img.image;
  });
  //INJECTER LES IMAGES DANS LA PAGE DYNAMIQUEMENT;
  //____________________________________
  ulContentForPhotos.innerHTML = imgMedias
    .map(
      (media) => `<li class="block__bodyPhotos__li">
    <!-- ___________________________________________ -->
    <!--BlockPhotos 01-->
    <figure class="blockPhoto__content">
      <a class="blockPhoto__content__linkImg" href="#">
        <div class="blockPhoto__content__linkImg__blockImg">
          <img
            class="blockPhoto__content__linkImg__blockImg__img"
            src="./img/${photographe.name}/${media.image}"
            alt=""
          />
        </div>
      </a>
      <figcaption class="blockPhoto__content__legend">
        <span>Photo</span>
        <span class="heart">
          <span aria-label="nombre de j'aime" class="heart__nbs">12</span>
          <span class="heart__img"
            ><img src="./img/Vector.png" alt="J'aime"
          /></span>
        </span>
      </figcaption>
    </figure>
    <!-- ___________________________________________ -->
  </li>`
    )
    .join("");
};
//______________________________________________________________
// IV).FONCTIONS QUI APPELLE LA RECUP ET L'INJECTION DES DONNEES.
const getDatas = () => {
  fetchDatas();
  showDatas();
};
//_________________________________________________________________
// V).Dès le chargement du contenu HTML ont appel getDatas().
//______________________________
window.addEventListener("load", () => {
  getDatas();
});
