import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  setItem<T>(key: string, value: T, isRaw = false): void {
    try {
      const serializedValue = isRaw ? String(value) : JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(error);
    }
  }

  getItem<T>(key: string, isRaw = false): T | null {
    try {
      const value = localStorage.getItem(key);

      if (value === null) {
        return null;
      }

      return isRaw ? (value as unknown as T) : JSON.parse(value);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
