import { postgresAdapter } from "@obsidian-auth/adapter-postgresql";
import { createObsidian } from "obsidian-auth";
import pg from "pg";

// Create the connection pool.
const pool = new pg.Pool({
    database: "example_db",
    user: "obsidian",
    password: "obsidian",
});

// Create the sessions table.
// pool.query(
//     "create table if not exists sessions(id varchar(32) primary key, user_id varchar(16) not null, expires_at timestamptz not null);",
// );

// Create an obsidian instance using a postgres adapter with our connection pool, and a session duration of two weeks.
const obsidian = createObsidian(postgresAdapter(pool), { sessionDuration: 14 * 24 * 60 * 60 });

// Create a session for the user "caoimhe".
const session = await obsidian.createSession("caoimhe");
console.log(`created a session! id: ${session.id}`);

// Retrieve the session we just created above.
const returnedSession = await obsidian.getSession(session.id);
console.log("retrieved session from db:", returnedSession);

// This is a single-run application, so we'll close the pool once we're done using
pool.end();
