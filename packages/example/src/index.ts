import { stubAdapter } from "@obsidian/adapter-stub";
import { createObsidian } from "obsidian";

const obsidian = createObsidian(stubAdapter(), { sessionDuration: 14 * 24 * 60 * 60 });
const session = await obsidian.createSession("caoimhe");

console.log(`created a session! id: ${session.id}`);
