import type { Adapter, Session } from "obsidian-auth";

/**
 * A stub adpater for Obsidian.
 * This adapter does nothing except log the requested changes to the console.
 */
export class StubAdapter implements Adapter {
    public getSessionById(id: string): Promise<Session | null> {
        console.log("stub: get session", id);
        return Promise.resolve(null);
    }

    public createSession(session: Session): Promise<void> {
        console.log("stub: create session", session);
        return Promise.resolve();
    }
}

/**
 * A stub adpater for Obsidian.
 * This adapter does nothing except log the requested changes to the console.
 */
export const stubAdapter = () => new StubAdapter();
