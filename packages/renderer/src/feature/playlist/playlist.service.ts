import { newTrack } from '../track/track.func';
import type { TrackModel } from '../track/track.model';
import { trackMappingFromAudioMetadata } from '../utils/mapper';
import { parseMetadataFromFile } from '../utils/parseMetadata';
import { playlistStore } from './playlist.store';

class PlaylistService {
  constructor() {
    this._initEvent();
  }

  add(track: TrackModel) {
    playlistStore.trackList.push(track);
  }

  async addLocalFileList(fileList: File[]) {
    for (const file of fileList) {
      const metadata = await parseMetadataFromFile(file);
      if (metadata) {
        console.log(file);
        const track = newTrack({ source: file.webkitRelativePath ?? (file as any)?.path });
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
