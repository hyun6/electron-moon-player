export interface IPlaybackModule {
  open(sourceUrl: string): Promise<boolean>;
  play(msPosition?: number): void;
  pause(): void;
  resume(): void;
  close(): void;
  seek(msPosition: number): void;
  volume(percentage: number): void;
  mute(): void;
  getDuration(): number;
}
