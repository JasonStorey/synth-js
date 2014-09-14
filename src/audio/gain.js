define([], function() {
    function Gain(config) {
        this.audioContext = config.audioContext;

        this._gainNode = this.audioContext.createGain();
        this._gainNode.gain.value = 0;
    }

    Gain.prototype.connect = function connect(output) {
        this._gainNode.connect(output);
    };

    Gain.prototype.set = function set(val) {
        this.fadeTo(val, 0);
    };

    Gain.prototype.fadeTo = function fadeTo(val, seconds) {
        var startTime = this.audioContext.getCurrentTime();
        this._gainNode.gain.cancelScheduledValues(startTime);
        this._gainNode.gain.setValueAtTime(this._gainNode.gain.value, startTime);
        this._gainNode.gain.linearRampToValueAtTime(val, startTime + seconds);
    };

    return Gain;
});