const player = document.querySelector('.player__main'),
    playBtn = document.querySelector('.player__button.play'),
    nextBtn = document.querySelector('.player__button.next'),
    prevBtn = document.querySelector('.player__button.prev'),
    audio = document.querySelector('.audio'),
    progressContainer = document.querySelector('.player__progress-container'),
    progressBar = document.querySelector('.player__progress-bar'),
    title = document.querySelectorAll('.song__title'),
    cover = document.querySelector('.player__img'),
    imgSrc = document.querySelector('.player__btn-img.play'),
    songTime = document.querySelector('.player__song-time');

//названия песен
const songs = ['16_02_21', '25_12', '0812 copy', '1008', '2022', 'drill'];

// песня по умолчанию

let songIndex = 0;
let currentSong;

//init

function init(song) {
    title.innerHTML = song;
    audio.src = `audio/${song}.mp3`;
    cover.src = `img/song-cover/cover${songIndex + 1}.png`;
    currentSong = document.getElementById("song_" + songIndex);
}

init(songs[songIndex]);

// play

function playSong() {
    player.classList.add('play');
    imgSrc.src = './img/player/btn__pause.svg';
    audio.play();
    currentSong.classList.add('song__title-active');
}

function pauseSong() {
    player.classList.remove('play');
    imgSrc.src = './img/player/btn__play.svg';
    audio.pause();
}

playBtn.addEventListener('click', () => {
    const isPlaying = player.classList.contains('play');
    if (isPlaying) {
        pauseSong();
    }
    else {
        playSong();
    }
})

// nextSong

function nextSong() {
    currentSong.classList.remove('song__title-active');
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }

    init(songs[songIndex]);
    playSong();
}

nextBtn.addEventListener('click', nextSong);

// prevSong

function prevSong() {
    currentSong.classList.remove('song__title-active');
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    init(songs[songIndex]);
    playSong();
}

prevBtn.addEventListener('click', prevSong);

// progress bar

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
    if (currentTime === 0) {
        songTime.innerText = "00:00";
        progressBar.style.width = 0;
    } else {
        songTime.innerText = `${audioTime(duration, currentTime)}`;
    }
}

audio.addEventListener('timeupdate', updateProgress);

// set progress

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

progressContainer.addEventListener('click', setProgress);

// autoplay

audio.addEventListener('ended', nextSong);

// time format MM:SS

function audioTime(duration, currentTime) { //Рассчитываем время в секундах и минутах
    time = Math.floor(duration - currentTime);
    var minutes = Math.floor(time / 60);
    var seconds = Math.floor(time - minutes * 60);
    var minutesVal = minutes;
    var secondsVal = seconds;
    if (minutes < 10) {
        minutesVal = '0' + minutes;
    }
    if (seconds < 10) {
        secondsVal = '0' + seconds;
    }
    return minutesVal + ':' + secondsVal;
}