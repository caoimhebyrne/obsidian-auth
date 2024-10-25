import { Obsidian, type ObsidianOptions } from "./obsidian";

export * from "./obsidian";
export * from "./random";
export * from "./session";

export const defaultObsidianOptions = {
    sessionLength: 32,
} satisfies Partial<ObsidianOptions>;

/**
 * The required options for {@link ObsidianOptions} to be complete if combined with {@link defaultObsidianOptions}.
 */
type RequiredObsidianOptions = Required<Omit<ObsidianOptions, keyof typeof defaultObsidianOptions>>;

/**
 * The options that can be passed to {@link createObsidian}, taking the {@link defaultObsidianOptions} into account,
 * while still allowing them to be overridden if required.
 */
type ObsidianOptionsWithDefaults = RequiredObsidianOptions & Partial<ObsidianOptions>;

/**
 * Creates an instance of {@link Obsidian}.
 *
 * @param options The options to build Obsidian with
 * @returns An instance of {@link Obsidian}
 */
export const createObsidian = (options: ObsidianOptionsWithDefaults): Obsidian => {
    return new Obsidian({ ...defaultObsidianOptions, ...options });
};
