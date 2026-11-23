import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";

const keyLength = 64;
const options = { N: 2 ** 17, r: 8, p: 1, maxmem: 160 * 1024 * 1024 };
const hashPattern = /^scrypt\$([0-9a-f]{32})\$([0-9a-f]{128})$/;

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const key = await derivePasswordKey(password, salt);
  return `scrypt$${salt.toString("hex")}$${key.toString("hex")}`;
}

export async function verifyPassword(password: string, hash: string | null): Promise<boolean> {
  const match = hash?.match(hashPattern);
  const salt = match ? Buffer.from(match[1], "hex") : Buffer.alloc(16);
  const expectedKey = match ? Buffer.from(match[2], "hex") : Buffer.alloc(keyLength);
  const key = await derivePasswordKey(password, salt);

  return timingSafeEqual(key, expectedKey) && Boolean(match);
}

function derivePasswordKey(password: string, salt: Buffer): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scrypt(password, salt, keyLength, options, (error, key) => {
      if (error) reject(error);
      else resolve(key);
    });
  });
}
