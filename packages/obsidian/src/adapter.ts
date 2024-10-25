import type { Session } from "./session";

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
}
