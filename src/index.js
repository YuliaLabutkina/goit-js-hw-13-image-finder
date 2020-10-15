import './styles.css';
import 'material-design-icons/iconfont/material-icons.css';
import error from './js/plugin-pnotify';
import * as basicLightbox from 'basiclightbox';
import './scss/basicLightbox.scss';
import galleryMarkup from './template/card-img.hbs';
import apiService from './js/apiService';


const inquiryUserRef = document.querySelector('.search-form input');
const galleryImgRef = document.querySelector('.gallery');
const buttonLoadMoreRef = document.querySelector('.button-load-more');
const buttonSearchRef = document.querySelector('.search-form__button');
let page = 1;
let inquiryUser = null;


const createMarkupGallery = ({ hits: images }) => {
    const markupGallery = images.reduce((acc, el) => acc + `<li class="gallery__item">${galleryMarkup(el)}</li>`, '');
    galleryImgRef.insertAdjacentHTML('beforeend', markupGallery);
    console.log('125');
};


const resetMarkup = () => {
    galleryImgRef.innerHTML = '';
};


const makeRequest = async (inquiryUser, page) => {
    const request = await apiService(inquiryUser, page);

    try {
        if(request.hits.length) {
            createMarkupGallery(request);
            window.scrollTo({
                top: document.documentElement.offsetHeight,
                behavior: 'smooth',
            });
            buttonLoadMoreRef.classList.remove('button-is-hidden');
            return;
        };

        if(request.total === 0) {
            new error('Error! No results were found for your request! Try again!');
            return;
        };
    
        new error('No more photos for your request!');
        buttonLoadMoreRef.setAttribute('disabled', '')
        
    } catch(err) {
        new error('Error!' + err);
    };
};


const uploadMorePhotos = () => {
    page += 1;
    makeRequest(inquiryUser, page);
};


const imageSearch = (event) => {
    resetMarkup();
    buttonLoadMoreRef.classList.add('button-is-hidden');
    inquiryUser = event.target.value;
    page = 1;
    buttonSearchRef.removeAttribute('disabled')
};


const startImageSearch = (event) => {
    event.preventDefault();
    buttonLoadMoreRef.removeAttribute('disabled')
    makeRequest(inquiryUser, page);
    buttonSearchRef.setAttribute('disabled', '')
};


const showLargeImage = (event) => {
    const largeURL = event.target.getAttribute('data-action');
    basicLightbox.create(`<img width="1400" height="900" src="${largeURL}">`).show();
};


inquiryUserRef.addEventListener('input', imageSearch);
buttonSearchRef.addEventListener('click', startImageSearch);
buttonLoadMoreRef.addEventListener('click', uploadMorePhotos);
galleryImgRef.addEventListener('click', showLargeImage);