import { Subject } from "rxjs";

import {
  channel,
  frequencyCategory,
  idleMode,
  modulation,
  polarity,
  pulseWaveInversion,
  source,
  trigger,
  waveform,
  waveformLoadMethod,
  waveType
} from "./types";
import { LineBreakTransformer } from "./utils/LineBreakTransformer";

export * from "./types";

export class PSG9080 {
  private port: SerialPort;

  private versions: {
    hardware: number;
    firmware: number;
    fpga: number;
  };
  private serial: number;
  private settings: {
    mute: boolean;
    brightness: number;
    waveformLoadMethod: waveformLoadMethod;
  };
  private channel1: channel;
  private channel2: channel;

  private reader: ReadableStreamDefaultReader<Uint8Array>;
  // private inputDone: Promise<void>;
  // private outputDone: Promise<void>;
  private inputStream: ReadableStream<any>;
  private outputStream: WritableStream<string>;

  constructor() {
    this.settings = {
      mute: false,
      brightness: 100,
      waveformLoadMethod: waveformLoadMethod.AUTOMATIC
    };
    this.channel1 = {
      outputEnabled: true,
      waveform: waveform.SINE,
      frequency: 0,
      frequencyCategory: frequencyCategory.Hz,
      amplitude: 0,
      offset: 0,
      duty: 0,
      phase: 0,
      modulation: modulation.AM,
      modulationWaveType: waveType.SINE,
      channelSource: source.INTERNAL,
      modulationWaveFrequency: 0,
      amModulationDepth: 0,
      fmFrequencyDeviation: 0,
      fskHoppingFrequency: 0,
      PMPhaseDeviation: 0,
      pulseWidth: 0,
      pulsePeriod: 0,
      PulseWaveInversion: pulseWaveInversion.NORMAL,
      burstIdleMode: idleMode.ZERO,
      polarity: polarity.POSATIVE,
      trigger: trigger.KEY
    };
    this.channel2 = {
      outputEnabled: true,
      waveform: waveform.SINE,
      frequency: 0,
      frequencyCategory: frequencyCategory.Hz,
      amplitude: 0,
      offset: 0,
      duty: 0,
      phase: 0,
      modulation: modulation.AM,
      modulationWaveType: waveType.SINE,
      channelSource: source.INTERNAL,
      modulationWaveFrequency: 0,
      amModulationDepth: 0,
      fmFrequencyDeviation: 0,
      fskHoppingFrequency: 0,
      PMPhaseDeviation: 0,
      pulseWidth: 0,
      pulsePeriod: 0,
      PulseWaveInversion: pulseWaveInversion.NORMAL,
      burstIdleMode: idleMode.ZERO,
      polarity: polarity.POSATIVE,
      trigger: trigger.KEY
    };
    this.port = undefined;
    this.versions = {
      hardware: 0,
      firmware: 0,
      fpga: 0
    };
    this.serial = 0;

    this.reader = undefined;
  }

  public readonly onFrequencyChangeEvent: Subject<{
    channel: 1 | 2;
    frequency: number;
    frequencyCategory: frequencyCategory;
  }> = new Subject();
  public readonly onOutputChangeEvent: Subject<{
    enabled1: boolean;
    enabled2: boolean;
  }> = new Subject();
  public readonly onWaveformChangeEvent: Subject<{
    channel: 1 | 2;
    waveform: waveform;
  }> = new Subject();
  public readonly onMuteChangeEvent: Subject<boolean> = new Subject();
  public readonly onDeviceReadyChangeEvent: Subject<boolean> = new Subject();
  public readonly onOffsetChangeEvent: Subject<{
    channel: 1 | 2;
    offset: number;
  }> = new Subject();
  public readonly onDutyChangeEvent: Subject<{
    channel: 1 | 2;
    duty: number;
  }> = new Subject();
  public readonly onPhaseChangeEvent: Subject<{
    channel: 1 | 2;
    phase: number;
  }> = new Subject();
  public readonly onFirmwareChangeEvent: Subject<{
    hardware: number;
    firmware: number;
    fpga: number;
  }> = new Subject();
  public readonly onBrightnessChangeEvent: Subject<number> = new Subject();
  public readonly onSerialChangeEvent: Subject<number> = new Subject();
  public readonly onAmplitudeChange: Subject<{
    channel: 1 | 2;
    amplitude: number;
  }> = new Subject();

  private async readLoop() {
    while (true) {
      const { value, done } = await this.reader.read();
      if (value) {
        const textdec = new TextDecoder();
        this.handleSerialMessage(textdec.decode(value));
      }

      if (done) {
        console.log("[readLoop] DONE", done);
        this.reader.releaseLock();
        break;
      }
    }
  }

  private writeToStream(...lines: string[]) {
    const writer = this.outputStream.getWriter();
    lines.forEach((line) => {
      writer.write(line + "\n");
    });
    writer.releaseLock();
  }

  public async disconnect() {
    if (this.reader) {
      await this.reader.cancel();
      // await this.inputDone.catch(() => {});
      this.reader = null;
      // this.inputDone = null;
    }

    if (this.outputStream) {
      await this.outputStream.getWriter().close();
      // await this.outputDone;
      this.outputStream = null;
      // this.outputDone = null;
    }

    await this.port.close();
    this.port = null;
  }

  public async connect() {
    // - Request a port and open a connection.
    this.port = await navigator.serial.requestPort();
    // - Wait for the port to open.toggleUIConnected
    await this.port.open({
      baudRate: 115200
    });

    const encoder = new TextEncoderStream();
    // this.outputDone = encoder.readable.pipeTo(this.port.writable);
    this.outputStream = encoder.writable;

    let decoder = new TextDecoderStream();
    // this.inputDone = this.port.readable.pipeTo(decoder.writable);
    this.inputStream = decoder.readable.pipeThrough(
      new TransformStream(new LineBreakTransformer())
    );

    this.reader = this.inputStream.getReader();

    this.readLoop();
    this.onDeviceReadyChangeEvent.next(true);
    this.getDataLoop();
  }

  getDataLoop() {
    setInterval(() => {
      console.log("!!sending!!");

      this.writeToStream(":r00=80.\n");
    }, 500);
  }

  handleSerialMessage(message: string) {
    const messageString = message.replace(/(\r\n|\n|\r)/gm, "");
    const regexp = /^:(?<direction>.)(?<instruction>[0-9]*)=(?<data>([0-9]|,)*)\.$/;
    if (regexp.test(messageString)) {
      const matches = regexp.exec(messageString);
      let states = matches[3].replace(".", "");
      const parsed = parseInt(states.replace(",", ""));
      switch (parseInt(matches[2])) {
        case 1:
          if (parsed !== this.serial) {
            this.serial = parsed;
            this.onSerialChangeEvent.next(parsed);
          }
          break;
        case 2:
          const states02 = states.split(",");
          if (
            parseInt(states02[0]) !== this.versions.hardware ||
            parseInt(states02[1]) !== this.versions.firmware ||
            parseInt(states02[2]) !== this.versions.fpga
          ) {
            this.versions = {
              hardware: parseInt(states02[0]),
              firmware: parseInt(states02[1]),
              fpga: parseInt(states02[2])
            };
            this.onFirmwareChangeEvent.next({
              ...this.versions
            });
          }
          break;

        case 10:
          const states10 = states.split(",");

          if (!!parseInt(states10[0]) !== this.channel1.outputEnabled) {
            this.channel1.outputEnabled = !!parseInt(states10[0]);

            this.onOutputChangeEvent.next({
              enabled1: !!parseInt(states10[0]),
              enabled2: this.channel2.outputEnabled
            });
          }

          if (!!parseInt(states10[1]) !== this.channel2.outputEnabled) {
            this.channel2.outputEnabled = !!parseInt(states10[1]);
            this.onOutputChangeEvent.next({
              enabled1: this.channel2.outputEnabled,
              enabled2: !!parseInt(states10[1])
            });
          }
          break;

        case 11:
          if (parsed !== this.channel1.waveform) {
            this.channel1.waveform = parsed;
            this.onWaveformChangeEvent.next({
              channel: 1,
              waveform: parsed
            });
          }
          break;
        case 12:
          if (parsed !== this.channel2.waveform) {
            this.channel2.waveform = parsed;
            this.onWaveformChangeEvent.next({
              channel: 2,
              waveform: parsed
            });
          }

          break;

        case 13:
          const states13 = states.split(",");

          if (
            parseInt(states13[0]) !== this.channel1.frequency ||
            parseInt(states13[1]) !== this.channel1.frequencyCategory
          ) {
            this.channel1.frequency = parseInt(states13[0]);
            this.channel1.frequencyCategory = parseInt(states13[1]);
            this.onFrequencyChangeEvent.next({
              channel: 1,
              frequency: parseInt(states13[0]),
              frequencyCategory: parseInt(states13[1])
            });
          }
          break;

        case 14:
          const states14 = states.split(",");

          if (
            parseInt(states14[0]) !== this.channel2.frequency ||
            parseInt(states14[1]) !== this.channel2.frequencyCategory
          ) {
            this.channel2.frequency = parseInt(states14[0]);
            this.channel2.frequencyCategory = parseInt(states14[1]);
            this.onFrequencyChangeEvent.next({
              channel: 2,
              frequency: parseInt(states14[0]),
              frequencyCategory: parseInt(states14[1])
            });
          }

          break;
        case 15:
          if (parsed !== this.channel1.amplitude) {
            this.channel1.amplitude = parsed;
            this.onAmplitudeChange.next({
              channel: 1,
              amplitude: parsed
            });
          }
          break;
        case 16:
          if (parsed !== this.channel2.amplitude) {
            this.channel2.amplitude = parsed;
            this.onAmplitudeChange.next({
              channel: 2,
              amplitude: parsed
            });
          }
          break;

        case 17:
          if (parsed !== this.channel1.offset) {
            this.channel1.offset = parsed;
            this.onOffsetChangeEvent.next({
              channel: 1,
              offset: parsed
            });
          }
          break;
        case 18:
          if (parsed !== this.channel2.offset) {
            this.channel2.offset = parsed;
            this.onOffsetChangeEvent.next({
              channel: 2,
              offset: parsed
            });
          }
          break;
        case 19:
          if (parsed !== this.channel1.duty) {
            this.channel1.duty = parsed;
            this.onDutyChangeEvent.next({
              channel: 1,
              duty: parsed
            });
          }
          break;
        case 20:
          if (parsed !== this.channel2.duty) {
            this.channel2.duty = parsed;
            this.onDutyChangeEvent.next({
              channel: 2,
              duty: parsed
            });
          }
          break;
        case 21:
          if (parsed !== this.channel1.phase) {
            this.channel1.phase = parsed;
            this.onPhaseChangeEvent.next({
              channel: 1,
              phase: parsed
            });
          }
          break;
        case 22:
          if (parsed !== this.channel2.phase) {
            this.channel2.phase = parsed;
            this.onPhaseChangeEvent.next({
              channel: 2,
              phase: parsed
            });
          }
          break;
        case 27:
          if (!!parsed !== this.settings.mute) {
            this.settings.mute = !!parsed;
            this.onMuteChangeEvent.next(!!parsed);
          }
          break;

        case 28:
          if (parsed !== this.settings.brightness) {
            this.settings.brightness = parsed;
            this.onBrightnessChangeEvent.next(parsed);
          }
          break;

        case 29:
          // Chinease interface `:r29=1.`
          break;

        case 30:
          // `:r30=21.` The built-in wave number in the instrument is 21.
          break;

        case 31:
          //
          break;

        case 32:
          //
          break;
        case 33:
          //
          break;
        case 34:
          //
          break;
        case 35:
          //
          break;
        case 36:
          //
          break;
        case 37:
          //
          break;
        case 38:
          //
          break;
        case 39:
          //
          break;
        case 40:
          //
          break;
        case 41:
          //
          break;
        case 42:
          //
          break;
        case 43:
          //
          break;
        case 44:
          //
          break;
        case 45:
          //
          break;
        case 46:
          //
          break;
        case 47:
          //
          break;
        case 48:
          //
          break;
        case 49:
          //
          break;

        case 50:
          //
          break;
        case 51:
          //
          break;
        case 52:
          //
          break;
        case 53:
          //
          break;
        case 54:
          //
          break;
        case 55:
          //
          break;
        case 56:
          //
          break;
        case 57:
          //
          break;
        case 58:
          //
          break;
        case 59:
          //
          break;
        case 60:
          //
          break;

        default:
          // console.log(message);

          break;
      }
    } else {
      console.log(message);
    }
  }

  public toggleMute() {
    this.writeToStream(`:w27=${this.settings.mute ? 0 : 1}.`);
    this.onMuteChangeEvent.next(!this.settings.mute);
  }

  public setWaveform(
    channel: 1 | 2,
    targetWaveform: "next" | "previous" | waveform
  ) {
    if (targetWaveform === "next") {
      this.writeToStream(
        `:w1${channel}=${
          channel === 1
            ? this.channel1.waveform + 1
            : this.channel2.waveform + 1
        }.`
      );
      this.onWaveformChangeEvent.next({
        channel: channel,
        waveform: this.channel2.waveform + 1
      });
    } else if (targetWaveform === "previous") {
      this.writeToStream(
        `:w1${channel}=${
          channel === 1
            ? this.channel1.waveform - 1
            : this.channel2.waveform - 1
        }.`
      );
      this.onWaveformChangeEvent.next({
        channel: channel,
        waveform: this.channel2.waveform - 1
      });
    } else {
      this.writeToStream(`:w1${channel}=${targetWaveform}.`);
      this.onWaveformChangeEvent.next({
        channel: channel,
        waveform: targetWaveform
      });
    }
  }

  public setFrequency(
    channel: 1 | 2,
    frequency: number,
    frequencyCategory: frequencyCategory
  ) {
    this.writeToStream(
      `:w1${channel === 1 ? 3 : 4}=${frequency},${frequencyCategory}.`
    );
    this.onFrequencyChangeEvent.next({
      channel: channel,
      frequency: frequency,
      frequencyCategory: frequencyCategory
    });
  }

  public setPhase(channel: 1 | 2, phase: number) {
    this.writeToStream(`:w2${channel}=${phase}.`);
    this.onPhaseChangeEvent.next({
      channel: channel,
      phase: phase
    });
  }

  public setOffset(channel: 1 | 2, offset: number) {
    this.writeToStream(`:w1${channel === 1 ? 7 : 8}=${offset}.`);
    this.onOffsetChangeEvent.next({
      channel: channel,
      offset: offset
    });
  }

  public setDuty(channel: 1 | 2, duty: number) {
    this.writeToStream(`:w${channel === 1 ? 19 : 20}=${duty}.`);
    this.onDutyChangeEvent.next({
      channel: channel,
      duty: duty
    });
  }

  public setAmplitude(channel: 1 | 2, amplitude: number) {
    this.writeToStream(`:w${channel === 1 ? 15 : 16}=${amplitude}.`);
    this.onAmplitudeChange.next({
      channel: channel,
      amplitude: amplitude
    });
  }

  public toggleOutput(channel: 1 | 2) {
    this.writeToStream(
      channel === 1
        ? `:w10=${this.channel1.outputEnabled ? 0 : 1},${
            this.channel2.outputEnabled ? 1 : 0
          }.`
        : `:w10=${this.channel1.outputEnabled ? 1 : 0},${
            this.channel2.outputEnabled ? 0 : 1
          }.`
    );
    this.onOutputChangeEvent.next({
      enabled1: this.channel1.outputEnabled,
      enabled2: this.channel2.outputEnabled
    });
  }
}
