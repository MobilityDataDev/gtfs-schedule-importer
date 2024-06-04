import { unlink } from 'fs/promises';
import { rmdirSync } from 'fs';

export const deleteFile = async (filepath: string): Promise<void> => {
  try {
    await unlink(filepath);
    console.log('Deleted file:', filepath);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteDirectory = (directoryPath: string): void => {
  try {
    rmdirSync(directoryPath);
    console.log('Deleted directory:', directoryPath);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
