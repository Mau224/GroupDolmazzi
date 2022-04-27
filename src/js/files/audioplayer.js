const playIconContainer = document.getElementById('play-icon');
const nextIconContainer = document.getElementById('next-icon');
const previousIconContainer = document.getElementById('previous-icon');
const seekSlider = document.getElementById('seek-slider');
const audioTitle = document.getElementById('audio-title');
let playState = 'play';

const audio = document.getElementById('audio');
const durationContainer = document.getElementById('duration');
const currentTimeContainer = document.getElementById('current-time');
let raf = null;
let currentTrackId;

const tracks = window.tracks;

if (playIconContainer &&
    seekSlider &&
    audio &&
    durationContainer &&
    currentTimeContainer &&
    previousIconContainer &&
    nextIconContainer) {

    currentTrackId = 0;

    const loadTrack = (nextTrackId) => {
        const nextTrack = tracks[nextTrackId];
        audio.src = nextTrack.src;
        audio.load();
        audioTitle.textContent = nextTrack.name;
    }

    const playNextTrack = () => {
        audio.pause();
        let nextTrackId = 0;
        if (currentTrackId < tracks.length - 1) {
            nextTrackId = currentTrackId + 1;
        }
        currentTrackId = nextTrackId;
        loadTrack(nextTrackId)
        audio.play();
    }

    const playPreviousTrack = () => {
        audio.pause();
        let nextTrackId = tracks.length - 1;
        if (currentTrackId - 1 >= 0) {
            nextTrackId = currentTrackId - 1;
        }
        currentTrackId = nextTrackId;
        loadTrack(nextTrackId)
        audio.play();
    }

    loadTrack(currentTrackId);

    audio.addEventListener('ended', () => {
        playNextTrack();
    });

    playIconContainer.addEventListener('click', () => {
        if(playState === 'play') {
            audio.play();
            requestAnimationFrame(whilePlaying);
            playState = 'pause';
        } else {
            audio.pause();
            cancelAnimationFrame(raf);
            playState = 'play';
        }
    });

    nextIconContainer.addEventListener('click', () => {
        playNextTrack();
    })

    previousIconContainer.addEventListener('click', () => {
        playPreviousTrack();
    })

    const calculateTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${minutes}:${returnedSeconds}`;
    }

    const displayDuration = () => {
        durationContainer.textContent = calculateTime(audio.duration);
    }

    const setSliderMax = () => {
        seekSlider.max = Math.floor(audio.duration);
    }

    const whilePlaying = () => {
        seekSlider.value = Math.floor(audio.currentTime);
        currentTimeContainer.textContent = calculateTime(seekSlider.value);
        seekSlider.style.setProperty('width', `${seekSlider.value / seekSlider.max * 100}%`);
        raf = requestAnimationFrame(whilePlaying);
    }

    if (audio.readyState > 0) {
        displayDuration();
        setSliderMax();
    } else {
        audio.addEventListener('loadedmetadata', () => {
            displayDuration();
            setSliderMax();
        });
    }
}
