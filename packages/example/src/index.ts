import { postgresAdapter } from "@obsidian-auth/adapter-postgresql";
import { createObsidian, passwordAuthentication } from "obsidian-auth";
import pg from "pg";

// Create the connection pool.
const pool = new pg.Pool({
    database: "example_db",
    user: "obsidian",
    password: "obsidian",
});

// await pool.query(
//     "drop table sessions;" +
//         "drop table authentication;" +
//         "drop table users;" +
//         "create table users (id varchar(16) primary key);" +
//         "create table sessions (id varchar(32) primary key, user_id varchar(16) not null references users (id), expires_at timestamptz not null);" +
//         "create table authentication (user_id varchar(16) not null references users(id), authentication_strategy_id varchar(64) not null, value text not null, constraint authentication_pk primary key (user_id, authentication_strategy_id));",
// );

// Create an obsidian instance using a postgres adapter with our connection pool, and a session duration of two weeks.
const obsidian = createObsidian(postgresAdapter(pool), {
    sessionDuration: 14 * 24 * 60 * 60,
    authenticationStrategies: [passwordAuthentication],
});

const user = await obsidian.authenticate("caoimhe", "password", "MyAwesomePassword123");
if (!user) {
    throw "Incorrect username and/or password.";
}

console.log("authenticated user", user);

pool.end();
