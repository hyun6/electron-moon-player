//import { tauriListener } from '../../tauri/listener';
import { newTrack } from '../track/track.func';
import type { TrackModel } from '../track/track.model';
//import { trackMappingFromAudioMetadata } from '../utils/mapper';
//import { parseMetadataFromFile } from '../utils/parseMetadata';
import { playlistStore } from './playlist.store';

class PlaylistService {
  constructor() {
    this._initEvent();
  }

  add(track: TrackModel) {
    playlistStore.trackList.push(track);
  }

  async addLocalFileList(filePaths: string[]) {
    for (const filePath of filePaths) {
      const metadata = {}; //= await parseMetadataFromFile(filePath);
      if (metadata) {
        const track = newTrack({ source: filePath });
        // trackMappingFromAudioMetadata(track, metadata);
        this.add(track);
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
