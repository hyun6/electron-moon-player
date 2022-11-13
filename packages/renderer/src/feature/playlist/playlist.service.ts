import { newTrack } from '../track/track.func';
import type { TrackModel } from '../track/track.model';
import { trackMappingFromAudioMetadata } from '../utils/mapper';
import { parseMetadataFromFile } from '../utils/parseMetadata';
import { playlistStore } from './playlist.store';
import { LOCAL_FILE_PROTOCOL_NAME } from '#preload';

class PlaylistService {
  constructor() {
    this._initEvent();
  }

  add(track: TrackModel) {
    console.log('add: ', track);
    playlistStore.trackList.push(track);
  }

  async addLocalFileList(fileList: File[]) {
    for (const file of fileList) {
      const metadata = await parseMetadataFromFile(file);
      if (metadata) {
        const filePath = (file as any)?.path;
        console.log('file: ', file);
        console.log('source: ', filePath);
        const track = newTrack({ source: `${LOCAL_FILE_PROTOCOL_NAME}://${filePath}` });
        const trackWithMeta = trackMappingFromAudioMetadata(track, metadata);
        this.add(trackWithMeta);
      }
    }
  }

  private _initEvent() {
    // tauriListener.onFileDropEvent(async (filePaths: string[]) => {
    //   console.log('filePath: ', filePaths);
    //   // TODO: add to playlist as local file
    //   this.addLocalFileList(filePaths);
    // });
  }
}

export const playlistService = new PlaylistService();
