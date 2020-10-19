import Cookies from "universal-cookie";

export const MEMORY_KEY_PREFIX = "@HS:";
const cookies = new Cookies();

export default class AuthCookieStorage {
  /**
   * This is used to set a specific item in storage
   */
  static setItem(key: string, value: string): void {
    cookies.set(`${MEMORY_KEY_PREFIX}${key}`, value, { path: "/" });
  }

  /**
   * This is used to get a specific key from storage
   */
  static getItem(key: string): string {
    return cookies.get(`${MEMORY_KEY_PREFIX}${key}`);
  }

  /**
   * This is used to remove an item from storage
   */
  static removeItem(key: string): void {
    cookies.remove(key);
  }

  /**
   * This is used to clear the storage
   */
  static clear(): void {
    const allCokies: Record<string, string> = cookies.getAll() || {};
    Object.keys(allCokies).forEach(
      (cookieKey) =>
        cookieKey.startsWith(MEMORY_KEY_PREFIX) && cookies.remove(cookieKey),
    );
  }
}
