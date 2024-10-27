# 👮 `obsidian-auth`

An opinionated authentication library for JavaScript.

## Usage

Obsidian can be used by calling the `createObsidian` function, it expects a parameter containing the options it needs
to provide authentication features.

**obsidian.ts**
```ts
import { postgresAdapter } from "@obsidian-auth/adapter-postgres";
import { createObsidian, passwordAuthentication } from "obsidian-auth";
import { myPostgresPool } from "./database";

export const obsidian = createObsidian(postgresAdapter(myPostgresPool), {
    // I would like my sessions to last for 2 weeks.
    sessionDuration: 14 * 24 * 60 * 60,

    // I would like to authenticate my users with a password (hashed via Argon2id).
    authenticationStrategies: [passwordAuthentication],
});
```

**index.ts**
```ts
import { obsidian } from "./obsidian";

// Creating a user with an authentication strategy.
const user = await obsidian.createUser("myuser", { strategy: "password", value: "MySuperSecurePassword" });
//    ^: { id: string }

// Authenticating a user through a configured authentication strategy.
const authenticatedUser = await obsidian.authenticate("myuser", "password", "BadPassword");
console.log(authenticatedUser) // null (the password is invalid!)

// Creating a session for a user.
const session = await obsidian.createSession("myuser");
//    ^ { sessionId: string, userId: string, ... }
```

## License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) license.