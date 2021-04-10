export declare enum waveform {
    SINE = 0,
    SQUARE = 1,
    PULSE = 2,
    TRIANGLE = 3,
    RAMP = 4,
    CMOS = 5,
    DC = 6,
    DEV_SINE = 7,
    HALF_WAVE = 8,
    FULL_WAVE = 9,
    POS_LADDER = 10,
    NEG_LADDER = 11,
    POS_TRAP = 12,
    NEG_TRAP = 13,
    NOISE = 14,
    EXP_RISE = 15,
    EXP_FALL = 16,
    LOG_RISE = 17,
    LOG_FALL = 18,
    SINC = 19,
    MULTI_TONE = 20,
    LORENZ = 21,
    ARB01 = 101,
    ARB02 = 102,
    ARB03 = 103,
    ARB04 = 104,
    ARB05 = 105,
    ARB06 = 106,
    ARB07 = 107,
    ARB08 = 108,
    ARB10 = 109,
    ARB11 = 110,
    ARB12 = 111,
    ARB13 = 112,
    ARB14 = 113,
    ARB15 = 114
}
export declare enum frequencyCategory {
    Hz = 0,
    kHz = 1,
    MHz = 2,
    mHz = 3,
    uHz = 4
}
export declare enum modulation {
    AM = 0,
    FM = 1,
    PM = 2,
    ASK = 3,
    FSK = 4,
    PSK = 5,
    PULSE = 6,
    BURST = 7
}
export declare enum waveformLoadMethod {
    AUTOMATIC = 0,
    FAST = 1
}
export interface channel {
    outputEnabled: boolean;
    waveform: waveform;
    frequency: number;
    frequencyCategory: frequencyCategory;
    amplitude: number;
    offset: number;
    duty: number;
    phase: number;
    modulation: modulation;
    modulationWaveType: waveType;
    channelSource: source;
    modulationWaveFrequency: number;
    amModulationDepth: number;
    fmFrequencyDeviation: number;
    fskHoppingFrequency: number;
    PMPhaseDeviation: number;
    pulseWidth: number;
    pulsePeriod: number;
    PulseWaveInversion: pulseWaveInversion;
    burstIdleMode: idleMode;
    polarity: polarity;
    trigger: trigger;
}
export declare enum waveType {
    SINE = 0,
    SQUARE = 1,
    TRIANGLE = 2,
    RISING_SAWTOOTH = 3,
    FALLING_SAWTOOTH = 4,
    ARB101 = 5,
    ARB102 = 6,
    ARB103 = 7,
    ARB104 = 8,
    ARB105 = 9
}
export declare enum trigger {
    KEY = 0,
    INTERNAL = 1,
    EXTERNAL_AC = 2,
    EXTERNAL_DC = 3
}
export declare enum pulseWaveInversion {
    NORMAL = 0,
    INVERSION = 1
}
export declare enum source {
    INTERNAL = 0,
    EXTERNAL = 1
}
export declare enum idleMode {
    ZERO = 0,
    POS_MAX = 1,
    NEG_MAX = 2
}
export declare enum polarity {
    POSATIVE = 0,
    NEGATIVE = 1
}
