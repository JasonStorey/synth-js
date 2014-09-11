define(['utils/dom'], function(dom) {

    function Trigger(audioContext, config) {
        this.element = new dom.Element('<div>');
        this.element.addClass('trigger-container');
        this.audioContext = audioContext;
        this.config = config || {
            freq: 240,
            type: 'square',
            gain: 0.5
        }
    }

    Trigger.prototype.configure = function configure(config) {
        this.config = config;
    };

    Trigger.prototype.draw = function draw(container) {
        container.append(this.element);
    };

    Trigger.prototype.play = function play() {
        this.oscillator = this.audioContext.createOscillator(this.config);
        this.oscillator.start();
    };

    Trigger.prototype.pause = function pause() {
        this.oscillator.stop();
        this.oscillator = null;
    };

    return Trigger;
});