import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from "@nestjs/microservices";
import { RestController } from "src/common/decorators/rest/controller.decorator";
import { WhatsappReceiveDto } from "./dtos/whatsapp-receive.dto";
import { Get, ValidationPipe } from "@nestjs/common";
import { Log } from "src/configs/logger";
import { GenerateLogs } from "src/utils/generate-logs";
import { ConsumerUseCase } from "./consumer.use-case";

@RestController()
export class ConsumerController {
  constructor(private readonly useCase: ConsumerUseCase) {}

  private readonly validationPipe = new ValidationPipe({
    errorHttpStatusCode: 422,
    whitelist: true,
    transform: true,
    transformOptions: { groups: ["transform"] },
  });

  @Get("test")
  test() {
    return this.useCase.test();
  }

  @MessagePattern("whatsapp")
  async handleWebhookToApi(
    @Payload() payload: WhatsappReceiveDto,
    @Ctx() context: RmqContext,
  ) {
    console.info("payload", payload);
    try {
      await this.validationPipe.transform(payload, {
        type: "body",
        metatype: WhatsappReceiveDto,
      });
    } catch (error) {
      context.getChannelRef().ack(context.getMessage());
      Log.error(
        "Erro ao validar payload recebido no consumer do whatsapp",
        "ConsumerWhatsapp",
      );
      GenerateLogs.create({ payload, error }, "consumer-whatsapp", "error");
      return;
    }

    const value = payload.entry[0].changes[0].value;

    if (value?.statuses) {
      const statuses = payload.entry[0].changes[0].value.statuses[0];
      await this.useCase.updateMessageStatus(statuses);
      context.getChannelRef().ack(context.getMessage());
      return;
    }

    if (value?.messages) {
      const phoneNumberId = value.metadata.phone_number_id;

      const message = value?.messages[0];

      const contacts = value?.contacts;

      const profileName = contacts ? value.contacts[0]?.profile?.name : null;

      await this.useCase.handleMessage({
        phoneNumberId,
        message,
        profileName,
      });
      context.getChannelRef().ack(context.getMessage());
      return;
    }

    if (value?.errors) {
      console.info("errors", value.errors);
      context.getChannelRef().ack(context.getMessage());
      return;
    }

    context.getChannelRef().ack(context.getMessage());
  }
}
