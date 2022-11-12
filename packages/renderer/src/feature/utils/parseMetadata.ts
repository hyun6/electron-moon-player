import type { IAudioMetadata } from 'music-metadata-browser';
import { parseBlob } from 'music-metadata-browser';

/**
 * 미디어 파일에서 메타 정보를 추출한다
 */
export const parseMetadataFromFile = async (file: File): Promise<IAudioMetadata | undefined> => {
  return new Promise((resolve, reject) => {
    const readStart = performance.now();
    const fileReader = new FileReader();
    fileReader.onload = async function (ev: ProgressEvent<FileReader>) {
      const readEnd = performance.now();
      console.log('readFile performance: ', readEnd - readStart);

      const fileArrayBuffer = ev.target?.result;
      if (!fileArrayBuffer) {
        reject('failed file buffer read');
      }

      const audioMetaData = await parseBlob(file);
      console.log(audioMetaData);
      resolve(audioMetaData);
    };
    fileReader.readAsArrayBuffer(file);
  });
};
