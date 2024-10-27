import type { Obsidian } from "../obsidian";

export type AuthenticationStrategyFactories = readonly AuthenticationStrategyFactory<string, AuthenticationStrategy>[];

export type AuthenticationStrategyFactory<N extends string, T extends AuthenticationStrategy> = {
    name: N;
    factory: (obsidian: Obsidian<AuthenticationStrategyFactories>) => T;
};

export abstract class AuthenticationStrategy {
    protected obsidian: Obsidian<AuthenticationStrategyFactories>;

    public constructor(obsidian: Obsidian<AuthenticationStrategyFactories>) {
        this.obsidian = obsidian;
    }

    /**
     * Attempts to create a strategy link for the provided {@link userId} under this authentication strategy.
     *
     * @param userId The user to create the link to.
     * @param value The secret to link with.
     */
    public abstract create(userId: string, value: string): Promise<void>;

    /**
     * Attempts to authenticate the provided {@link userId} under this authentication strategy.
     *
     * @param userId The user to authenticate.
     * @param value The secret to authenticate with.
     * @returns Whether this user is authenticated under this strategy or not.
     */
    public abstract authenticate(userId: string, value: string): Promise<boolean>;
}
