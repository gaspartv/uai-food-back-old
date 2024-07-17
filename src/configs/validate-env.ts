import "dotenv/config";
import { z } from "zod";
import { Log } from "./logger";
import { InternalServerErrorException } from "@nestjs/common";

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "homo", "prod"]),
  PORT: z.coerce.number(),
  RABBIT_MQ_URL: z.string(),
  RABBIT_MQ_SEND: z.string(),
  RABBIT_MQ_RECEIVED: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  Log.error(`AO CARREGAR AS VARIÁVEIS DE AMBIENTE: ${_env.error.toString()}`);

  throw new InternalServerErrorException();
}

const env = _env.data;

export { env };
