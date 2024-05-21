gsap.registerPlugin(ScrollTrigger);

const body = document.querySelector('body');
const intro = document.querySelector('.intro'),
    introCard = intro.querySelectorAll('.intro_card'),
    introMedia = intro.querySelector('.intro_media');
const imgProjects = document.querySelector('.all_projects_media')
const divProjects = document.querySelector('.all_projects')
const isMobile = window.matchMedia('(max-width:769px)');
var imagesArray = [
    "./images/back_art/impression_soleil.jpeg",
    "./images/back_art/trouee_de_soleil_dans_le_brouillard.jpeg",
    "./images/back_art/le_pont_d_argentueil.jpeg",
    "./images/back_art/nuit_d_ete.jpeg",
    "./images/back_art/undertow.jpeg",
    "./images/back_art/saco_bay.jpeg",
    "images/back_art/oriental-poppies.jpg",
    "images/back_art/trouee_de_soleil_dans_le_brouillard.jpeg",
    "images/back_art/garten-in-giverny.jpg",

]

function getRandomImage() {
    var randomIndex = Math.floor(Math.random() * imagesArray.length);
    return imagesArray[randomIndex];
}

// Modifier l'attribut src de l'image
document.getElementById("randomImage").src = getRandomImage();
var parentDiv = document.querySelector('.slider');

for (var i = 0; i < 5; i++) {
    var cloneDiv = document.querySelector('.card').cloneNode(true);
    parentDiv.appendChild(cloneDiv);
}

function changeImage() {
    var imgElement = document.getElementById("changingImage");
    var randomImage = imagesArray[Math.floor(Math.random() * imagesArray.length)];
    imgElement.src = randomImage;
}
window.onload = changeImage;
const init = () => {
    gsap.set(body, {
        overflow: 'hidden'
    });
    gsap.set(introCard[0], {
        scale: 0.7
    });
    initLenis();
    initScrollHero();
    initScrollMedia();
};
const initLenis = () => {
    const lenis = new Lenis({
        lerp: 0.04,
        smoothWheel: true,
    })
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 2000));
    gsap.ticker.lagSmoothing(0);
};

const initScrollHero = () => {
    const tlHero = gsap.timeline({
        defaults: {
            stagger: 0.08,
            ease: 'power1.inOut'
        },
        scrollTrigger: {
            trigger: '.intro_one',
            start: 'top top',
            end: 'center',
            scrub: true,
            pin: true,
            pinSpacing: true,
        },
    });
    tlHero.add('start').to(introCard[0], {
        scale: 1,
    });
};

const initScrollMedia = () => {
    const tlMedia = gsap.timeline({
        scrollTrigger: {
            trigger: intro,
            start: 'top+=200',
            end: 'bottom bottom',
            scrub: 2,
            pinSpacing: false,
        }
    });
    gsap.set(introMedia, {
        autoAlpha: 1
    });
    tlMedia.to(introMedia, {
        autoAlpha: 0,
    });
    initGalleryText();
    initHorizontal();

};

const initGalleryImage = () => {
    const galleryImg = document.querySelectorAll('.gallery_media_image');

    galleryImg.forEach((image) => {
        gsap.from(image, {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power2.out',
        });
    });
};

const initGalleryText = () => {
    const gallery = document.querySelector('.gallery'),
        galleryText = gallery.querySelector('.gallery_text');

    ScrollTrigger.create({
        trigger: gallery,
        pin: galleryText,
        start: 'top top',
        end: 'bottom bottom'
    });
    const texts = gsap.utils.toArray('.gallery_text_items > h2');
    gsap.set(texts, {
        y: '200%',
        autoAlpha: 0
    });
    texts.forEach((text, i) => {
        const tlGalleryText = gsap.timeline({
            scrollTrigger: {
                trigger: gallery,
                start: () => `top+=${i * window.innerHeight + 400} top+=60%`,
                end: () => `top+=${(i + 1) * window.innerHeight} top`,
                scrub: 2,
            },
        });

        tlGalleryText.to(text, {
                y: 0,
                autoAlpha: 1,
            })
            .to(text, {
                y: '-200%',
                autoAlpha: 0,
            });
    });
};

//HORIZONAL

const initHorizontal = () => {
    const horizontal = document.querySelector('.horizontal'),
        horizontalVerticalBoxes = horizontal.querySelectorAll('.horizontal_box--vertical');
    const tlHorizontal = gsap.timeline({
        defaults: {
            ease: 'none'
        },
        scrollTrigger: {
            trigger: horizontal,
            start: 'top top',
            end: () => '+=' + horizontal.offsetWidth,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
        },
    });

    tlHorizontal.to('.horizontal_wrapper', {
        x: () => -(horizontal.scrollWidth - document.documentElement.clientWidth) + 'px',
    });

    gsap.set(horizontalVerticalBoxes, {
        y: '-25%'
    });
    tlHorizontal.to(
        horizontalVerticalBoxes, {
            y: '25%',
            stagger: 0.02,
        },
        0
    );
};

const initProjects = () => {
    console.log('youhou je suis là')
    gsap.to(imgProjects, {
        y: 0,
        ease: 'none',
        scrollTrigger: {
            trigger: divProjects,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true
        }
    })
}

window.addEventListener('DOMContentLoaded', () => {
    if (!isMobile.matches) {
        initGalleryImage();
        init();
        initProjects();
    } else {
        initLenis();
        initScrollMedia();
    }

    function isInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <=
            (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    const rows = document.querySelectorAll('.row');
    rows.forEach((row) => {
        if (isInViewport(row)) {
            const img = row.querySelector('img');
            if (row.querySelector('.left')) {
                gsap.to(img, {
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                });
            } else {
                gsap.to(img, {
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                });
            }
        }
    });
    gsap.utils.toArray('.img-container.left img').forEach((img) => {
        gsap.to(img, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            scrollTrigger: {
                trigger: img,
                start: "top 75%",
                end: "bottom 70%",
                scrub: true,
            },
        });
    });
    gsap.utils.toArray('.img-container.right img').forEach((img) => {
        gsap.to(img, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            scrollTrigger: {
                trigger: img,
                start: "top 75%",
                end: "bottom 70%",
                scrub: true,
            },
        });
    });
    gsap.utils.toArray('.img-container p').forEach((text) => {
        gsap.from(text, {
            opacity: 0,
            y: 20,
            scrollTrigger: {
                trigger: text,
                start: "top 90%",
                toggleActions: "play none none reverse",
            },
        })
    })

});