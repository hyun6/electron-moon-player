import type { IPlaybackModule } from '../playback.interface';
import { PlaybackModuleStatus } from '../playback.model';
import { playbackStore } from '../playback.store';

const logger = console.log;

export class HtmlPlaybackModule implements IPlaybackModule {
  private _playbackModule: HTMLAudioElement = new Audio();

  constructor() {
    this._initPlaybackEventListener();
  }

  // TODO: for multiple playback module, state changed handler logic is hold by playbackStore
  private _initPlaybackEventListener(): void {
    this._playbackModule.addEventListener('timeupdate', () => {
      logger('event:timeupdate');
      playbackStore.currentTime = this._playbackModule.currentTime;
    });

    this._playbackModule.addEventListener('canplay', () => {
      logger('event:canplay');
      playbackStore.status = PlaybackModuleStatus.Prepared;
    });

    this._playbackModule.addEventListener('play', () => {
      logger('event:play');
      playbackStore.status = PlaybackModuleStatus.Started;
    });

    this._playbackModule.addEventListener('pause', () => {
      logger('event:pause');
      playbackStore.status = PlaybackModuleStatus.Paused;
    });

    this._playbackModule.addEventListener('ended', () => {
      logger('event:ended');
      playbackStore.status = PlaybackModuleStatus.End;
    });

    this._playbackModule.addEventListener('volumechange', () => {
      logger('event:volumeChange');
    });

    this._playbackModule.addEventListener('durationchange', () => {
      logger('event:durationChange');
      playbackStore.durationTime = this._playbackModule.duration;
    });
  }

  async open(sourceUrl: string): Promise<boolean> {
    // TODO: local file exist check, if sourceUrl has ${LOCAL_FILE_PROTOCOL_NAME}
    this._playbackModule.src = sourceUrl;

    logger('open src: ', this._playbackModule.src);
    this._playbackModule.load();
    return true;
  }

  play(secPosition?: number | undefined): void {
    logger('play');
    if (secPosition) {
      this.seek(secPosition);
    }
    this._playbackModule.play();
  }

  pause(): void {
    logger('pause');
    this._playbackModule.pause();
  }

  resume(): void {
    logger('resume');
    this._playbackModule.play();
  }

  close(): void {
    this._playbackModule.pause();
    this._playbackModule.src = '';
  }

  seek(secPosition: number): void {
    logger('seek: ', secPosition);
    this._playbackModule.currentTime = secPosition;
  }

  volume(percentage: number): void {
    // - https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/volume
    // - 0 ~ 1 범위로 설정
    // - in macos 0.1 volume is so loud, so change range range 0~1 to 0~0.1
    this._playbackModule.volume = percentage / 1000;
    this._playbackModule.muted = percentage === 0;
    logger('volume: ', this._playbackModule.volume);
  }

  mute(): void {
    this._playbackModule.muted = true;
  }

  getDuration(): number {
    return this._playbackModule.duration;
  }
}
