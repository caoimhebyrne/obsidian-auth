import { createObsidian } from "obsidian";

const obsidian = createObsidian({ sessionDuration: 14 * 24 * 60 * 60 });
const session = obsidian.createSession("caoimhe");

console.log("my session is:", session);
