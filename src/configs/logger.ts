import { Logger } from "@nestjs/common/services/logger.service";

export class Log {
  static info(message: string, context?: string) {
    if (context) return Logger.log(message, context);
    Logger.log(message);
  }

  static error(message: string, stackOrContext?: string) {
    if (stackOrContext) return Logger.error(message, stackOrContext);
    Logger.error(message);
  }
}
