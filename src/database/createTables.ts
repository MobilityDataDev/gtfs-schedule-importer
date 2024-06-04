import { agency } from '../models/agency';
import { calendar_date } from '../models/calendar_date';
import { calendar } from '../models/calendar';
import { feed_info } from '../models/feed_info';
import { route } from '../models/route';
import { stop_time } from '../models/stop_time';
import { stop } from '../models/stop';
import { transfer } from '../models/transfer';
import { trip } from '../models/trip';
import { getDatabasePool } from './getDatabasePool';

export const createTables = async () => {
  try {
    const models: { [filename: string]: {} } = {
      agency,
      calendar_date,
      calendar,
      feed_info,
      route,
      stop_time,
      stop,
      transfer,
      trip
    };

    const pool = getDatabasePool();

    const queries = Object.keys(models).map((modelName) => {
      const properties = Object.keys(models[modelName]).map((propertyName) => {
        return `"${propertyName}" VARCHAR(255)`;
      });
      const tableName =
        modelName === 'agency' ? 'agencies' : modelName.replace(/s?$/, 's');
      return `
        DROP TABLE IF EXISTS "${tableName}";
        CREATE TABLE "${tableName}" (${properties.join(',\n')});
      `;
    });

    await pool.query(queries.join('\n'));

    console.log('Database tables created.');
  } catch (error) {
    console.log(error);
    throw error;
  }
};
