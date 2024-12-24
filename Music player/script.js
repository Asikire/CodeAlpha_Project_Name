const audio = document.getElementById("audio");
const playButton = document.getElementById("play");
const trackTitle = document.getElementById("track-title");
const trackDuration = document.getElementById("track-duration");
const volumeControl = document.getElementById("volume");
const playlistUl = document.getElementById("playlist-ul");
const playlistH2 = document.querySelector(".h2");
const progress = document.getElementById("progress");

const tracks = [
  {
    title: "Piste 1",
    src: "10_MUSIQUES_CLASSIQUES_LES_PLUS_CELEBRES(128k).mp3",
  },
  {
    title: "Piste 2",
    src: "Athoms_Mbuma_-_Cache-toi_[Clip_Officiel](128k).mp3",
  },
  { title: "Piste 3", src: "endanasi.mp3" },
];

let currentTrackIndex = 0;

function loadTrack(index) {
  audio.src = tracks[index].src;
  trackTitle.textContent = tracks[index].title;
  audio.load();
}

function togglePlay() {
  if (audio.paused) {
    audio.play();
    playButton.innerHTML = "&#x23F8";
  } else {
    audio.pause();
    playButton.innerHTML = "&#x25B6;";
  }
}

function prevTrack() {
  currentTrackIndex =
    currentTrackIndex > 0 ? currentTrackIndex - 1 : tracks.length - 1;

  loadTrack(currentTrackIndex);
  togglePlay();
}

function nextTrack() {
  currentTrackIndex =
    currentTrackIndex < tracks.length - 1 ? currentTrackIndex + 1 : 0;

  loadTrack(currentTrackIndex);
  togglePlay();
}

//Mettre a jour la duree de la piste
audio.addEventListener("loadedmetadata", () => {
  trackDuration.textContent = formatTime(0) + "/" + formatTime(audio.duration);
  progress.max = audio.duration;
  progress.value = audio.currentTime;
});

audio.addEventListener("timeupdate", () => {
  trackDuration.textContent =
    formatTime(audio.currentTime) + "/" + formatTime(audio.duration);
});

//Fonction pour formater le temps
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

//Charger la premiere piste au demarrage
loadTrack(currentTrackIndex);

if (!audio.pause()) {
  setInterval(() => {
    progress.value = audio.currentTime;
  }, 500);
}

progress.addEventListener("input", () => {
  audio.currentTime = progress.value;
});

//Fonction pour regler le volume
function setVolume(value) {
  audio.volume = value;
}

//Remplir la liste de lecture
tracks.forEach((track, index) => {
  const li = document.createElement("li");
  li.innerHTML = track.title;
  li.onclick = () => {
    currentTrackIndex = index;
    loadTrack(currentTrackIndex);
    togglePlay();
  };
  playlistUl.appendChild(li);
});

playlistUl.style.display = "none";

playlistH2.addEventListener("mouseover", toggleList);

function toggleList() {
  if (playlistUl.style.display == "none") {
    playlistUl.style.display = "block";
  } else {
    playlistUl.style.display = "none";
  }
}
