import { proxy, useSnapshot } from 'valtio';
import type { TrackId, TrackModel } from '../track/track.model';
import type { PlaylistStore } from './playlist.model';

/** Playlist 초기 상태 */
const initState = {
  trackList: [],
  isSelectedRepeat: false,
};

/** Playlist 상태 데이터 */
export const playlistStore = proxy<PlaylistStore>(initState);

/** React hook */
export function usePlaylistState() {
  const snapshot = useSnapshot(playlistStore);
  return snapshot;
}

/**
 * id로 Track 조회
 * @param trackId
 * @returns
 */
export const selectTrackById = (trackId: TrackId): TrackModel | undefined => {
  return playlistStore.trackList.find(track => track.id === trackId);
};
