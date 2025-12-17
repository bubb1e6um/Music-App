// === ЭЛЕМЕНТЫ DOM ===
const audio = document.getElementById('audio');
const playerScreen = document.getElementById('player-screen');
const listScreen = document.getElementById('list-screen');
const volumeContainer = document.getElementById('volume-container'); // Новый элемент

// Кнопки
const playBtn = document.getElementById('main-play-btn');
const miniPlayBtn = document.getElementById('mini-play-btn');
const shuffleBtn = document.getElementById('shuffle-btn');
const repeatBtn = document.getElementById('repeat-btn');
const likeBtnPlayer = document.querySelector('.player-screen .like-btn');

const progress = document.getElementById('progress');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const searchResults = document.getElementById('search-results');
const settingsBtn = document.getElementById('settings-btn');
const settingsMenu = document.getElementById('settings-menu');

// Инфо
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const songListUl = document.getElementById('song-list-ul');

// Обложки
const mainArt = document.getElementById('main-art');
const glowBg = document.getElementById('glow-bg');
const miniArt = document.getElementById('mini-art');
const miniTitle = document.getElementById('mini-title');
const miniArtist = document.getElementById('mini-artist');

// === СОСТОЯНИЕ ===
let songs = [
    {
        title: "Techno Project",
        artist: "SoundHelix",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        cover: "https://www.haedre.com/images/commissions/narcosis_12/narcosis12_A.jpg",
        liked: false
    },
    {
        title: "Acoustic Breeze",
        artist: "Benjamin Tissot",
        src: "https://www.bensound.com/bensound-music/bensound-acousticbreeze.mp3",
        cover: "https://images.unsplash.com/photo-1446057032654-9d8885db76c6?w=500&q=80",
        liked: true 
    },
    {
        title: "Synthwave Run",
        artist: "SoundHelix",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3",
        cover: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=500&q=80",
        liked: false
    }
];

let songIndex = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false; 

// === ФУНКЦИИ ИНИЦИАЛИЗАЦИИ ===

function loadSong(song) {
    trackTitle.innerText = song.title;
    trackArtist.innerText = song.artist;
    mainArt.src = song.cover;
    glowBg.style.backgroundImage = `url(${song.cover})`;
    audio.src = song.src;
    updatePlayerLikeIcon(song.liked);

    // Мини-плеер
    miniTitle.innerText = song.title;
    miniArtist.innerText = song.artist;
    miniArt.src = song.cover;
}

function renderSongList() {
    songListUl.innerHTML = '';
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.classList.add('song-item');
        if (index === songIndex) li.style.background = 'rgba(255,255,255,0.05)';
        
        const heartClass = song.liked ? 'fas fa-heart active' : 'far fa-heart';

        li.innerHTML = `
            <img src="${song.cover}" alt="cover">
            <div class="song-info">
                <h4>${song.title}</h4>
                <p>${song.artist}</p>
            </div>
            <div class="list-actions">
                <i class="${heartClass}" onclick="event.stopPropagation(); toggleLikeList(${index})"></i>
            </div>
        `;
        li.addEventListener('click', () => {
            songIndex = index;
            loadSong(songs[songIndex]);
            playSong();
            toggleScreen();
            renderSongList();
        });
        songListUl.appendChild(li);
    });
}

// === УПРАВЛЕНИЕ ГРОМКОСТЬЮ (НОВОЕ) ===
function toggleVolume() {
    volumeContainer.classList.toggle('show');
}

function setVolume(val) {
    audio.volume = val;
}

// Закрываем микшер при клике вне
document.addEventListener('click', (e) => {
    // Если клик не по кнопке громкости и не по самому микшеру
    if (!e.target.closest('#volume-btn') && !e.target.closest('#volume-container')) {
        volumeContainer.classList.remove('show');
    }
});

// === ЛАЙКИ ===
function toggleLikeList(index) {
    songs[index].liked = !songs[index].liked;
    renderSongList();
    if (index === songIndex) {
        updatePlayerLikeIcon(songs[index].liked);
    }
}

function toggleLike(btn) {
    songs[songIndex].liked = !songs[songIndex].liked;
    updatePlayerLikeIcon(songs[songIndex].liked);
    renderSongList();
}

function updatePlayerLikeIcon(isLiked) {
    const icon = likeBtnPlayer.querySelector('i');
    if (isLiked) {
        icon.className = 'fas fa-heart active';
    } else {
        icon.className = 'far fa-heart';
    }
}

// === SHUFFLE & REPEAT ===
function toggleShuffle() {
    isShuffle = !isShuffle;
    shuffleBtn.classList.toggle('active', isShuffle);
}

function toggleRepeat() {
    isRepeat = !isRepeat;
    repeatBtn.classList.toggle('active', isRepeat);
}

// === ПЛЕЕР ===
function playSong() {
    audio.play();
    isPlaying = true;
    updateIcons();
}

function pauseSong() {
    audio.pause();
    isPlaying = false;
    updateIcons();
}

function togglePlay() {
    isPlaying ? pauseSong() : playSong();
}

function updateIcons() {
    const icon = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
    playBtn.innerHTML = icon;
    miniPlayBtn.innerHTML = icon;
}

function prevSong() {
    songIndex--;
    if (songIndex < 0) songIndex = songs.length - 1;
    loadSong(songs[songIndex]);
    if (isPlaying) playSong();
    renderSongList();
}

function nextSong() {
    if (isShuffle) {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * songs.length);
        } while (newIndex === songIndex && songs.length > 1);
        songIndex = newIndex;
    } else {
        songIndex++;
        if (songIndex > songs.length - 1) songIndex = 0;
    }
    loadSong(songs[songIndex]);
    if (isPlaying) playSong();
    renderSongList();
}

audio.addEventListener('ended', () => {
    if (isRepeat) {
        audio.currentTime = 0;
        playSong();
    } else {
        nextSong();
    }
});

audio.addEventListener('timeupdate', (e) => {
    const { duration, currentTime } = e.srcElement;
    const percent = (currentTime / duration) * 100;
    progress.value = percent || 0;
    
    let min = Math.floor(currentTime / 60);
    let sec = Math.floor(currentTime % 60);
    if(sec < 10) sec = `0${sec}`;
    currentTimeEl.innerText = `${min}:${sec}`;

    if(duration) {
        let minD = Math.floor(duration / 60);
        let secD = Math.floor(duration % 60);
        if(secD < 10) secD = `0${secD}`;
        durationEl.innerText = `${minD}:${secD}`;
    }
});

progress.addEventListener('input', () => {
    const duration = audio.duration;
    audio.currentTime = (progress.value * duration) / 100;
});

// === НАВИГАЦИЯ ===

// Старая функция (для кнопки вниз)
function toggleScreen() {
    playerScreen.classList.toggle('collapsed');
}

// НОВАЯ ФУНКЦИЯ: Для стрелочки назад в списке
function returnToPlayer() {
    // Просто убираем класс collapsed, и окно поднимается
    playerScreen.classList.remove('collapsed');
}

// === ПОИСК ===
let searchTimeout = null;
searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();
    if (query.length === 0) {
        searchResults.classList.add('hidden');
        return;
    }
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        searchMusic();
    }, 500);
});

async function searchMusic() {
    const query = searchInput.value.trim();
    if(!query) return;
    
    searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    searchResults.classList.remove('hidden');

    try {
        const res = await fetch(`https://itunes.apple.com/search?term=${query}&media=music&limit=5`);
        const data = await res.json();
        displaySearchResults(data.results);
    } catch (error) {
        console.error(error);
    } finally {
        searchBtn.innerHTML = '<i class="fas fa-search"></i>';
    }
}

function displaySearchResults(results) {
    searchResults.innerHTML = '';
    if (results.length === 0) return;

    results.forEach(track => {
        const div = document.createElement('div');
        div.classList.add('search-item');
        const coverUrl = track.artworkUrl100 ? track.artworkUrl100.replace('100x100', '300x300') : '';
        
        div.innerHTML = `
            <img src="${coverUrl}" alt="art">
            <div class="search-info">
                <h4>${track.trackName}</h4>
                <p>${track.artistName}</p>
            </div>
            <div class="add-icon"><i class="fas fa-plus"></i></div>
        `;

        div.addEventListener('click', () => {
            addSongToLibrary({
                title: track.trackName,
                artist: track.artistName,
                src: track.previewUrl,
                cover: coverUrl,
                liked: false 
            });
            searchResults.classList.add('hidden');
            searchInput.value = '';
        });
        searchResults.appendChild(div);
    });
}

function addSongToLibrary(song) {
    songs.push(song);
    renderSongList();
    setTimeout(() => {
        songListUl.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
}

// === НАСТРОЙКИ ===
settingsBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    settingsMenu.classList.toggle('hidden');
});
document.addEventListener('click', (e) => {
    if (!settingsMenu.contains(e.target) && e.target !== settingsBtn) {
        settingsMenu.classList.add('hidden');
    }
});
document.getElementById('clear-playlist').addEventListener('click', () => {
    if(confirm('Clear playlist?')) {
        songs = [];
        renderSongList();
        audio.pause();
        settingsMenu.classList.add('hidden');
    }
});
document.getElementById('toggle-theme').addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    settingsMenu.classList.add('hidden');
});

// СТАРТ
loadSong(songs[songIndex]);
renderSongList();