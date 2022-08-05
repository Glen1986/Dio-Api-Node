import { Pool } from 'pg'

const connectionString = 'postgres://ekgdntpq:ICCJL6M4VuMsjnXFn7U05QbxOTAzN5bV@kesavan.db.elephantsql.com/ekgdntpq';

const db = new Pool({
  connectionString
  // host: 'localhost',
  // user: 'database-user',
  // max: 20,
  // idleTimeoutMillis: 30000,
  // connectionTimeoutMillis: 2000,
})

export default db
