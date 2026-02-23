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

document.addEventListener("DOMContentLoaded", function () {
    const filters = document.querySelectorAll("[data-filter]");
    const posts = document.querySelectorAll(".post");

    filters.forEach(filter => {
        filter.addEventListener("click", function (e) {
            e.preventDefault();

            const category = this.dataset.filter;

            // 投稿の表示切り替え
            posts.forEach(post => {
                if (category === "all" || post.dataset.category === category) {
                    post.style.display = "block";
                } else {
                    post.style.display = "none";
                }
            });

            // active切り替え
            filters.forEach(link => link.classList.remove("is-active"));
            this.classList.add("is-active");
        });
    });
});

// document.addEventListener("DOMContentLoaded", function () {
//     const filters = document.querySelectorAll("[data-filter]");
//     const posts = document.querySelectorAll(".post");

//     filters.forEach(filter => {
//         filter.addEventListener("click", function (e) {
//             e.preventDefault();

//             const category = this.dataset.filter;

//             posts.forEach(post => {
//                 if (category === "all" || post.dataset.category === category) {
//                     post.style.display = "block";
//                 } else {
//                     post.style.display = "none";
//                 }
//             });
//         });
//     });
// });

// filters.forEach(link => link.classList.remove("is-active"));
// this.classList.add("is-active");