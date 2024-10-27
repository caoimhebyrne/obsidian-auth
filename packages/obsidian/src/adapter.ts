import type { Session } from "./session";
import type { User } from "./user";

export interface Adapter {
    /**
     * Retrieves a {@link Session} by its ID.
     *
     * @param id The session ID to retrieve.
     * @returns The session if it exists, otherwise null.
     */
    getSessionById(id: string): Promise<Session | null>;

    /**
     * Instructs the adapter to store the provided {@link session} in its underlying storage provider.
     * @param session The session to create.
     */
    createSession(session: Session): Promise<void>;

    /**
     * Retrieves a {@link User} by its ID.
     *
     * @param id The user ID to retrieve.
     * @returns The user if it exists, otherwise null.
     */
    getUserById(id: string): Promise<User | null>;

    /**
     * Instructs the adapter to store the provided {@link user} in its underlying storage provider.
     * @param user The user to create.
     */
    createUser(user: User): Promise<void>;

    /**
     * Retrieves an authentication value for a specific user and strategy.
     *
     * @param userId The user to fetch the value for.
     * @param authenticationStrategy The strategy to fetch the value for.
     * @returns The value if it exists, otherwise null.
     */
    getAuthenticationValue(userId: string, authenticationStrategy: string): Promise<string | null>;

    /**
     * Instructs the adapter to store the provided value for authentication in its underlying storage provider.
     *
     * @param userId The user to store the value for.
     * @param authenticationStrategy The name of this authentication strategy.
     * @param value The value to store.
     */
    storeAuthenticationValue(userId: string, authenticationStrategy: string, value: string): Promise<void>;
}
