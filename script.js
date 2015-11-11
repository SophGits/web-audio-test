window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();

function loadNote(url, success) {
	var request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.responseType = 'arraybuffer';

	request.onload = function() {
		context.decodeAudioData(request.response, success, console.error);
	}
	request.send();
}

function playSound(buffer) {
	var source = context.createBufferSource();
	source.buffer = buffer;
	source.connect(context.destination);
	source.start(0);
}

window.onload = function() {
	var notes = [
		{ url: '/m4a/piano-c.m4a', 'el': 'cNote' },
		{ url: '/m4a/piano-d.m4a', 'el': 'dNote' },
		{ url: '/m4a/piano-e.m4a', 'el': 'eNote' },
		{ url: '/m4a/piano-f.m4a', 'el': 'fNote' },
		{ url: '/m4a/piano-g.m4a', 'el': 'gNote' }
	];

	notes.forEach(function (note) {
		loadNote(note.url, function (buffer) {
			var $el = document.getElementById(note.el);
			$el.addEventListener('click', function () {
				playSound(buffer);
			});
		});
	});
}

