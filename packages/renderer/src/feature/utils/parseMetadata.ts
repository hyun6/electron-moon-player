import type { IAudioMetadata } from 'music-metadata-browser';
import { parseBlob } from 'music-metadata-browser';

/**
 * 미디어 파일에서 메타 정보를 추출한다
 */
export const parseMetadataFromFile = async (file: File): Promise<IAudioMetadata | undefined> => {
  const audioMetaData = await parseBlob(file);
  console.log(audioMetaData);
  return audioMetaData;
};
