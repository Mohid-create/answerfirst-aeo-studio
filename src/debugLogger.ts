// src/utils/debugLogger.ts
// Simple debug logger that only logs in development
// Use this instead of console.log(...) while developing.
// It will do nothing in production.

export function debugLog(...args: any[]) {
    if (process.env.NODE_ENV === "development") {
      // prefix makes it easier to find debug logs in console
      // You can change or remove the prefix if you prefer
      // eslint-disable-next-line no-console
      console.log("[DEBUG]", ...args);
    }
  }
  
  export function debugError(...args: any[]) {
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.error("[ERROR]", ...args);
    }
  }
  