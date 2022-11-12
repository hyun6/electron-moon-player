import type { IAudioMetadata } from 'music-metadata-browser';
import { parseBlob } from 'music-metadata-browser';

/**
 * 미디어 파일에서 메타 정보를 추출한다
 *  - TODO: 성능이 안나와서 rust로 tauri plugin 형태로 기능 제공 필요
 */
export const parseMetadataFromFile = async (): Promise<IAudioMetadata | undefined> => {
  // 리턴 값 void => true 버그 수정 후 적용 예정: https://github.com/tauri-apps/tauri/issues/5447
  // const isFileExists = await exists(filePath);
  // if (isFileExists === false) {
  //   return undefined;
  // }

  const readStart = performance.now();
  const fileByteArray = new Uint8Array(); //await readBinaryFile(filePath);
  if (fileByteArray.length === 0) {
    return undefined;
  }

  const readEnd = performance.now(); // 약 10초 소요
  console.log('readFile: ', readEnd - readStart);

  const parseStart = performance.now();
  const audioMetaData = await parseBlob(new Blob([fileByteArray]));
  const parseEnd = performance.now(); // 약 30ms 소요
  console.log('parseFile: ', parseEnd - parseStart);
  console.log(audioMetaData);
  return audioMetaData;
};
