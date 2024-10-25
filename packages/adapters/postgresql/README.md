# 🐘 `@obsidian-auth/adapter-postgresql`

A PostgreSQL adapter for [`obsidian-auth`](https://github.com/caoimhebyrne/obsidian-auth/).

## Usage

```ts
import { postgresAdapter } from "@obsidian-auth/adapter-postgres";
import { createObsidian } from "obsidian-auth";
import pg from "pg";

const pool = new pg.Pool({
    // options go here
});

export const obsidian = createObsidian(postgresAdapter(pool), {  sessionDuration: 14 * 24 * 60 * 60 });
```

## License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) license.