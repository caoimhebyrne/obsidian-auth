# 👮 `obsidian`

> [!WARNING]
> This library is still in development and is not published anywhere (yet).

An opinionated authentication library for JavaScript.

## Usage

Obsidian can be used by calling the `createObsidian` function, it expects a parameter containing the options it needs
to provide authentication features.

**obsidian.ts**
```ts
import { stubAdapter } from "@obsidian/adapter-stub"; // An adapter that does nothing.
import { createObsidian } from "obsidian";

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

## Why another auth library?

I've decided to create my own authentication library, primarily out of boredom, but also as something that I want to
use and maintain.

Most people want to manage their authentication in some form, either by creating it themselves, or by using another
library that does it for them. Previously, people used libraries like Lucia for this, but since its deprecation, not
many options have been available.

I'm not a fan of "authentication as a service" providers, as you're just letting a company a) charge you for
something you can do yourself, and b) be in control of your users' data.

## License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) license.