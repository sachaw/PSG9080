export var waveform;
(function (waveform) {
    waveform[waveform["SINE"] = 0] = "SINE";
    waveform[waveform["SQUARE"] = 1] = "SQUARE";
    waveform[waveform["PULSE"] = 2] = "PULSE";
    waveform[waveform["TRIANGLE"] = 3] = "TRIANGLE";
    waveform[waveform["RAMP"] = 4] = "RAMP";
    waveform[waveform["CMOS"] = 5] = "CMOS";
    waveform[waveform["DC"] = 6] = "DC";
    waveform[waveform["DEV_SINE"] = 7] = "DEV_SINE";
    waveform[waveform["HALF_WAVE"] = 8] = "HALF_WAVE";
    waveform[waveform["FULL_WAVE"] = 9] = "FULL_WAVE";
    waveform[waveform["POS_LADDER"] = 10] = "POS_LADDER";
    waveform[waveform["NEG_LADDER"] = 11] = "NEG_LADDER";
    waveform[waveform["POS_TRAP"] = 12] = "POS_TRAP";
    waveform[waveform["NEG_TRAP"] = 13] = "NEG_TRAP";
    waveform[waveform["NOISE"] = 14] = "NOISE";
    waveform[waveform["EXP_RISE"] = 15] = "EXP_RISE";
    waveform[waveform["EXP_FALL"] = 16] = "EXP_FALL";
    waveform[waveform["LOG_RISE"] = 17] = "LOG_RISE";
    waveform[waveform["LOG_FALL"] = 18] = "LOG_FALL";
    waveform[waveform["SINC"] = 19] = "SINC";
    waveform[waveform["MULTI_TONE"] = 20] = "MULTI_TONE";
    waveform[waveform["LORENZ"] = 21] = "LORENZ";
    waveform[waveform["ARB01"] = 101] = "ARB01";
    waveform[waveform["ARB02"] = 102] = "ARB02";
    waveform[waveform["ARB03"] = 103] = "ARB03";
    waveform[waveform["ARB04"] = 104] = "ARB04";
    waveform[waveform["ARB05"] = 105] = "ARB05";
    waveform[waveform["ARB06"] = 106] = "ARB06";
    waveform[waveform["ARB07"] = 107] = "ARB07";
    waveform[waveform["ARB08"] = 108] = "ARB08";
    waveform[waveform["ARB10"] = 109] = "ARB10";
    waveform[waveform["ARB11"] = 110] = "ARB11";
    waveform[waveform["ARB12"] = 111] = "ARB12";
    waveform[waveform["ARB13"] = 112] = "ARB13";
    waveform[waveform["ARB14"] = 113] = "ARB14";
    waveform[waveform["ARB15"] = 114] = "ARB15";
})(waveform || (waveform = {}));
export var frequencyCategory;
(function (frequencyCategory) {
    frequencyCategory[frequencyCategory["Hz"] = 0] = "Hz";
    frequencyCategory[frequencyCategory["kHz"] = 1] = "kHz";
    frequencyCategory[frequencyCategory["MHz"] = 2] = "MHz";
    frequencyCategory[frequencyCategory["mHz"] = 3] = "mHz";
    frequencyCategory[frequencyCategory["uHz"] = 4] = "uHz";
})(frequencyCategory || (frequencyCategory = {}));
export var modulation;
(function (modulation) {
    modulation[modulation["AM"] = 0] = "AM";
    modulation[modulation["FM"] = 1] = "FM";
    modulation[modulation["PM"] = 2] = "PM";
    modulation[modulation["ASK"] = 3] = "ASK";
    modulation[modulation["FSK"] = 4] = "FSK";
    modulation[modulation["PSK"] = 5] = "PSK";
    modulation[modulation["PULSE"] = 6] = "PULSE";
    modulation[modulation["BURST"] = 7] = "BURST";
})(modulation || (modulation = {}));
export var waveformLoadMethod;
(function (waveformLoadMethod) {
    waveformLoadMethod[waveformLoadMethod["AUTOMATIC"] = 0] = "AUTOMATIC";
    waveformLoadMethod[waveformLoadMethod["FAST"] = 1] = "FAST";
})(waveformLoadMethod || (waveformLoadMethod = {}));
export var waveType;
(function (waveType) {
    waveType[waveType["SINE"] = 0] = "SINE";
    waveType[waveType["SQUARE"] = 1] = "SQUARE";
    waveType[waveType["TRIANGLE"] = 2] = "TRIANGLE";
    waveType[waveType["RISING_SAWTOOTH"] = 3] = "RISING_SAWTOOTH";
    waveType[waveType["FALLING_SAWTOOTH"] = 4] = "FALLING_SAWTOOTH";
    waveType[waveType["ARB101"] = 5] = "ARB101";
    waveType[waveType["ARB102"] = 6] = "ARB102";
    waveType[waveType["ARB103"] = 7] = "ARB103";
    waveType[waveType["ARB104"] = 8] = "ARB104";
    waveType[waveType["ARB105"] = 9] = "ARB105";
})(waveType || (waveType = {}));
export var trigger;
(function (trigger) {
    trigger[trigger["KEY"] = 0] = "KEY";
    trigger[trigger["INTERNAL"] = 1] = "INTERNAL";
    trigger[trigger["EXTERNAL_AC"] = 2] = "EXTERNAL_AC";
    trigger[trigger["EXTERNAL_DC"] = 3] = "EXTERNAL_DC";
})(trigger || (trigger = {}));
export var pulseWaveInversion;
(function (pulseWaveInversion) {
    pulseWaveInversion[pulseWaveInversion["NORMAL"] = 0] = "NORMAL";
    pulseWaveInversion[pulseWaveInversion["INVERSION"] = 1] = "INVERSION";
})(pulseWaveInversion || (pulseWaveInversion = {}));
export var source;
(function (source) {
    source[source["INTERNAL"] = 0] = "INTERNAL";
    source[source["EXTERNAL"] = 1] = "EXTERNAL";
})(source || (source = {}));
export var idleMode;
(function (idleMode) {
    idleMode[idleMode["ZERO"] = 0] = "ZERO";
    idleMode[idleMode["POS_MAX"] = 1] = "POS_MAX";
    idleMode[idleMode["NEG_MAX"] = 2] = "NEG_MAX";
})(idleMode || (idleMode = {}));
export var polarity;
(function (polarity) {
    polarity[polarity["POSATIVE"] = 0] = "POSATIVE";
    polarity[polarity["NEGATIVE"] = 1] = "NEGATIVE";
})(polarity || (polarity = {}));
//# sourceMappingURL=types.js.map