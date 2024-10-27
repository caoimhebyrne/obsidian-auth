import { hash, verify } from "@node-rs/argon2";
import { AuthenticationStrategy, type AuthenticationStrategyFactory } from "./interface";

export class PasswordAuthenticationStrategy extends AuthenticationStrategy {
    public override async create(userId: string, value: string): Promise<void> {
        // 1. Hash the password using the Argon2 algorithm.
        const hashedValue = await hash(value);

        // 2. Store the hashed password in the adapter.
        await this.obsidian.adapter.storeAuthenticationValue(userId, "password", hashedValue);
    }

    public override async authenticate(userId: string, value: string): Promise<boolean> {
        // 1. Attempt to retrieve a hashed password from the adapter.
        const hashedValue = await this.obsidian.adapter.getAuthenticationValue(userId, "password");
        if (!hashedValue) {
            // 1a. The user has never used this strategy before.
            return false;
        }

        // 2. Verify that the hashed password matches the password provided.
        return await verify(hashedValue, value);
    }
}

export const passwordAuthentication: AuthenticationStrategyFactory<"password", PasswordAuthenticationStrategy> = {
    name: "password",
    factory: (obsidian) => new PasswordAuthenticationStrategy(obsidian),
};
