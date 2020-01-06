var audio = document.createElement('audio');
var slider = document.getElementById("myRange");

var first=true;
window.addEventListener('mouseup', onmousedown);

function onmousedown() {
   if(!first) return;
   first=false;
   audio.src="./songs/the-hobbit-theme.mp3";
   audio.play();
   audio.volume = 0.3
   audio.loop = true
}

slider.oninput = function() {
   audio.volume = this.value
}