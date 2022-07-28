let players = {};

const pauseOtherPlayers = () => {
    for (let [key, value] of Object.entries(players)) {
        if (value) {
            const player = document.querySelector(`[data-id="${key}"]`);
            const playButton = player.querySelector(key.startsWith('audio') ? '.play-icon' : '.video-play-icon');

            playButton.click();
        }
    }
}

const audioPlayer = (element, index) => {
    const id = `audio-${index}`;
    const playIconContainer = element.querySelector('.play-icon');
    const nextIconContainer = element.querySelector('.next-icon');
    const previousIconContainer = element.querySelector('.previous-icon');
    const seekSlider = element.querySelector('.seek-slider');
    const audioTitle = element.querySelector('.audio-title');
    let playState = 'play';

    element.setAttribute('data-id', id);

    const audio = element.querySelector('.audio');
    const durationContainer = element.querySelector('.duration');
    const currentTimeContainer = element.querySelector('.current-time');
    let raf = null;
    let currentTrackId;

    let tracks = element.getAttribute('data-src');
    tracks = JSON.parse(tracks);

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
                pauseOtherPlayers();
                audio.play();
                playIconContainer.classList.add('active');
                requestAnimationFrame(whilePlaying);
                playState = 'pause';
                players[id] = true;
            } else {
                audio.pause();
                cancelAnimationFrame(raf);
                playState = 'play';
                playIconContainer.classList.remove('active');
                players[id] = false;
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

        seekSlider.addEventListener('input', (e) => {
            audio.currentTime = e.target.value;
        })
    }
};

const videoPlayer = (element, index) => {
    const id = `video-${index}`;
    const playIconContainer = element.querySelector('.video-play-icon');
    const seekSlider = element.querySelector('.video-seek-slider');
    const video = element.querySelector('video');
    const durationContainer = element.querySelector('.video-duration');
    const currentTimeContainer = element.querySelector('.video-current-time');
    let playState = 'play';
    let raf = null;

    element.setAttribute('data-id', id);

    if (playIconContainer &&
        seekSlider &&
        video &&
        durationContainer &&
        currentTimeContainer) {

        playIconContainer.addEventListener('click', () => {
            if(playState === 'play') {
                pauseOtherPlayers();
                video.play();
                playIconContainer.classList.add('active');
                requestAnimationFrame(whilePlaying);
                playState = 'pause';
                players[id] = true;
            } else {
                video.pause();
                playIconContainer.classList.remove('active')
                cancelAnimationFrame(raf);
                playState = 'play';
                players[id] = false;
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
};

let audioInstance = document.querySelectorAll('.audio-player-container');
let videoInstance = document.querySelectorAll('.video-player-container');

audioInstance.forEach((element, index) => {
    audioPlayer(element, index);
})

videoInstance.forEach((element, index) => {
    videoPlayer(element, index);
})
