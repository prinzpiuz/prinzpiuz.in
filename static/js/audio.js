const player = document.getElementById("music-player");
player.volume = 0.2;
const audio_on_button = document.getElementById("audi_on");
const audio_off_button = document.getElementById("audio_off");

audio_on = () => {
  player.volume = 0.0;
  audio_on_button.style.display = "none";
  audio_off_button.style.display = "inline";
};
audio_off = () => {
  player.volume = 0.2;
  audio_on_button.style.display = "inline";
  audio_off_button.style.display = "none";
};

audio_on_button.addEventListener("click", audio_on);
audio_off_button.addEventListener("click", audio_off);
