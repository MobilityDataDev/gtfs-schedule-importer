import { downloadGtfs } from './downloadGtfs';
import { unzipGtfs } from './unzipGtfs';
import { createTables } from './database/createTables';
import { importGtfs } from './importGtfs';

const app = async (): Promise<void> => {
  const sourceUrl =
    'https://opentransportdata.swiss/fr/dataset/timetable-2024-gtfs2020/permalink';
  const zipFilename = 'gtfsSwitzerland';

  await downloadGtfs(sourceUrl, zipFilename);
  await unzipGtfs(zipFilename);
  await createTables();
  await importGtfs(zipFilename);

  console.log('GTFS successfully imported.');
};

app();
