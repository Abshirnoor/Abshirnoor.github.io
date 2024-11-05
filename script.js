// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

console.clear();

const select = e => document.querySelector(e);
const selectAll = e => document.querySelectorAll(e);

const stage = select('.stage');
const slides = selectAll(".slide");
const links = selectAll(".slide__scroll-link");

// Initialize the header animation
function initHeader() {
    let tl = gsap.timeline({ delay: 0.5 });

    tl.from('.logo', {
        y: -40,
        opacity: 0,
        duration: 2,
        ease: 'power4'
    })
    .from('.nav-btn__svg rect', {
        scale: 0,
        transformOrigin: "center right",
        duration: 0.6,
        ease: 'power4',
        stagger: 0.1
    }, 0.6)
    .to('.nav-rect', {
        scale: 0.8,
        transformOrigin: "center left",
        duration: 0.4,
        ease: 'power2',
        stagger: 0.1
    }, "-=0.6");
}

// Animate the intro title and text
function initIntro() {
    let tl = gsap.timeline({ delay: 1 });

    // Animate each character in the intro title
    tl.from(".intro__title span", {
        y: "100%",
        opacity: 0,
        ease: "power4.out",
        duration: 0.5,
        stagger: 0.05 // Stagger the animation for each character
    })
    .from('.intro__txt', {
        x: -100,
        opacity: 0,
        ease: 'power4',
        duration: 2
    }, "-=0.5");

    // ScrollTrigger animation for intro section
    gsap.to('.intro__title', {
        scrollTrigger: {
            trigger: '.intro',
            scrub: 1,
            start: "top bottom",
            end: "bottom top"
        },
        x: 400,
        ease: 'power4.in',
        duration: 3
    });
}

// Animate each slide content
function initSlides() {
    slides.forEach(slide => {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: slide,
                start: "40% 50%",
            }
        });

        // Animate each character in slide titles
        tl.from(slide.querySelectorAll('.line__inner'), {
            y: "100%",
            opacity: 0,
            duration: 1.5,
            ease: "power4",
            stagger: 0.05 // Animate each character with a slight delay
        })
        .from(slide.querySelectorAll('.col__content-txt'), {
            x: 100,
            opacity: 0,
            duration: 2,
            ease: "power4"
        }, "-=1");
    });
}

// ScrollToPlugin for navigation links
function initLinks() {
    links.forEach((link, index) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            gsap.to(window, {
                duration: 1.5,
                scrollTo: "#slide-" + (index + 1),
                ease: "power2.inOut"
            });
        });
    });

    const topLink = select('.footer__link-top');
    topLink.addEventListener("click", (e) => {
        e.preventDefault();
        gsap.to(window, {
            duration: 2,
            scrollTo: "#slide-0",
            ease: "power2.inOut"
        });
    });
}

// Initialize the animations and trigger them when page loads
function init() {
    gsap.set(stage, { autoAlpha: 1 }); // Ensure the stage is visible
    initHeader();
    initIntro();
    initSlides();
    initLinks();
}

window.onload = init;
