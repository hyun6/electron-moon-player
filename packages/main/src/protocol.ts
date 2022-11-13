import { protocol } from 'electron';

export const LOCAL_FILE_PROTOCOL_NAME = 'safe-file-protocol';

// 로컬 파일 접근을 위한 protocol 등록
export const initProtocol = () => {
  protocol.registerFileProtocol(LOCAL_FILE_PROTOCOL_NAME, (request, callback) => {
    const url = request.url.replace(`${LOCAL_FILE_PROTOCOL_NAME}://`, '');
    console.log('protocol: ', url);
    try {
      return callback(decodeURIComponent(url));
    } catch (error) {
      console.error(error);
      return null;
    }
  });
};
