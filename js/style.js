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

const tocClose = document.querySelector(".toc-close");

tocBtn.addEventListener("click", () => {
    toc.classList.add("active");
    overlay.classList.add("active");
    tocBtn.classList.add("active");
    document.body.classList.add("no-scroll");
});

function closeToc() {
    toc.classList.remove("active");
    overlay.classList.remove("active");
    tocBtn.classList.remove("active");
    document.body.classList.remove("no-scroll");
}

tocClose.addEventListener("click", closeToc);
overlay.addEventListener("click", closeToc);
//ハンバーガーメニューここまで

//works表示切り替え
document.addEventListener("DOMContentLoaded", function () {
    const filters = document.querySelectorAll("[data-filter]");
    const posts = document.querySelectorAll(".post");

    filters.forEach(filter => {
        filter.addEventListener("click", function (e) {
            e.preventDefault();

            const category = this.dataset.filter;

            posts.forEach(post => {
                if (category === "all" || post.dataset.category === category) {
                    post.style.display = "block";
                } else {
                    post.style.display = "none";
                }
            });

            filters.forEach(link => link.classList.remove("is-active"));
            this.classList.add("is-active");
        });
    });
});
