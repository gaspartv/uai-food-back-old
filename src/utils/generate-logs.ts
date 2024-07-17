import { join } from "path";
import { Log } from "src/configs/logger";
import { mainDirname } from "src/root-dirname";
import * as fs from "fs";

export class GenerateLogs {
  static async create(payload: any, folderName: string, type: string) {
    const logsToString = JSON.stringify(payload);

    const currentDate = new Date()
      .toLocaleDateString("pt-BR")
      .replace(/\//g, "-");

    const date = new Date();
    date.setHours(date.getHours() - 3);

    const logName = `${date.toISOString()}-${type}`;
    const logsDir = join(mainDirname, "logs", folderName, currentDate);
    const filePath = join(logsDir, `${logName}.log`);

    fs.mkdir(logsDir, { recursive: true }, (err) => {
      if (err) {
        Log.error("Error creating directory:", "ConsumerWhatsapp");
      } else {
        fs.writeFile(filePath, logsToString, "utf8", (writeErr) => {
          if (writeErr) {
            Log.error("Error writing file", "ConsumerWhatsapp");
          } else {
            Log.info("File saved successfully: " + logName, "ConsumerWhatsapp");
          }
        });
      }
    });
  }
}
