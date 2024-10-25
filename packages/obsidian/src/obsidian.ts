import { generateRandomId } from "./random";
import type { Session } from "./session";

export type ObsidianOptions = {
	/**
	 * The duration of a session in seconds.
	 */
	sessionDuration: number;

	/**
	 * The length of a session ID.
	 * 32 is the default value, and is also the recommended value.
	 */
	sessionLength: number;
};

export class Obsidian {
	/**
	 * The duration of a session in seconds.
	 */
	private sessionDuration: number;

	/**
	 * The length of a generated session ID.
	 */
	private sessionLength: number;

	public constructor(options: ObsidianOptions) {
		this.sessionDuration = options.sessionDuration;
		this.sessionLength = options.sessionLength;
	}

	/**
	 * Creates a {@link Session} for a specific user.
	 *
	 * @param user The ID of the user that session belongs to.
	 * @returns The created session object.
	 */
	public createSession(userId: string): Session {
		const expiresAt = new Date(Date.now() + this.sessionDuration * 1000);
		return { id: generateRandomId(this.sessionLength), userId, expiresAt };
	}
}
