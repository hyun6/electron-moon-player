import type { TrackId, TrackModel } from '../track/track.model';

/** Playlist 상태 정의 */
export interface PlaylistStore {
  trackList: TrackModel[];
  isSelectedRepeat: boolean;
  currentTrackId?: TrackId;
}
