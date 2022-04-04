import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

let scrolledPreview = false;

document.addEventListener("DOMContentLoaded", function(event) {
    window.onload = function() {
        window.requestAnimationFrame(function() {
            window.addEventListener('scroll', () => {
                if (pageYOffset > 1 && !scrolledPreview) {
                    scrolledPreview = true;
                    const tl = gsap.timeline();
                    tl.to('.wrapper-preview', { y: 0, duration: 0.5 })
                        .to('.preloader', { display: 'none', delay: 0.5 });
                    setTimeout(() => {
                        const prevBlockOffset = document.querySelector('.prev__blok > p').getBoundingClientRect().top;
                        const prevImgOffset = document.querySelector('.prev__img-wrapper').getBoundingClientRect().top;
                        const translateImage = prevImgOffset - prevBlockOffset;

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
                        .to('.prev__blok p', { opacity: 0 })
                        .to('.prev__img-block h2', { opacity: 1, display: 'flex' })
                        // .add('image-upscale')
                        // .to('.prev__img-wrapper', { scale: 1.2 }, 'image-scale')
                        // .to(".prev__img-block img", { scale: 0.83 }, 'image-scale')
                        .add('image-downscale')
                        .to(".prev__img-wrapper", { scale: 0.6 }, 'image-downscale')
                        .to('.prev__main-title', { opacity: 0, display: 'none' }, 'image-downscale')
                        .to('.prev__text-block', { display: 'block', opacity: 1 }, 'image-downscale');
                    }, 500);
                }
            });
        });

    };

});
document.addEventListener("DOMContentLoaded", function (event) {
  document.querySelector('.btn-map').addEventListener('click', (e) => {
      e.preventDefault();
      gsap.to('body', { overflow: 'hidden' })
      document.querySelector('.prev__map').classList.add('active');
  });
});
