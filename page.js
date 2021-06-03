//Ouvrir la modal//Opening Modal
const isOpeningTheModal = () => {
  const bgdModal = document.querySelector(".modal");
  bgdModal.style.display = "block";
};

const isLaunchingTheOpenModalEvent = () => {
  const openModal = document.querySelector("#openModal");
  openModal.addEventListener("click", isOpeningTheModal);
};
isLaunchingTheOpenModalEvent();
//______________________________
//fermer la modal//Closing Modal
const isClosingTheModal = () => {
  const bgdModal = document.querySelector(".modal");
  bgdModal.style.display = "none";
};
const isLaunchingTheCloseModalEvent = () => {
  const closeModal = document.querySelector(".iconeX");
  closeModal.addEventListener("click", isClosingTheModal);
};
isLaunchingTheCloseModalEvent();
