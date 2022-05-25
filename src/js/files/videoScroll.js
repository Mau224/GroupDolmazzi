import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

const image = document.querySelector(".video-background");

const frameCount = 148;
const currentFrame = index => (
    `/img/video/Full_5_1${index.toString().padStart(3, '0')}.jpg`
)

const preloadImages = () => {
    for (let i = 0; i <= frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
    }
};

const img = new Image()
img.src = currentFrame(1);
img.onload = () => {
    image.src = img.src;
}

const updateImage = index => {
    img.src = currentFrame(index);
    image.src = img.src;
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
        start: () => `top ${(window.innerHeight - document.querySelector(".video-background").clientHeight) / 2}`,
        end: "bottom bottom",
        pin: true,
        // markers: true,
        scrub: true,
        onUpdate: scrollVideo,
    }
});

preloadImages()
