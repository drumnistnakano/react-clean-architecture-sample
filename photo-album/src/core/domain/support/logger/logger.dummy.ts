import type { Logger } from "./logger";

export class LoggerDummy implements Logger {
  debug(_obj: object): void {}

  info(_obj: object): void {}

  warn(_obj: object): void {}

  error(_obj: object): void {}
}
