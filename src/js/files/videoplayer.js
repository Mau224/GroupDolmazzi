const playIconContainer = document.getElementById('video-play-icon');
const seekSlider = document.getElementById('video-seek-slider');
const video = document.getElementById('video');
const durationContainer = document.getElementById('video-duration');
const currentTimeContainer = document.getElementById('video-current-time');
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
            requestAnimationFrame(whilePlaying);
            playState = 'pause';
        } else {
            video.pause();
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
        seekSlider.style.setProperty('width', `${seekSlider.value / seekSlider.max * 100}%`);
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
}
