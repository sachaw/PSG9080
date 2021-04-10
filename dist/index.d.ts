import { Subject } from "rxjs";
import { frequencyCategory, waveform } from "./types";
export * from "./types";
export declare class PSG9080 {
    private port;
    private versions;
    private serial;
    private settings;
    private channel1;
    private channel2;
    private reader;
    private inputDone;
    private outputDone;
    private inputStream;
    private outputStream;
    constructor();
    readonly onFrequencyChangeEvent: Subject<{
        channel: 1 | 2;
        frequency: number;
        frequencyCategory: frequencyCategory;
    }>;
    readonly onOutputChangeEvent: Subject<{
        enabled1: boolean;
        enabled2: boolean;
    }>;
    readonly onWaveformChangeEvent: Subject<{
        channel: 1 | 2;
        waveform: waveform;
    }>;
    readonly onMuteChangeEvent: Subject<boolean>;
    readonly onDeviceReadyChangeEvent: Subject<boolean>;
    readonly onOffsetChangeEvent: Subject<{
        channel: 1 | 2;
        offset: number;
    }>;
    readonly onDutyChangeEvent: Subject<{
        channel: 1 | 2;
        duty: number;
    }>;
    readonly onPhaseChangeEvent: Subject<{
        channel: 1 | 2;
        phase: number;
    }>;
    readonly onFirmwareChangeEvent: Subject<{
        hardware: number;
        firmware: number;
        fpga: number;
    }>;
    readonly onBrightnessChangeEvent: Subject<number>;
    readonly onSerialChangeEvent: Subject<number>;
    readonly onAmplitudeChange: Subject<{
        channel: 1 | 2;
        amplitude: number;
    }>;
    private readLoop;
    private writeToStream;
    disconnect(): Promise<void>;
    connect(): Promise<void>;
    getDataLoop(): void;
    handleSerialMessage(message: string): void;
    toggleMute(): void;
    setWaveform(channel: 1 | 2, targetWaveform: "next" | "previous" | waveform): void;
    setFrequency(channel: 1 | 2, frequency: number, frequencyCategory: frequencyCategory): void;
    setPhase(channel: 1 | 2, phase: number): void;
    setOffset(channel: 1 | 2, offset: number): void;
    setDuty(channel: 1 | 2, duty: number): void;
    setAmplitude(channel: 1 | 2, amplitude: number): void;
    toggleOutput(channel: 1 | 2): void;
}
