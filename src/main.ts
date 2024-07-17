import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";
import { Transport } from "@nestjs/microservices";
import { env } from "./configs/validate-env";
import { Log } from "./configs/logger";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.enableCors({ origin: "*" });

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [env.RABBIT_MQ_URL],
      noAck: false,
      queue: env.RABBIT_MQ_RECEIVED,
      queueOptions: { durable: true },
    },
  });
  await app.startAllMicroservices();

  await app.listen(Number(env.PORT), "0.0.0.0", () => {
    Log.info(`PORT: ${env.PORT}`, "StartedServer");
  });
}
bootstrap();
