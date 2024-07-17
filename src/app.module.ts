import { RestModule } from "./common/decorators/rest/module.decorator";
import { ConfigModule } from "@nestjs/config";
import {
  Transport,
  ClientsModule as TransportClientsModule,
} from "@nestjs/microservices";
import { env } from "./configs/validate-env";
import { ConsumerModule } from "./modules/consumer/consumer.module";

@RestModule({
  imports: [
    ConsumerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationOptions: { allowUnknown: false },
    }),
    TransportClientsModule.registerAsync({
      isGlobal: true,
      clients: [
        {
          name: "RABBITMQ_WEBHOOK",
          useFactory: () => ({
            transport: Transport.RMQ,
            options: {
              urls: [env.RABBIT_MQ_URL],
              queue: env.RABBIT_MQ_SEND,
              queueOptions: {
                durable: true,
              },
            },
          }),
        },
      ],
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
