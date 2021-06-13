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

const imageData = document.querySelectorAll('.gallery__image');

const onGalleryClick = (e) => {
  e.preventDefault();
  const imageSource = e.target.dataset.source;
  const imageIndex = e.target.dataset.indexNumber;
  const imageAlt = e.target.alt;
  refs.lightBox.classList.toggle('is-open');

  modalPicture.src = imageSource;
  modalPicture.alt = imageAlt;

  const onKeyPress = (e) => {
    if (e.key !== "Escape" && e.key !== "ArrowRight" && e.key !== "ArrowLeft") {
      return;
    };
    if (e.key === "Escape") {
      modalClose();
    }
 
    if (e.key === "ArrowRight") {
    }
  };
  window.addEventListener('keydown', onKeyPress);
};

refs.gallery.addEventListener('click', onGalleryClick);

const modalClose = (e) => {
  refs.lightBox.classList.remove('is-open');
  refs.overlay.addEventListener('click', modalClose, { once: true });
  

  modalPicture.src = '';
  modalPicture.alt = '';
};

refs.closeLightboxBtn.addEventListener('click', modalClose);



