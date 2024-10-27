import type { Adapter } from "./adapter";
import type { AuthenticationStrategyFactories } from "./authentication-strategy";
import { generateRandomId } from "./random";
import type { Session } from "./session";
import type { User } from "./user";

export type ObsidianOptions<A extends AuthenticationStrategyFactories> = {
    /**
     * The duration of a session in seconds.
     */
    sessionDuration: number;

    /**
     * The length of a session ID.
     * 32 is the default value, and is also the recommended value.
     */
    sessionIdLength: number;

    /**
     * The authentication strategies to use in this Obsidian instance.
     */
    authenticationStrategies: A;
};

export class Obsidian<A extends AuthenticationStrategyFactories> {
    /**
     * The adapter to use for persisting changes.
     */
    public adapter: Adapter;

    /**
     * The duration of a session in seconds.
     */
    private sessionDuration: number;

    /**
     * The length of a generated session ID.
     */
    private sessionIdLength: number;

    /**
     * The authentication strategies configured by the user.
     */
    private authenticationStrategies: A;

    public constructor(adapter: Adapter, options: ObsidianOptions<A>) {
        this.adapter = adapter;
        this.authenticationStrategies = options.authenticationStrategies;
        this.sessionDuration = options.sessionDuration;
        this.sessionIdLength = options.sessionIdLength;
    }

    /**
     * Attempts to authenticate the provided user ID with a certain strategy.
     *
     * @param userId The ID of the user to authenticate.
     * @param authenticationStrategy The name of the authentication strategy to use.
     * @param value The value to authenticate with.
     *
     * @returns The user if the authenticationStrategy permits the provided value, otherwise null.
     */
    public async authenticate(
        userId: string,
        authenticationStrategy: A[number]["name"],
        value: string,
    ): Promise<User | null> {
        // This should technically always have a value if using TypeScript, so it would be better if we could "strongly"
        // type this somehow?
        const strategy = this.authenticationStrategies.find((it) => it.name === authenticationStrategy);
        if (!strategy) {
            throw `Failed to find strategy by name '${authenticationStrategy}'`;
        }

        // Once we find the strategy factory, we can construct an instance and attempt to authenticate the user.
        const instance = strategy.factory(this);
        const authenticated = await instance.authenticate(userId, value);
        if (!authenticated) {
            return null;
        }

        // The authentication strategy has authenticated the user, we can return the user object.
        return await this.getUserById(userId);
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
    public async createUser(
        userId: string,
        authentication?: { strategy: A[number]["name"]; value: string },
    ): Promise<User> {
        const user: User = { id: userId };
        await this.adapter.createUser(user);

        if (authentication) {
            // This should technically always have a value if using TypeScript, so it would be better if we could "strongly"
            // type this somehow?
            const strategy = this.authenticationStrategies.find((it) => it.name === authentication.strategy);
            if (!strategy) {
                throw `Failed to find strategy by name '${authentication.strategy}'`;
            }

            const instance = strategy.factory(this);
            await instance.create(userId, authentication?.value);
        }

        return user;
    }
}
