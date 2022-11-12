import { nanoid } from 'nanoid';
import type { TrackModel } from './track.model';

export const newTrack = (trackInfo?: Omit<Partial<TrackModel>, 'id'>): TrackModel => {
  return {
    ...trackInfo,
    id: nanoid(),
  };
};
