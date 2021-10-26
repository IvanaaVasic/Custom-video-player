const video = document.getElementById("video");
const play = document.getElementById("play");
const stop = document.getElementById("stop");
const progress = document.getElementById("progress");
const progressVolume = document.getElementById("progress-volume");
const timestamp = document.getElementById("timestamp");
const fullScreen = document.getElementById("fullScreen");
const volume = document.getElementById("volume");
const playbackRate = document.getElementById("playbackRate");

// Play & pause video
function toggleVideoStatus() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}
// update play/pause icon
function updatePlayIcon() {
  if (video.paused) {
    play.innerHTML = '<i class="fas fa-play"></i>';
  } else {
    play.innerHTML = '<i class="fas fa-pause"></i>';
  }
}
//Update progress volume
function updateVolume() {
  const volumeNum = parseFloat(progressVolume.value);
  video.volume = volumeNum;
}

// Update progress & timestamp
function updateProgress() {
  progress.value = (video.currentTime / video.duration) * 100;

  // Get minutes
  let mins = Math.floor(video.currentTime / 60);
  if (mins < 10) {
    mins = "0" + String(mins);
  }

  // Get seconds
  let secs = Math.floor(video.currentTime % 60);
  if (secs < 10) {
    secs = "0" + String(secs);
  }

  timestamp.innerHTML = `${mins}:${secs}`;
}

// Set video time to progress
function setVideoProgress() {
  video.currentTime = (+progress.value * video.duration) / 100;
}

// Stop video
function stopVideo() {
  video.currentTime = 0;
  video.pause();
}

//Get fullscreen
function toggleFullscreen() {
  const container = document.querySelector(".container");

  if (!document.fullscreenElement) {
    container.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

//Mute video
function toggleMute() {
  video.muted = !video.muted;
  const volumeNum = parseFloat(progressVolume.value);

  if (video.muted) {
    progressVolume.value = 0;
  } else {
    progressVolume.value = 1;
  }
}

//Update volume icon
function updateVolumeIcon() {
  if (video.muted) {
    volume.innerHTML = '<i class="fas fa-volume-mute"></i>';
  } else {
    volume.innerHTML = ' <i class="fas fa-volume-up"></i>';
  }
}

//Playback rate
function updatePlaybackRate() {
  const selectedValue = playbackRate.options[playbackRate.selectedIndex].value;
  video.playbackRate = selectedValue;
}

// Event listeners
video.addEventListener("click", toggleVideoStatus);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("timeupdate", updateProgress);
play.addEventListener("click", toggleVideoStatus);
stop.addEventListener("click", stopVideo);
progress.addEventListener("change", setVideoProgress);
progressVolume.addEventListener("input", updateVolume);
fullScreen.addEventListener("click", toggleFullscreen);
volume.addEventListener("click", toggleMute);
volume.addEventListener("click", updateVolumeIcon);
playbackRate.addEventListener("change", updatePlaybackRate);
