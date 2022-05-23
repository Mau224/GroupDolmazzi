const audioPlayer = function(element) {
    const playIconContainer = element.querySelector('.play-icon');
    const nextIconContainer = element.querySelector('.next-icon');
    const previousIconContainer = element.querySelector('.previous-icon');
    const seekSlider = element.querySelector('.seek-slider');
    const audioTitle = element.querySelector('.audio-title');
    let playState = 'play';

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
                audio.play();
                playIconContainer.classList.add('active');
                requestAnimationFrame(whilePlaying);
                playState = 'pause';
            } else {
                audio.pause();
                cancelAnimationFrame(raf);
                playState = 'play';
                playIconContainer.classList.remove('active');
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
}

let instance = document.querySelectorAll('.audio-player-container');

instance.forEach((element) => {
    audioPlayer(element);
})
