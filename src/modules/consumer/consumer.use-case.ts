import { RestUseCase } from "src/common/decorators/rest/use-case.decorator";
import { WhatsappStatusesDto } from "./dtos/whatsapp-receive.dto";
import { HandleMessageDto } from "./dtos/handle-message.dto";
import { ConsumerService } from "./consumer.service";
import * as fs from "fs";
const FormData = require("form-data");
import axios from "axios";
import { mainDirname } from "src/root-dirname";

@RestUseCase()
export class ConsumerUseCase {
  constructor(private readonly service: ConsumerService) {}

  async updateMessageStatus(statuses: WhatsappStatusesDto) {
    console.info(statuses);
  }

  async handleMessage({
    phoneNumberId,
    message,
    profileName,
  }: HandleMessageDto) {
    const waMessageId = message.id;
    const waId = message.from;

    const handledMessage = await this.service.handleMessageType(
      message.type,
      message,
    );
    if (handledMessage === "finish") return;

    console.info({ phoneNumberId, message, profileName, waId, waMessageId });
  }

  async test() {
    const url = "https://graph.facebook.com/v19.0/269710592902327/media";

    const filePath = mainDirname + "/src/modules/consumer/" + "dbz.jpg";
    if (!fs.existsSync(filePath)) {
      console.error("Arquivo não encontrado:", filePath);
      return;
    }

    const formData = new FormData();
    formData.append("file", fs.createReadStream(filePath), "dbz.jpg");
    formData.append("messaging_product", "whatsapp");

    const res = await axios.post(url, formData, {
      headers: {
        Authorization: `Bearer EAAPfHFcDenMBO9GwGKcTLRLu4qUdn59nBNyCTZCWZCgyPcSquSWZBLSFDJaY7D0RTy4CRGuEePI9vGT6ZBzZCnGZBolK4QMpSl6IBwPY4KRZC02YgUWKbHoTG7rsEQd2Evd1igB9bhuM1RlFdaWHsAEA80N9QYB7J0lxjSprtSS7hjUwk3aE86kZANlo5H4qghRZCVoxzFZAF2Nv18O6VXMILLZAGmSyteycoGXw8cZD`,
        ...formData.getHeaders(),
      },
    });

    console.log(res.data);
  }
}
