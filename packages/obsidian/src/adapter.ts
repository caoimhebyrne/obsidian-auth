import type { Session } from "./session";

export interface Adapter {
    /**
     * Instructs the adapter to store the provided {@link session} in its underlying storage provider.
     * @param session The session to create.
     */
    createSession(session: Session): Promise<void>;
}
