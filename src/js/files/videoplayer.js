const videoPlayer = function (element) {
    const playIconContainer = element.querySelector('.video-play-icon');
    const seekSlider = element.querySelector('.video-seek-slider');
    const video = element.querySelector('video');
    const durationContainer = element.querySelector('.video-duration');
    const currentTimeContainer = element.querySelector('.video-current-time');
    let playState = 'play';
    let raf = null;

    if (playIconContainer &&
        seekSlider &&
        video &&
        durationContainer &&
        currentTimeContainer) {

        playIconContainer.addEventListener('click', () => {
            if(playState === 'play') {
                video.play();
                playIconContainer.classList.add('active');
                requestAnimationFrame(whilePlaying);
                playState = 'pause';
            } else {
                video.pause();
                playIconContainer.classList.remove('active')
                cancelAnimationFrame(raf);
                playState = 'play';
            }
        });

        const calculateTime = (secs) => {
            const minutes = Math.floor(secs / 60);
            const seconds = Math.floor(secs % 60);
            const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
            return `${minutes}:${returnedSeconds}`;
        }

        const displayDuration = () => {
            durationContainer.textContent = calculateTime(video.duration);
        }

        const setSliderMax = () => {
            seekSlider.max = Math.floor(video.duration);
        }

        const whilePlaying = () => {
            seekSlider.value = Math.floor(video.currentTime);
            currentTimeContainer.textContent = calculateTime(seekSlider.value);
            raf = requestAnimationFrame(whilePlaying);
        }

        if (video.readyState > 0) {
            displayDuration();
            setSliderMax();
        } else {
            video.addEventListener('loadedmetadata', () => {
                displayDuration();
                setSliderMax();
            });
        }

        seekSlider.addEventListener('input', (e) => {
            video.currentTime = e.target.value;
        })
    }
}

let instance = document.querySelectorAll('.video-player-container');

instance.forEach((element) => {
    videoPlayer(element);
})
