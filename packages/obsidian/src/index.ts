import type { Adapter } from "./adapter";
import type { AuthenticationStrategyFactories } from "./authentication-strategy";
import { Obsidian, type ObsidianOptions } from "./obsidian";

export * from "./adapter";
export * from "./authentication-strategy";
export * from "./obsidian";
export * from "./random";
export * from "./session";
export * from "./user";

export const defaultObsidianOptions = {
    sessionIdLength: 32,
} satisfies Partial<ObsidianOptions<AuthenticationStrategyFactories>>;

/**
 * The required options for {@link ObsidianOptions} to be complete if combined with {@link defaultObsidianOptions}.
 */
type RequiredObsidianOptions<A extends AuthenticationStrategyFactories> = Required<
    Omit<ObsidianOptions<A>, keyof typeof defaultObsidianOptions>
>;

/**
 * The options that can be passed to {@link createObsidian}, taking the {@link defaultObsidianOptions} into account,
 * while still allowing them to be overridden if required.
 */
type ObsidianOptionsWithDefaults<A extends AuthenticationStrategyFactories> = RequiredObsidianOptions<A> &
    Partial<ObsidianOptions<A>>;

/**
 * Creates an instance of {@link Obsidian}.
 *
 * @param options The options to build Obsidian with
 * @returns An instance of {@link Obsidian}
 */
export const createObsidian = <A extends AuthenticationStrategyFactories>(
    adapter: Adapter,
    options: ObsidianOptionsWithDefaults<A>,
): Obsidian<A> => {
    return new Obsidian(adapter, { ...defaultObsidianOptions, ...options });
};
