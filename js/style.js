//footer表示時header非表示
const header = document.querySelector('.header');
const footer = document.querySelector('.footer');

const observer = new IntersectionObserver(([entry]) => {
    header.classList.toggle('header--hidden', entry.isIntersecting);
});

observer.observe(footer);


//ハンバーガーメニュー
const tocBtn = document.querySelector('.toc-btn');
const toc = document.querySelector('.toc');
const overlay = document.querySelector('.toc-overlay');
const closeBtn = document.querySelector('.toc-close');

tocBtn.addEventListener('click', () => {
    toc.classList.add('active');
    overlay.classList.add('active');
});

closeBtn.addEventListener('click', () => {
    toc.classList.remove('active');
    overlay.classList.remove('active');
});

overlay.addEventListener('click', () => {
    toc.classList.remove('active');
    overlay.classList.remove('active');
});
//ハンバーガーメニューここまで