import type { Adapter, Session } from "obsidian";
import type { Pool } from "pg";

type SessionSchema = {
    id: string;
    user_id: string;
    expires_at: Date;
};

/**
 * A PostgreSQL adpater for Obsidian.
 */
export class PostgresAdapter implements Adapter {
    private connectionPool: Pool;

    public constructor(connectionPool: Pool) {
        this.connectionPool = connectionPool;
    }

    public async getSessionById(id: string): Promise<Session | null> {
        const query = "select id, user_id, expires_at from sessions where id = $1";
        const values = [id];

        const result = await this.connectionPool.query<SessionSchema>(query, values);
        const row = result.rows[0];
        if (!row) {
            return null;
        }

        return { id: row.id, userId: row.user_id, expiresAt: row.expires_at };
    }

    public async createSession(session: Session): Promise<void> {
        const query = "insert into sessions (id, user_id, expires_at) values ($1, $2, $3)";
        const values = [session.id, session.userId, session.expiresAt];

        await this.connectionPool.query(query, values);
    }
}

/**
 * A PostgreSQL adpater for Obsidian.
 */
export const postgresAdapter = (pool: Pool) => new PostgresAdapter(pool);
