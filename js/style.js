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

let closeTimer = null;

function openMenu() {
    clearTimeout(closeTimer);
    toc.classList.add('active');
    overlay.classList.add('active');
    tocBtn.classList.add('active');
    document.body.classList.add('no-scroll');
}

function scheduleClose() {
    closeTimer = setTimeout(closeMenu, 300);
}

function closeMenu() {
    toc.classList.remove('active');
    overlay.classList.remove('active');
    tocBtn.classList.remove('active');
    document.body.classList.remove('no-scroll');
}

const isTouchDevice = window.matchMedia('(hover: none)').matches;

if (isTouchDevice) {
    tocBtn.addEventListener('click', () => {
        tocBtn.classList.contains('active') ? closeMenu() : openMenu();
    });
} else {
    tocBtn.addEventListener('mouseenter', () => {
        tocBtn.classList.contains('active') ? closeMenu() : openMenu();
    });
    tocBtn.addEventListener('mouseleave', scheduleClose);
    toc.addEventListener('mouseenter', () => clearTimeout(closeTimer));
    toc.addEventListener('mouseleave', scheduleClose);
}

overlay.addEventListener('click', closeMenu);

toc.addEventListener('click', (e) => {
    if (e.target === toc) {
        closeMenu();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
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

const slides = document.querySelectorAll('.fv__slide');
const dots = document.querySelectorAll('.fv__dot');
const bar = document.getElementById('barInner');
const counterCur = document.getElementById('counterCur');
const wipe = document.getElementById('wipe');
const sideNums = document.querySelectorAll('.fv__index-num');
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
const fv = document.querySelector('.fv');

const DURATION = 5000;
const TRANS_DUR = 1000;

let current = 0;
let isAnimating = false;
let timer;

let mx = -100, my = -100;
let rx = -100, ry = -100;

document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;

    if (cursorDot) {
        cursorDot.style.left = mx + 'px';
        cursorDot.style.top = my + 'px';
    }
});

function loopCursor() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;

    if (cursorRing) {
        cursorRing.style.left = rx + 'px';
        cursorRing.style.top = ry + 'px';
    }

    requestAnimationFrame(loopCursor);
}
loopCursor();

function startProgress() {
    if (!bar) return;

    bar.style.transition = 'none';
    bar.style.width = '0%';

    void bar.offsetWidth;

    bar.style.transition = `width ${DURATION}ms linear`;
    bar.style.width = '100%';
}

function startAuto() {
    clearTimeout(timer);
    timer = setTimeout(nextSlide, DURATION);
}

function initSlide() {
    slides[0].classList.add('is-entering');
    slides[0].classList.add('is-active');

    setTimeout(() => {
        slides[0].classList.remove('is-entering');
        isAnimating = false;
    }, TRANS_DUR);

    dots.forEach((d, i) => d.classList.toggle('is-active', i === 0));
    sideNums.forEach((n, i) => n.classList.toggle('is-active', i === 0));

    if (counterCur) counterCur.textContent = '01';

    startProgress();
    startAuto();
}

function showSlide(next) {

    if (isAnimating || next === current) return;

    isAnimating = true;
    clearTimeout(timer);

    const prev = current;
    current = next;

    if (wipe) {
        wipe.classList.add('is-wiping');
        setTimeout(() => wipe.classList.remove('is-wiping'), TRANS_DUR + 100);
    }

    slides[prev].classList.add('is-leaving');
    slides[prev].classList.remove('is-active');

    setTimeout(() => {

        slides[prev].classList.remove('is-leaving');

        slides[next].classList.add('is-entering');
        slides[next].classList.add('is-active');

        setTimeout(() => {
            slides[next].classList.remove('is-entering');
            isAnimating = false;
        }, TRANS_DUR);

    }, TRANS_DUR * 0.4);

    dots.forEach((d, i) =>
        d.classList.toggle('is-active', i === next)
    );

    sideNums.forEach((n, i) =>
        n.classList.toggle('is-active', i === next)
    );

    if (counterCur) {
        counterCur.textContent = String(next + 1).padStart(2, '0');
    }

    startProgress();
    startAuto();
}

function nextSlide() {
    showSlide((current + 1) % slides.length);
}

dots.forEach((dot, i) => {
    dot.addEventListener('click', () => showSlide(i));
});

sideNums.forEach(n => {
    n.addEventListener('click', () => {
        const target = Number(n.dataset.target);
        showSlide(target);
    });
});

let dragStartX = 0;

document.addEventListener('mousedown', e => {
    dragStartX = e.clientX;
});

document.addEventListener('mouseup', e => {

    const dx = e.clientX - dragStartX;

    if (Math.abs(dx) > 60) {
        dx < 0
            ? nextSlide()
            : showSlide((current - 1 + slides.length) % slides.length);
    }

});

document.addEventListener('touchstart', e => {
    dragStartX = e.touches[0].clientX;
}, { passive: true });

document.addEventListener('touchend', e => {

    const dx = e.changedTouches[0].clientX - dragStartX;

    if (Math.abs(dx) > 50) {
        dx < 0
            ? nextSlide()
            : showSlide((current - 1 + slides.length) % slides.length);
    }

});

document.addEventListener('keydown', e => {

    if (e.key === 'ArrowRight') {
        nextSlide();
    }

    if (e.key === 'ArrowLeft') {
        showSlide((current - 1 + slides.length) % slides.length);
    }

});

if (fv) {

    fv.addEventListener('mouseenter', () => {
        clearTimeout(timer);
    });

    fv.addEventListener('mouseleave', () => {
        startAuto();
    });

}

setTimeout(() => {
    initSlide();
}, 50);


// ツールチップ

const tips = document.querySelectorAll('.tip');
let activeBubble = null;

function showBubble(tip) {
    hideBubble();

    const bubble = document.createElement('div');
    bubble.className = 'tip-bubble';

    const id = tip.dataset.tipId;
    if (id) {
        const tmpl = document.getElementById(id);
        if (tmpl) bubble.appendChild(tmpl.content.cloneNode(true));
    } else {
        bubble.innerHTML = tip.dataset.tip;
    }

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'tip-arrow');
    svg.setAttribute('width', '20');
    svg.setAttribute('height', '10');
    svg.setAttribute('viewBox', '0 0 14 7');
    svg.innerHTML = `<path d="M0 0 L7 7 L14 0" fill="#FCFCFC" stroke="#FCFCFC" stroke-width="1" stroke-linejoin="round"/>`;
    bubble.appendChild(svg);

    document.body.appendChild(bubble);
    activeBubble = bubble;

    positionBubble(tip, bubble);
}

function positionBubble(tip, bubble) {
    const rect = tip.getBoundingClientRect();
    const bubbleRect = bubble.getBoundingClientRect();

    let left = rect.left + rect.width / 2 - bubbleRect.width / 2 + window.scrollX;
    let top = rect.top - bubbleRect.height - 10 + window.scrollY;

    if (left + bubbleRect.width > window.innerWidth - 12) {
        left = rect.right - bubbleRect.width + window.scrollX;
    }
    if (left < 12) left = 12;

    bubble.style.left = left + 'px';
    bubble.style.top = top + 'px';
    bubble.style.opacity = '1';
}

function hideBubble() {
    if (activeBubble) {
        activeBubble.remove();
        activeBubble = null;
    }
}

tips.forEach(tip => {
    tip.addEventListener('mouseenter', () => showBubble(tip));
    tip.addEventListener('mouseleave', hideBubble);

    tip.addEventListener('touchstart', e => {
        e.preventDefault();
        if (activeBubble) { hideBubble(); return; }
        showBubble(tip);
    }, { passive: false });
});

document.addEventListener('touchstart', e => {
    if (!e.target.closest('.tip')) hideBubble();
});