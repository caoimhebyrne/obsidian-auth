/**
 * Generates a cryptographically secure random identifier of the specified length.
 *
 * @param length The length of the random identifier to generate.
 * @returns A string containing the cryptographically secure random identifier.
 */
export const generateRandomId = (length: number): string => {
    // The string is going to be of a certain length, since we are generating random bytes, and then hex encoding them,
    // the amount of bytes we generate is going to be half of the string's desired length.
    const bytes = new Uint8Array(length / 2);
    crypto.getRandomValues(bytes);

    return Buffer.from(bytes).toString("hex");
};
