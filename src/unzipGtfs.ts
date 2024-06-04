import yauzl from 'yauzl';
import { existsSync, mkdirSync, createWriteStream } from 'fs';
import { deleteFile } from './deleteFileOrDirectory';

export const unzipGtfs = async (sourceFilename: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const sourceFile = `downloads/${sourceFilename}.zip`;
    const destinationPath = `downloads/${sourceFilename}/`;

    if (!existsSync(destinationPath)) {
      mkdirSync(destinationPath);
    }

    yauzl.open(sourceFile, { lazyEntries: true }, (error, zipfile) => {
      if (error) {
        console.log(error);
        reject(error);
      }

      zipfile.readEntry();

      zipfile.on('entry', (entry) => {
        zipfile.openReadStream(entry, (error, readStream) => {
          if (error) {
            console.log(error);
            reject(error);
          }
          readStream.on('end', () => {
            zipfile.readEntry();
          });
          readStream.pipe(
            createWriteStream(`${destinationPath}${entry.fileName}`)
          );
        });
      });

      zipfile.on('end', async () => {
        console.log('GTFS files unzipped:', destinationPath);
        await deleteFile(sourceFile);
        resolve();
      });
    });
  });
};
