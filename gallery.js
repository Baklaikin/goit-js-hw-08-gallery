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
   return galleryItems.map(({ preview, original, description }) => {
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
      alt="${description}"
    />
  </a>
</li>
`;
    }).join('');   
};

refs.gallery.insertAdjacentHTML('afterbegin', markup);
// const link = document.querySelectorAll('.gallery__link');
// const item = document.querySelector('.gallery__item');

let modalPicture = refs.img;
// let modalPictureLink = refs.link;
const onGalleryClick = (e) => {
  e.preventDefault();
  const imageSource = e.target.dataset.source;
  console.log(e.target);
  const imageAlt = e.target.alt;
  refs.lightBox.classList.toggle('is-open');

  modalPicture.src = imageSource;
  modalPicture.alt = imageAlt;

  return modalPicture;
};

refs.gallery.addEventListener('click', onGalleryClick);

const modalClose = (e) => {
  refs.lightBox.classList.remove('is-open');

  modalPicture.src = '';
  modalPicture.alt = '';
};



const onKeyPress = (e) => {
  if (e.key !== "Escape" && e.key !== "ArrowRight" && e.key !== "ArrowLeft") {
    return;
  }
  const isActive = document.querySelector('.is-open');
  console.log(isActive.children);
  if (e.key === "Escape") {
    refs.lightBox.classList.remove('is-open');
    modalPicture.src = '';
    modalPicture.alt = '';
  }

  if (e.key === "ArrowRight") {
    
  }
}
window.addEventListener('keydown', onKeyPress);

refs.overlay.addEventListener('click', modalClose);
refs.closeLightboxBtn.addEventListener('click', modalClose);