# 👮 `obsidian-auth`

An opinionated authentication library for JavaScript.

## Usage

Obsidian can be used by calling the `createObsidian` function, it expects a parameter containing the options it needs
to provide authentication features.

**obsidian.ts**
```ts
import { stubAdapter } from "@obsidian-auth/adapter-postgres"; // An adapter that does nothing.
import { createObsidian } from "obsidian-auth";

export const obsidian = createObsidian(stubAdapter(), {
    // I would like my sessions to last for 2 weeks.
    sessionDuration: 14 * 24 * 60 * 60
});
```

**index.ts**
```ts
import { obsidian } from "./obsidian";

const session = await obsidian.createSession("userabcd");
//    ^ { sessionId: string, userId: string, ... }
```

## License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) license.