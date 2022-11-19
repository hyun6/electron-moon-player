import { proxy, useSnapshot } from 'valtio';
import { subscribeKey } from 'valtio/utils';
import type { PlaybackStore } from './playback.model';
import { PlaybackModuleStatus } from './playback.model';
import { playbackService } from './playback.service';

const logger = console.log;

/** 상태 초기 값 */
const initState: PlaybackStore = {
  status: PlaybackModuleStatus.Idle,
  isPlaying: false,
  isShuffle: false,
  currentTime: 0,
  durationTime: 0,
  volumePercentage: 30, // percentage: 0 ~ 100
};

/**
 * playback 상태를 갖는 proxy 객체
 *
 * 상태 변경 시 일단 actions를 따로 두지 않고 심플하게 직접 상태를 변경한다
 *  - 필요하다고 판단될 때 actions 추가 예정
 */
export const playbackStore = proxy<PlaybackStore>(initState);

export function usePlaybackState() {
  const snapshot = useSnapshot(playbackStore);
  return snapshot;
}

/**
 * playback state change event handler
 */
subscribeKey(playbackStore, 'status', (status: PlaybackModuleStatus) => {
  logger('playback state changed: ', status);
  switch (status) {
    case PlaybackModuleStatus.Prepared: {
      playbackStore.playingTrack = playbackService.getPlayingTrack();
      playbackStore.durationTime = playbackService.getDuration();
      break;
    }
    case PlaybackModuleStatus.Started: {
      playbackStore.isPlaying = true;
      break;
    }
    case PlaybackModuleStatus.Paused: {
      playbackStore.isPlaying = false;
      break;
    }
    case PlaybackModuleStatus.End: {
      playbackStore.isPlaying = false;
      playbackStore.currentTime = 0;
      playbackStore.playingTrack = undefined;

      // TODO: play next track
      playbackService.close();
      break;
    }
    default: {
      break;
    }
  }
});
