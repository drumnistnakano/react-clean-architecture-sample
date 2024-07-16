import type { Logger } from "@/core/domain/support/logger";

export class LoggerImpl implements Logger {
  debug(obj: object): void {
    console.log(JSON.stringify({ ...obj, logLevel: "DEBUG" }, null, 2));
  }

  info(obj: object): void {
    console.log(JSON.stringify({ ...obj, logLevel: "INFO" }, null, 2));
  }

  warn(obj: object): void {
    console.warn(JSON.stringify({ ...obj, logLevel: "WARN" }, null, 2));
  }

  error(obj: object): void {
    console.error(JSON.stringify({ ...obj, logLevel: "ERROR" }, null, 2));
  }
}
