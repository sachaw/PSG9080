export enum waveform {
  SINE,
  SQUARE,
  PULSE,
  TRIANGLE,
  RAMP,
  CMOS,
  DC,
  DEV_SINE,
  HALF_WAVE,
  FULL_WAVE,
  POS_LADDER,
  NEG_LADDER,
  POS_TRAP,
  NEG_TRAP,
  NOISE,
  EXP_RISE,
  EXP_FALL,
  LOG_RISE,
  LOG_FALL,
  SINC,
  MULTI_TONE,
  LORENZ,
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

export enum frequencyCategory {
  Hz,
  kHz,
  MHz,
  mHz,
  uHz
}

export enum modulation {
  AM,
  FM,
  PM,
  ASK,
  FSK,
  PSK,
  PULSE,
  BURST
}

export enum waveformLoadMethod {
  AUTOMATIC,
  FAST
}

export interface channel {
  outputEnabled: boolean; //10
  waveform: waveform; //11,12
  frequency: number; //13,14
  frequencyCategory: frequencyCategory; //13,14
  amplitude: number; //15,16
  offset: number; //17,18
  duty: number; //19,20
  phase: number; //21,22
  modulation: modulation; //40
  modulationWaveType: waveType; //41
  channelSource: source; //42
  modulationWaveFrequency: number; //43,44
  amModulationDepth: number; //45,46
  fmFrequencyDeviation: number; //47,48
  fskHoppingFrequency: number; //49,50
  PMPhaseDeviation: number; //51,52
  pulseWidth: number; //53,54
  pulsePeriod: number; //55,56
  PulseWaveInversion: pulseWaveInversion; //57
  burstIdleMode: idleMode; //58
  polarity: polarity; //59
  trigger: trigger; //60
  //burst pulse number 61
}

export enum waveType {
  SINE,
  SQUARE,
  TRIANGLE,
  RISING_SAWTOOTH,
  FALLING_SAWTOOTH,
  ARB101,
  ARB102,
  ARB103,
  ARB104,
  ARB105
}

export enum trigger {
  KEY,
  INTERNAL,
  EXTERNAL_AC,
  EXTERNAL_DC
}

export enum pulseWaveInversion {
  NORMAL,
  INVERSION
}

export enum source {
  INTERNAL,
  EXTERNAL
}

export enum idleMode {
  ZERO,
  POS_MAX,
  NEG_MAX
}

export enum polarity {
  POSATIVE,
  NEGATIVE
}
