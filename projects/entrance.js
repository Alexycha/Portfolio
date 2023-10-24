let textWrapper = document.querySelector(".ml12");
textWrapper.innerHTML = textWrapper.textContent.replace(
    /\S/g,
    "<span class='letter'>$&</span>"
);

anime.timeline().add({
    targets:".ml12 .letter",
    translateY:[11, 0],
    translateZ :0,
    opacity: [0, 1],
    easing: "easeOutExpo",
    duration: 2000,
    delay: (el, i) => 2000 + 60 * i,
}); 

TweenMax.from(".left", 3,{
    left: "-50%",
    ease: Expo.easeInOut,
    delay: 1.4
});

TweenMax.from(".header", 3,{
    left: "-140%",
    ease: Expo.easeInOut,
    delay: 2
});

TweenMax.staggerFrom(
    ".images > div",
    1,
    {
        y:60,
        opacity: 0,
        ease: Power2.easeOut,
        delay: 3,
    },
    0.2
);

TweenMax.staggerFrom(
    ".header > p",
    1,
    {
        y:60,
        opacity: 0,
        ease: Power2.easeOut,
        delay: 2.5,
    },
    0.2
);

TweenMax.from(".link", 1,{
    opacity: 0,
    ease: SteppedEase.config(1),
    repeat: -1,
    repeatDelay: 0.2,
    delay: 4,
});