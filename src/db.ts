import { Pool } from 'pg'

const connectionString = 'postgres://ekgdntpq:ICCJL6M4VuMsjnXFn7U05QbxOTAzN5bV@kesavan.db.elephantsql.com/ekgdntpq';

const db = new Pool({
  connectionString
})

export default db
