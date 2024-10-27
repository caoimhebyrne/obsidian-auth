import type { Adapter, Session, User } from "obsidian-auth";
import type { Client, Pool, PoolClient } from "pg";

type SessionSchema = {
    id: string;
    user_id: string;
    expires_at: Date;
};

type UserSchema = {
    id: string;
};

type AuthenticationValueSchema = {
    value: string;
};

/**
 * A PostgreSQL adpater for Obsidian.
 */
export class PostgresAdapter implements Adapter {
    private connection: PoolClient | Client | Pool;

    public constructor(connection: PoolClient | Client | Pool) {
        this.connection = connection;
    }

    public async getSessionById(id: string): Promise<Session | null> {
        const query = "select id, user_id, expires_at from sessions where id = $1";
        const values = [id];

        const result = await this.connection.query<SessionSchema>(query, values);
        const row = result.rows[0];
        if (!row) {
            return null;
        }

        return { id: row.id, userId: row.user_id, expiresAt: row.expires_at };
    }

    public async createSession(session: Session): Promise<void> {
        const query = "insert into sessions (id, user_id, expires_at) values ($1, $2, $3)";
        const values = [session.id, session.userId, session.expiresAt];

        await this.connection.query(query, values);
    }

    public async getUserById(id: string): Promise<User | null> {
        const query = "select id from users where id = $1";
        const values = [id];

        const result = await this.connection.query<UserSchema>(query, values);
        const row = result.rows[0];
        if (!row) {
            return null;
        }

        return { id: row.id };
    }

    public async createUser(user: User): Promise<void> {
        const query = "insert into users (id) values ($1)";
        const values = [user.id];

        await this.connection.query(query, values);
    }

    public async getAuthenticationValue(userId: string, authenticationStrategy: string): Promise<string | null> {
        const query = "select value from authentication where user_id = $1 and authentication_strategy_id = $2";
        const values = [userId, authenticationStrategy];

        const result = await this.connection.query<AuthenticationValueSchema>(query, values);
        const row = result.rows[0];
        if (!row) {
            return null;
        }

        return row.value;
    }

    public async storeAuthenticationValue(
        userId: string,
        authenticationStrategy: string,
        value: string,
    ): Promise<void> {
        const query = "insert into authentication (user_id, authentication_strategy_id, value) values ($1, $2, $3)";
        const values = [userId, authenticationStrategy, value];

        await this.connection.query(query, values);
    }
}

/**
 * A PostgreSQL adpater for Obsidian.
 */
export const postgresAdapter = (connection: PoolClient | Client | Pool) => new PostgresAdapter(connection);
