window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

const doorLink = document.querySelector('.door-link');
if (doorLink) {
    doorLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'store.html';
    });
    setTimeout(() => {
        doorLink.style.pointerEvents = 'auto';
    }, 3000);
}

const buttons = document.querySelectorAll('.painting-switch button');
const paintings = document.querySelectorAll('.painting');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;

        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        paintings.forEach(painting => {
            if (painting.dataset.type === filter) {
                painting.classList.remove('hidden');
            } else {
                painting.classList.add('hidden');
            }
        });
    });
});

(function initImageSlider() {
    const container = document.querySelector('.carousel-track');
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');
    if (!container) return; // nothing to do on pages without the slider

    let index = 0;

    function updateSlide() {
        const firstImg = container.querySelector('img');
        if (!firstImg) return;
        const gap = parseFloat(getComputedStyle(container).gap) || 0;
        const imageWidth = firstImg.clientWidth + gap; // width in pixels including gap
        container.style.transform = `translateX(${-imageWidth * index}px)`;
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            index++;
            const total = container.querySelectorAll('img').length;
            const firstImgLocal = container.querySelector('img');
            const gap = parseFloat(getComputedStyle(container).gap) || 0;
            const imgW = firstImgLocal ? (firstImgLocal.clientWidth + gap) : 1;
            const visibleImages = firstImgLocal ? Math.floor(container.clientWidth / imgW) : 1;
            if (index > total - visibleImages) index = 0;
            updateSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            index--;
            const total = container.querySelectorAll('img').length;
            const firstImgLocal = container.querySelector('img');
            const gap = parseFloat(getComputedStyle(container).gap) || 0;
            const imgW = firstImgLocal ? (firstImgLocal.clientWidth + gap) : 1;
            const visibleImages = firstImgLocal ? Math.floor(container.clientWidth / imgW) : 1;
            if (index < 0) index = total - visibleImages;
            updateSlide();
        });
    }

    window.addEventListener('resize', updateSlide); // handle responsiveness
    // initial layout
    updateSlide();
})();

const modal = document.getElementById('inquiryModal');
const modalImg = document.getElementById('modalImg');
const closeBtn = document.querySelector('.modal-close');
const overlay = document.querySelector('.modal-overlay');
// painting elements
const painting = document.querySelectorAll('.painting');
const paintingButtons = document.querySelectorAll('.paintingBtn')
//open modal function
function openModal(imageSrc) {
    modalImg.src = imageSrc;
    modal.classList.remove('hidden')
    //prevents scrolling behind modal
    document.body.style.overflow = 'hidden';
}
function closeModal() {
    modal.classList.add('hidden');
    modalImg.src = '';
    document.body.style.overflow = '';
}
//inquire button click
paintingButtons.forEach(Btn => {
    Btn.addEventListener('click', e => {
        e.stopPropagation(); //stops bubbling to card

        const card = Btn.closest('.painting');
        openModal(card.dataset.image)
    })
})
// allow clicking the whole painting card to open the modal
if (painting && painting.length) {
    painting.forEach(card => {
        card.addEventListener('click', () => {
            const imgSrc = card.dataset.image;
            if (imgSrc) openModal(imgSrc);
        });
    });
}
//close modal
closeBtn.addEventListener('click', closeModal);
// prevent clicks inside the modal content from closing the modal
const modalContent = document.querySelector('.modal-content');
if (modalContent) {
    modalContent.addEventListener('click', function(e){
        e.stopPropagation();
    });
}
overlay.addEventListener('click', closeModal);



const OpenPaintingsBtn = document.getElementById('openPaintings');
const Modal = document.getElementById('imageModal');
const ModalClose = document.querySelector('.image-modal-close');

if (OpenPaintingsBtn && Modal) {
    OpenPaintingsBtn.addEventListener('click', ()=>{
        Modal.style.display = 'flex';
    })
    ModalClose.addEventListener('click', ()=>{
        Modal.style.display = 'none';
    })
    Modal.addEventListener('click', (e)=> {
        if ( e.target.classList.contains('image-modal-overlay')){
            Modal.style.display = 'none'
        }
    });
}