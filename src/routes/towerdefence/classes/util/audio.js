export default class Sound {
    constructor(src) {
        this.elem = document.createElement('audio');
        this.elem.src = src;
        this.elem.setAttribute('preload', 'auto');
        this.elem.setAttribute('controls', 'none');
        this.elem.style.display = 'none';

        document.body.appendChild(this.elem);
    }

    play() {
        this.elem.play();
    }

    stop() {
        this.elem.pause();
    }
}