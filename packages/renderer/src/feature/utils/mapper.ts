import type { IAudioMetadata } from 'music-metadata-browser';
import { selectCover } from 'music-metadata-browser';
import type { TrackModel } from '../track/track.model';

export const trackMappingFromAudioMetadata = (
  track: TrackModel,
  audioMetaData: IAudioMetadata,
): TrackModel => {
  track.name = audioMetaData.common.title ?? track.source;
  const coverImg = selectCover(audioMetaData.common.picture);
  track.album = {
    id: '',
    name: audioMetaData.common.album ?? '',
    coverImg: coverImg ?? undefined,
    //coverImg: coverImg ? new Blob([coverImg.data]) : undefined, // Blob to img src not working
  };
  track.artist = audioMetaData.common.artist ?? '';
  return track;
};
