//footer表示時header非表示
const header = document.querySelector('.header');
const footer = document.querySelector('.footer');

const observer = new IntersectionObserver(([entry]) => {
    header.classList.toggle('header--hidden', entry.isIntersecting);
});

observer.observe(footer);

document.addEventListener("DOMContentLoaded", function () {

    const sections = document.querySelectorAll("[data-title]");
    const headerTitle = document.querySelector(".header__title");

    headerTitle.classList.remove("is-visible");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {

            if (entry.isIntersecting) {
                headerTitle.textContent = entry.target.dataset.title;
                headerTitle.classList.add("is-visible");
            } else {
                headerTitle.classList.remove("is-visible");
            }

        });
    }, {
        threshold: 0.4
    });

    sections.forEach(section => {
        observer.observe(section);
    });

});


//ハンバーガーメニュー
const tocBtn = document.querySelector('.toc-btn');
const toc = document.querySelector('.toc');
const overlay = document.querySelector('.toc-overlay');

tocBtn.addEventListener('click', () => {
    toc.classList.toggle('active');
    overlay.classList.toggle('active');
    tocBtn.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
});

overlay.addEventListener('click', () => {
    toc.classList.remove('active');
    overlay.classList.remove('active');
    tocBtn.classList.remove('active');
    document.body.classList.remove('no-scroll');
});
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

// URLの?filter=
const params = new URLSearchParams(window.location.search);
const filter = params.get("filter");

if (filter) {
    document.querySelectorAll('[data-filter]').forEach(btn => {
        btn.classList.remove("is-active");

        if (btn.dataset.filter === filter) {
            btn.classList.add("is-active");
        }
    });

    document.querySelectorAll(".post").forEach(post => {
        if (filter === "all" || post.dataset.category === filter) {
            post.style.display = "block";
        } else {
            post.style.display = "none";
        }
    });

    history.pushState(null, "", `?filter=${filter}`);

}
