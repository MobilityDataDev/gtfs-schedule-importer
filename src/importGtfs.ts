import { getDatabasePool } from './database/getDatabasePool';
import { readdirSync, ReadStream, createReadStream } from 'fs';
import { CopyStreamQuery, from } from 'pg-copy-streams';
import { pipeline } from 'node:stream/promises';
import { deleteDirectory, deleteFile } from './deleteFileOrDirectory';

export const importGtfs = async (zipFilename: string): Promise<void> => {
  const pool = getDatabasePool();
  const client = await pool.connect();

  const directory = `downloads/${zipFilename}`;
  const filenames = readdirSync(directory);

  await Promise.all(
    filenames.map(async (filename): Promise<void> => {
      const filepath = `${directory}/${filename}`;
      const tableName =
        filename === 'agency.txt'
          ? 'agencies'
          : filename.replace(/s?\.txt$/, 's');

      const fileReadStream: ReadStream = createReadStream(filepath);
      const databaseWriteStream: CopyStreamQuery = client.query(
        from(`
          COPY "${tableName}"
          FROM STDIN
          DELIMITER ','
          CSV HEADER
        ;`)
      );

      await pipeline(fileReadStream, databaseWriteStream);

      fileReadStream.close();
      console.log('Imported file:', filename);
      await deleteFile(filepath);
    })
  );

  deleteDirectory(directory);
};
