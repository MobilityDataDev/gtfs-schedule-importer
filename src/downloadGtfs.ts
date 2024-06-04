import { WriteStream, createWriteStream } from 'fs';
import https from 'https';

export const downloadGtfs = async (
  sourceUrl: string,
  targetFilename: string
): Promise<void> => {
  const fileWriteStream: WriteStream = createWriteStream(
    `downloads/${targetFilename}.zip`
  );

  return new Promise((resolve, reject) =>
    download(sourceUrl, fileWriteStream, resolve, reject)
  );
};

const download = (
  sourceUrl: string,
  fileWriteStream: WriteStream,
  resolve: (value: void | PromiseLike<void>) => void,
  reject: (reason?: any) => void
): void => {
  https
    .get(sourceUrl, (response) => {
      const redirectUrl = response.headers?.location;

      if (response.statusCode === 200) {
        response.pipe(fileWriteStream);

        fileWriteStream.on('finish', () => {
          console.log('GTFS file download completed:', fileWriteStream.path);
          fileWriteStream.close();
          resolve();
        });
      } else if (response.statusCode === 302 && redirectUrl) {
        console.log('Download redirected to:', redirectUrl);
        return download(redirectUrl, fileWriteStream, resolve, reject);
      } else {
        throw new Error(`Unsupported response code: ${response.statusCode}.`);
      }
    })
    .on('error', (error) => {
      console.log(error);
      reject(error);
    });
};
