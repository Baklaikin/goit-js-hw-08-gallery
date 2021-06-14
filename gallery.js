import galleryItems from "./gallery-items.js";

const refs = {
  gallery: document.querySelector('.js-gallery'),
  lightBox: document.querySelector('.lightbox'),
  link: document.querySelector('.gallery__link'),
  overlay: document.querySelector('.lightbox__overlay'),
  img: document.querySelector('.lightbox__image'),
  lightboxContent: document.querySelector('.lightbox__content'),
  closeLightboxBtn: document.querySelector('.lightbox__button'),
};
const markup = markupConstructor(galleryItems);


function markupConstructor(galleryItems) {
  return galleryItems.map(({ preview, original, description}, idx) => {
        return `
        <li class="gallery__item">
    <a
    class="gallery__link"
    href="${original}"
    >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      data-index-number="${idx}"
      alt="${description}"
    />
  </a>
</li>
`;
    }).join('');   
};

refs.gallery.insertAdjacentHTML('afterbegin', markup);

let modalPicture = refs.img;

const onGalleryClick = (e) => {
  e.preventDefault();
  let newPicture = modalPicture;
  const imageSource = e.target.dataset.source;
  // const imageIndex = e.target.dataset.indexNumber;
  const dataset = e.target.dataset.indexNumber;
  const imageAlt = e.target.alt;
  refs.lightBox.classList.toggle('is-open');

  newPicture.src = imageSource;
  newPicture.alt = imageAlt;
  newPicture.dataset.indexNumber = dataset;
   refs.overlay.addEventListener('click', modalClose, { once: true });
  // console.log(newPicture);

// Выход с помощью ESC или нажимая на overlay
  const onKeyPress = (e) => {
    if (e.key !== "Escape" && e.key !== "ArrowRight" && e.key !== "ArrowLeft") {
      return;
    };
    if (e.key === "Escape") {
      console.log("escape");
      modalClose();
    };
    
    if (e.key === "ArrowRight") {
      onArrowRightClick();
    };
    if (e.key === "ArrowLeft") {
      onArrowLeftClick();
    };
  };
  window.addEventListener('keydown', onKeyPress);
  // refs.lightBox.addEventListener('keydown', onArrowRightClick);
  // refs.lightBox.addEventListener('keydown', onArrowLeftClick);
  return modalPicture = newPicture;
};

const imageData = document.querySelectorAll('.gallery__image');


refs.gallery.addEventListener('click', onGalleryClick);

const modalClose = (e) => {
  refs.lightBox.classList.remove('is-open');
  
  location.reload();
  

  modalPicture.src = '';
  modalPicture.alt = '';
};
refs.overlay.addEventListener('click', modalClose, { once: true });
refs.closeLightboxBtn.addEventListener('click', modalClose);


function onArrowRightClick() {
  let newPicture = modalPicture;
  console.log(newPicture);
  let number = Number(modalPicture.dataset.indexNumber);
        for (let i = number; i < imageData.length; i++) {
          if (newPicture.dataset.indexNumber === number.toString() && number <imageData.length - 1) {
            number += 1;
            const newImage = imageData[`${number}`];
            console.log(newImage);
            newPicture.src = newImage.dataset.source;
            newPicture.alt = newImage.dataset.alt;
            newPicture.dataset.indexNumber = newImage.dataset.indexNumber;
            return newPicture;
          };
        }
};

function onArrowLeftClick() {
  let newPicture = modalPicture;
  let number = Number(modalPicture.dataset.indexNumber);
        for (let i = number; i < imageData.length; i++) {
          if (newPicture.dataset.indexNumber === number.toString() && number >= 1) {
            number -= 1;
            const newImage = imageData[`${number}`];
            newPicture.src = newImage.dataset.source;
            newPicture.alt = newImage.dataset.alt;
            newPicture.dataset.indexNumber = newImage.dataset.indexNumber;
          };
          return newPicture;
        }
};