document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');

    if (toggle && menu) {
        toggle.addEventListener('click', function () {
            menu.classList.toggle('active');
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector(".site-header");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 20) {
            header.classList.add("is-scrolled");
        } else {
            header.classList.remove("is-scrolled");
        }
    });

    const toggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu");

    if (toggle && menu) {
        toggle.addEventListener("click", function () {
            menu.classList.toggle("active");
        });
    }

    const slider = document.getElementById("attractionsSlider");
    const track = document.getElementById("attractionsTrack");

    if (!slider || !track) return;

    const originalCards = Array.from(track.children);

    originalCards.forEach((card) => {
        const clone = card.cloneNode(true);
        track.appendChild(clone);
    });

    let currentX = 0;
    let animationId = null;
    let isDragging = false;
    let startX = 0;
    let dragStartTranslate = 0;
    let autoSpeed = 0.6;
    let paused = false;

    function getSingleSetWidth() {
        const cards = Array.from(track.children).slice(0, originalCards.length);
        if (!cards.length) return 0;

        const gap = parseFloat(getComputedStyle(track).gap || "0");
        let width = 0;

        cards.forEach((card, index) => {
            width += card.offsetWidth;
            if (index < cards.length - 1) {
                width += gap;
            }
        });

        return width;
    }

    function setTranslate(x) {
        track.style.transform = `translateX(${x}px)`;
    }

    function animate() {
        if (!paused && !isDragging) {
            currentX -= autoSpeed;

            const singleSetWidth = getSingleSetWidth();

            if (Math.abs(currentX) >= singleSetWidth) {
                currentX = 0;
            }

            setTranslate(currentX);
        }

        animationId = requestAnimationFrame(animate);
    }

    function getPointerX(event) {
        return event.touches ? event.touches[0].clientX : event.clientX;
    }

    function startDrag(event) {
        isDragging = true;
        paused = true;
        slider.classList.add("dragging");
        startX = getPointerX(event);
        dragStartTranslate = currentX;
    }

    function onDrag(event) {
        if (!isDragging) return;

        const currentPointerX = getPointerX(event);
        const delta = currentPointerX - startX;
        currentX = dragStartTranslate + delta;

        const singleSetWidth = getSingleSetWidth();

        if (currentX > 0) {
            currentX = currentX - singleSetWidth;
            dragStartTranslate = currentX;
            startX = currentPointerX;
        }

        if (Math.abs(currentX) >= singleSetWidth) {
            currentX = 0;
            dragStartTranslate = currentX;
            startX = currentPointerX;
        }

        setTranslate(currentX);
    }

    function endDrag() {
        if (!isDragging) return;

        isDragging = false;
        slider.classList.remove("dragging");

        setTimeout(() => {
            paused = false;
        }, 800);
    }

    slider.addEventListener("mousedown", startDrag);
    slider.addEventListener("mousemove", onDrag);
    window.addEventListener("mouseup", endDrag);

    slider.addEventListener("touchstart", startDrag, { passive: true });
    slider.addEventListener("touchmove", onDrag, { passive: true });
    slider.addEventListener("touchend", endDrag);

    slider.addEventListener("mouseenter", () => {
        paused = true;
    });

    slider.addEventListener("mouseleave", () => {
        if (!isDragging) {
            paused = false;
        }
    });

    animate();
});

console.log("Landing page Feijoada da Galera carregada com sucesso.");