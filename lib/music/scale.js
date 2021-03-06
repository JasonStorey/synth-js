var T = 2,
    S = 1,
    TONALITIES = {
        major: [T,T,S,T,T,T,S],
        minor: [T,S,T,T,S,T,T]
    },
    CHROMATIC = createChromaticScale(27.5000, 127),
    ROOT_NOTES = {
        A:  0,
        Bb: 1,
        B:  2,
        C:  3,
        Db: 4,
        D:  5,
        Eb: 6,
        E:  7,
        F:  8,
        Gb: 9,
        G:  10,
        Ab: 11
    };

function create(startNote, octave, tonality) {
    var key = {};

    if(tonality === 'chromatic') {
        return CHROMATIC.slice(ROOT_NOTES[startNote] + (octave * 12));
    }

    key.rootNote = ROOT_NOTES[startNote] + (octave * 12);
    key.tonality = TONALITIES[tonality];

    return createScale(CHROMATIC.slice(key.rootNote), key.tonality);
}

function createChromaticScale(startFreq, length) {
    var chromatic = [],
        semitoneRatio,
        freq;

    for(var i = 0; i < length; i++) {
        semitoneRatio = Math.pow(2, i/12);
        freq = startFreq * semitoneRatio;
        chromatic.push(freq);
    }
    return chromatic;
}

function createScale(chromaticScale, intervals) {
    var scale = [],
        pointer = 0,
        selected = 0;

    chromaticScale.forEach(function(val, index) {
        if(index === selected) {
            scale.push(val);
            selected += intervals[pointer];
            pointer = (pointer + 1) % intervals.length;
        }
    });
    return scale;
}

module.exports = {
    CHROMATIC: CHROMATIC,
    create: create
};
