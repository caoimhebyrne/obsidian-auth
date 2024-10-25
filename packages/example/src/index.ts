import { postgresAdapter } from "@obsidian-auth/adapter-postgresql";
import { createObsidian } from "obsidian-auth";
import pg from "pg";

// Create the connection pool.
const pool = new pg.Pool({
    database: "example_db",
    user: "obsidian",
    password: "obsidian",
});

// await pool.query(
//     "drop table sessions; drop table users; create table users (id varchar(255) primary key); create table sessions (id varchar(32) primary key, user_id varchar(255) not null references users (id), expires_at timestamptz not null);",
// );

// Create an obsidian instance using a postgres adapter with our connection pool, and a session duration of two weeks.
const obsidian = createObsidian(postgresAdapter(pool), { sessionDuration: 14 * 24 * 60 * 60 });

// Create the user "caoimhe"
let user = await obsidian.getUserById("caoimhe");
if (!user) {
    user = await obsidian.createUser("caoimhe");
}

console.log("created / retrieved user", user);

// Create a session for the user "caoimhe".
const session = await obsidian.createSession(user.id);
console.log(`created a session! id: ${session.id}`);

// Retrieve the session we just created above.
const returnedSession = await obsidian.getSession(session.id);
console.log("retrieved session from db:", returnedSession);

// This is a single-run application, so we'll close the pool once we're done using
pool.end();
