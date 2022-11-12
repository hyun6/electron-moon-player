import type { TrackModel } from '../track/track.model';

/**
 * 재생 모듈 상태
 *  - 재생 상태 관리를 위한 PlaybackState와 이름이 겹쳐서 헷갈리는데.. 이름 변경 고민 중;
 * 참고: https://developer.android.com/reference/android/media/MediaPlayer#state-diagram
 *  - 일단 모두 넣어보고 필요한 상태만 남길 예정
 */
export enum PlaybackModuleStatus {
  Idle,
  Init,
  Preparing,
  Prepared,
  Started,
  Paused,
  Stopped,
  Completed,
  End,
  Error,
}

/** Playback 상태 관리 객체 정의 */
export interface PlaybackStore {
  status: PlaybackModuleStatus;
  playingTrack?: TrackModel;
  isPlaying: boolean;
  isShuffle: boolean;
  currentTime: number;
  durationTime: number;
  volume: number; // 0~100
}
