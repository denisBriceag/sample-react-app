export class StorageUtil {
  static get<T>(key: string, storage: Storage = localStorage): T | null {
    try {
      return JSON.parse(storage.getItem(key) as string);
    } catch {
      return null;
    }
  }

  static getItem(key: string, storage: Storage = localStorage): string | null {
    return storage.getItem(key);
  }

  static set<T>(key: string, value: T, storage: Storage = localStorage): void {
    storage.setItem(
      key,
      typeof value === "string" ? value : JSON.stringify(value),
    );
  }

  static remove(key: string, storage: Storage = localStorage): void {
    storage.removeItem(key);
  }
}
