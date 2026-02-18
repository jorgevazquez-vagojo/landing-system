// ---------------------------------------------------------------------------
// AES-256-GCM encryption / decryption
// ---------------------------------------------------------------------------

import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

/**
 * Algorithm used for symmetric encryption.
 */
const ALGORITHM = 'aes-256-gcm';

/**
 * IV length in bytes (96 bits is the recommended length for GCM).
 */
const IV_LENGTH = 12;

/**
 * Auth tag length in bytes.
 */
const AUTH_TAG_LENGTH = 16;

/**
 * Encrypted payload format:
 *   `<iv-hex>:<authTag-hex>:<ciphertext-hex>`
 */
const SEPARATOR = ':';

/**
 * Resolve the 256-bit encryption key from the `ENCRYPTION_KEY` environment variable.
 *
 * The key must be exactly 32 bytes. It can be provided as:
 *   - A 64-character hex string
 *   - A 32-character raw UTF-8 string
 *
 * @throws If the environment variable is missing or the wrong length.
 */
function getKey(): Buffer {
  const raw = process.env.ENCRYPTION_KEY;

  if (!raw) {
    throw new Error(
      'ENCRYPTION_KEY environment variable is not set. ' +
      'Provide a 64-character hex string or a 32-byte key.',
    );
  }

  // Try hex first (64 hex chars = 32 bytes)
  if (/^[0-9a-fA-F]{64}$/.test(raw)) {
    return Buffer.from(raw, 'hex');
  }

  // Fall back to raw UTF-8 bytes
  const buf = Buffer.from(raw, 'utf8');
  if (buf.length !== 32) {
    throw new Error(
      `ENCRYPTION_KEY must be exactly 32 bytes (got ${buf.length}). ` +
      'Provide a 64-character hex string or a 32-byte UTF-8 string.',
    );
  }

  return buf;
}

/**
 * Encrypt a plaintext string using AES-256-GCM.
 *
 * @param text - The plaintext to encrypt.
 * @returns The encrypted payload as a colon-separated string of hex values:
 *          `<iv>:<authTag>:<ciphertext>`.
 *
 * @throws If `ENCRYPTION_KEY` is missing or invalid.
 *
 * @example
 * ```ts
 * const encrypted = encrypt('sensitive data');
 * // "a1b2c3...:d4e5f6...:789abc..."
 * ```
 */
export function encrypt(text: string): string {
  const key = getKey();
  const iv = randomBytes(IV_LENGTH);

  const cipher = createCipheriv(ALGORITHM, key, iv, {
    authTagLength: AUTH_TAG_LENGTH,
  });

  const encrypted = Buffer.concat([
    cipher.update(text, 'utf8'),
    cipher.final(),
  ]);

  const authTag = cipher.getAuthTag();

  return [
    iv.toString('hex'),
    authTag.toString('hex'),
    encrypted.toString('hex'),
  ].join(SEPARATOR);
}

/**
 * Decrypt an encrypted payload produced by {@link encrypt}.
 *
 * @param encrypted - The colon-separated encrypted string.
 * @returns The original plaintext.
 *
 * @throws If `ENCRYPTION_KEY` is missing/invalid, or if the payload is
 *         tampered with (GCM authentication failure).
 *
 * @example
 * ```ts
 * const plaintext = decrypt(encrypted);
 * ```
 */
export function decrypt(encrypted: string): string {
  const key = getKey();

  const parts = encrypted.split(SEPARATOR);
  if (parts.length !== 3) {
    throw new Error(
      'Invalid encrypted payload format. Expected "iv:authTag:ciphertext".',
    );
  }

  const [ivHex, authTagHex, ciphertextHex] = parts;

  const iv = Buffer.from(ivHex, 'hex');
  const authTag = Buffer.from(authTagHex, 'hex');
  const ciphertext = Buffer.from(ciphertextHex, 'hex');

  if (iv.length !== IV_LENGTH) {
    throw new Error(`Invalid IV length: expected ${IV_LENGTH} bytes, got ${iv.length}.`);
  }

  if (authTag.length !== AUTH_TAG_LENGTH) {
    throw new Error(
      `Invalid auth tag length: expected ${AUTH_TAG_LENGTH} bytes, got ${authTag.length}.`,
    );
  }

  const decipher = createDecipheriv(ALGORITHM, key, iv, {
    authTagLength: AUTH_TAG_LENGTH,
  });
  decipher.setAuthTag(authTag);

  const decrypted = Buffer.concat([
    decipher.update(ciphertext),
    decipher.final(),
  ]);

  return decrypted.toString('utf8');
}
