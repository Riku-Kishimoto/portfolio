// const btn = document.querySelector(".toc-btn");
// const toc = document.querySelector(".toc");
// const overlay = document.querySelector(".toc-overlay");

// btn.addEventListener("click", () => {
//     btn.classList.toggle("active");
//     toc.classList.toggle("active");
//     overlay.classList.toggle("active");
// });

// overlay.addEventListener("click", () => {
//     btn.classList.remove("active");
//     toc.classList.remove("active");
//     overlay.classList.remove("active");
// });

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