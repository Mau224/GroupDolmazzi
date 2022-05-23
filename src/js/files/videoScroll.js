import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

gsap.timeline({
    scrollTrigger: {
        trigger: ".video-background",
        start: "top top",
        end: "bottom+=320% bottom",
        pin: true,
        // markers: true,
        scrub: true,
    }
});

function scrollVideo() {
    const video = document.querySelector('.video-background')
    const videoLength = video.duration
    const scrollPosition = document.documentElement.scrollTop;

    const nextSectionOffset = document.querySelector('.case')?.getBoundingClientRect()?.top;
    const videoSectionOffset = document.querySelector('.video')?.getBoundingClientRect()?.top;

    video.currentTime = (scrollPosition / 2.1 / (nextSectionOffset - videoSectionOffset - window.screen.height)) * videoLength;
}

window.addEventListener('scroll', function(e) {
    scrollVideo();
});
