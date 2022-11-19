import type { IPlaybackModule } from './playback.interface';
import { HtmlPlaybackModule } from './playbackModuleImpl/playback.html';
import type { TrackId, TrackModel } from '../track/track.model';
import { selectTrackById } from '../playlist/playlist.store';
import type { DebouncedFunc } from 'lodash';
import _ from 'lodash';

// proxy state를 class 내부에 두려고 했으나
// state 변경 시 에러 발생 등의 이유로 state와 class(actions)로 분리
// - https://github.com/pmndrs/valtio/wiki/How-to-organize-actions
class PlaybackService {
  private _playbackModule: IPlaybackModule;
  private _playingTrack?: TrackModel;
  private _volumeThrottleFunc: DebouncedFunc<(percentage: number) => void>;

  constructor(playbackModule: IPlaybackModule) {
    this._playbackModule = playbackModule;

    this._volumeThrottleFunc = _.throttle((percentage: number) => {
      this._playbackModule.volume(percentage);
    }, 100);
  }

  getPlayingTrack(): TrackModel | undefined {
    return this._playingTrack;
  }

  async open(trackId: TrackId): Promise<boolean> {
    const track = selectTrackById(trackId);
    if (track?.source === undefined) {
      return false;
    }
    const ok = await this._playbackModule.open(track.source);
    if (ok) {
      this._playingTrack = track;
    }
    return ok;
  }

  play(secPosition?: number): void {
    if (this._playingTrack) {
      this._playbackModule.play(secPosition);
    }
  }

  pause(): void {
    this._playbackModule.pause();
  }

  resume(): void {
    this._playbackModule.resume();
  }

  close(): void {
    this._playbackModule.close();
    this._playingTrack = undefined;
  }

  seek(secPosition: number): void {
    this._playbackModule.seek(secPosition);
  }

  volume(percentage: number): void {
    this._volumeThrottleFunc(percentage);
  }

  mute(): void {
    this._playbackModule.mute();
  }

  getDuration(): number {
    return this._playbackModule.getDuration();
  }
}

export const playbackService = new PlaybackService(new HtmlPlaybackModule());
