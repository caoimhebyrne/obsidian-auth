export interface Session {
    // A unique identifier for this session object.
    id: string;

    // The user ID that this session belongs to.
    userId: string;

    // The timestamp that this session expires at.
    expiresAt: Date;
}
