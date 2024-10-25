import type { Adapter } from "./adapter";
import { generateRandomId } from "./random";
import type { Session } from "./session";
import type { User } from "./user";

export type ObsidianOptions = {
    /**
     * The duration of a session in seconds.
     */
    sessionDuration: number;

    /**
     * The length of a session ID.
     * 32 is the default value, and is also the recommended value.
     */
    sessionIdLength: number;
};

export class Obsidian {
    /**
     * The adapter to use for persisting changes.
     */
    private adapter: Adapter;

    /**
     * The duration of a session in seconds.
     */
    private sessionDuration: number;

    /**
     * The length of a generated session ID.
     */
    private sessionIdLength: number;

    public constructor(adapter: Adapter, options: ObsidianOptions) {
        this.adapter = adapter;
        this.sessionDuration = options.sessionDuration;
        this.sessionIdLength = options.sessionIdLength;
    }

    /**
     * Retrieves a {@link Session} by its unique id.
     *
     * @param id The ID of the session to retrieve.
     * @return The session if it exists, otherwise null.
     */
    public async getSession(id: string): Promise<Session | null> {
        return this.adapter.getSessionById(id);
    }

    /**
     * Creates a {@link Session} for a specific user.
     *
     * @param user The ID of the user that session belongs to.
     * @returns The created session object.
     */
    public async createSession(userId: string): Promise<Session> {
        const expiresAt = new Date(Date.now() + this.sessionDuration * 1000);
        const session = { id: generateRandomId(this.sessionIdLength), userId, expiresAt };

        // Before we can return the session, we should store it through the adapter.
        await this.adapter.createSession(session);

        return session;
    }

    /**
     * Retrieves a {@link User} by its unique id.
     *
     * @param id The ID of the user to retrieve.
     * @return The user if it exists, otherwise null.
     */
    public getUserById(id: string): Promise<User | null> {
        return this.adapter.getUserById(id);
    }

    /**
     * Creates a {@link User}.
     * @returns The created user object.
     */
    public async createUser(userId: string): Promise<User> {
        const user: User = { id: userId };
        await this.adapter.createUser(user);

        return user;
    }
}
