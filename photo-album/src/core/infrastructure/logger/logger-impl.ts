import type { Logger } from "@/core/domain/support/logger";

export class LoggerImpl implements Logger {
  debug(obj: object): void {
    console.log(JSON.stringify({ ...obj, logLevel: "DEBUG" }));
  }

  info(obj: object): void {
    console.log(JSON.stringify({ ...obj, logLevel: "INFO" }));
  }

  warn(obj: object): void {
    console.warn(JSON.stringify({ ...obj, logLevel: "WARN" }));
  }

  error(obj: object): void {
    console.error(JSON.stringify({ ...obj, logLevel: "ERROR" }));
  }
}
