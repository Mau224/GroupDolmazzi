import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

(function() {
    const throttle = function(type, name, obj) {
        obj = obj || window;
        let running = false;
        const func = function() {
            if (running) { return; }
            running = true;
            requestAnimationFrame(() => {
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };

    throttle('resize', 'optimizedResize');
})();

let scrolledPreview = false;

document.addEventListener("DOMContentLoaded", function(event) {
    window.onload = function() {
        const wrapperPreview = document.querySelector('.wrapper-preview');
        const prevBlock = document.querySelector('.prev__blok > p');
        const prevImg = document.querySelector('.prev__img-wrapper');
        let prevBlockOffset = prevBlock?.getBoundingClientRect()?.top;
        let prevImgOffset = prevImg?.getBoundingClientRect()?.top;
        let translateImage = prevImgOffset - prevBlockOffset;

        window.addEventListener('optimizedResize', () => {
            prevBlockOffset = prevBlock.getBoundingClientRect().top;
            prevImgOffset = prevImg.getBoundingClientRect().top;
            translateImage = prevImgOffset - prevBlockOffset;
        });


        if (wrapperPreview) {
            let tween = gsap.to(".scroll-text__part", {xPercent: -100, repeat: -1, duration: 10, ease: "linear"}).totalProgress(0.5);
            gsap.set(".scroll-text__wrapper", {xPercent: -50});

            if (history.scrollRestoration) {
                history.scrollRestoration = 'manual';
            } else {
                window.onbeforeunload = function () {
                    window.scrollTo(0, 0);
                }
            }

            window.requestAnimationFrame(function() {
                window.addEventListener('wheel', (e) => {
                    if (e.deltaY > 1 && !scrolledPreview) {
                        scrolledPreview = true;
                        const scrollFunction = () => {
                            const tl = gsap.timeline({
                                scrollTrigger: {
                                    scrub: true,
                                    pin: true,
                                    pinSpacing: true,
                                    pinReparent: true,
                                    trigger: ".wrapper-preview",
                                }
                            });

                            tl.to(".prev__img", { y: -translateImage })
                                .to('.prev__blok p', { opacity: 0, duration: 0})
                                .add('image-downscale')
                                .to(".prev__img-wrapper", { scale: 0.6 }, 'image-downscale')
                                .to('.prev__main-title', { opacity: 0, display: 'none' }, 'image-downscale')
                                .to('.prev__text-block', { display: 'block', opacity: 1 }, 'image-downscale');
                        }
                        const tl = gsap.timeline({ onComplete: scrollFunction });
                        tl.to('.wrapper-preview', { y: 0, duration: 0.5 })
                            .to('.preloader', { display: 'none' });
                    }
                });
            });
        }
    };

});
document.addEventListener("DOMContentLoaded", function (event) {
    const buttonMap = document.querySelector('.btn-map');

    buttonMap && buttonMap.addEventListener('click', (e) => {
        e.preventDefault();
        gsap.to('body', { overflow: 'hidden' })
        document.querySelector('.prev__map').classList.add('active');
  });
});
