import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function(event) {
    window.onload = function() {
        window.requestAnimationFrame(function() {

            const loaderTimeline = gsap.timeline();
            loaderTimeline.to('.wrapper-preview', {delay: 0.1})
                .to('.wrapper-preview', { y: '100%', zIndex: 1002, background: '#fff'})
                .to('.wrapper-preview', { y: '0%', delay: 2, duration: 1})
                .to('.preloader', { display: 'none', delay: 1})
                .to('.wrapper-preview', { zIndex: 1, delay: 1});

            const tl = gsap.timeline({ defaults: {ease: "none"} } );
            const imageAnimation = tl.to(".prev__img", {y: -350, duration: 0.5})
                .to('.prev__blok p', { opacity: 0 })
                .to('.prev__img-block h2', { opacity: 1, display: 'flex' })
                .add('image-upscale')
                .to('.prev__img-wrapper', { scale: 1.2, duration: 1 }, 'image-scale')
                .to(".prev__img-block img", { scale: 0.83, duration: 1 }, 'image-scale')
                .add('image-downscale')
                .to(".prev__img-wrapper", { scale: 0.6, duration: 1}, 'image-downscale')
                .to('.prev__main-title', { opacity: 0, display: 'none' }, 'image-downscale')
                .to('.prev__text-block', { display: 'block', opacity: 1 }, 'image-downscale');

            ScrollTrigger.create({
                animation: imageAnimation,
                // markers: true,
                trigger: ".prev__blok",
                scroller: '.prev__container',
                start: "top top",
                end: "bottom center+=200px",
            });
        });

    };

});
