import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

const image = document.querySelector(".video-background") || {};
const imageSource = document.querySelector('.video__wrap > picture > source') || {};

const frameCount = 148;
const currentFrame = index => (
    `img/video/Full_5_1${index.toString().padStart(3, '0')}.jpg`
)
const currentFrameWebP = index => (
    `img/video/Full_5_1${index.toString().padStart(3, '0')}.webp`
)

const preloadImages = () => {
    for (let i = 0; i <= frameCount; i++) {
        const img = new Image();
        const source = document.createElement("source");
        img.src = currentFrame(i);
        source.srcset = currentFrameWebP(i);
    }
};

const img = new Image()
const imgSource = document.createElement("source");
img.src = currentFrame(1);
imgSource.srcset = currentFrameWebP(1);
img.onload = () => {
    image.src = img && img?.src;
}
imgSource.onload = () => {
    imageSource.srcset = imgSource && imgSource?.srcset;
}

const updateImage = index => {
    img.src = currentFrame(index);
    imgSource.srcset = currentFrameWebP(index);
    image.src = img?.src;
    imageSource.srcset = imgSource?.srcset;
}

const scrollVideo = (self) => {
    const scrollTop = Math.floor(self.progress * 100);
    const maxScrollTop = 100;
    const scrollFraction = scrollTop / maxScrollTop;
    const frameIndex = Math.min(
        frameCount - 1,
        Math.ceil(scrollFraction * frameCount)
    );

    requestAnimationFrame(() => updateImage(frameIndex + 1))
}

gsap.timeline({
    scrollTrigger: {
        trigger: ".video__wrap",
        start: () => `top ${(window.innerHeight - document.querySelector(".video-background")?.clientHeight) / 2}`,
        end: "bottom bottom",
        pin: true,
        // markers: true,
        scrub: true,
        onUpdate: scrollVideo,
    }
});

preloadImages()
