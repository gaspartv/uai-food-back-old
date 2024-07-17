import { RestService } from "src/common/decorators/rest/service.decorator";
import { Log } from "src/configs/logger";
import { MessageType, WhatsappMessagesDto } from "./dtos/whatsapp-receive.dto";
import { PrismaService } from "src/providers/prisma/prisma.service";
import * as fs from "fs";
import FormData from "form-data";
import axios from "axios";

@RestService()
export class ConsumerService {
  constructor(private readonly prisma: PrismaService) {}

  async handleMessageType(type: MessageType, message: WhatsappMessagesDto) {
    let msg;

    const url = "https://graph.facebook.com/v19.0/269710592902327/media";

    const formData = new FormData();
    formData.append("file", fs.createReadStream("/dbz.jpg"), "file.jpg");
    formData.append("messaging_product", "whatsapp");

    const res = await axios.post(url, formData, {
      headers: {
        Authorization: `Bearer EAAPfHFcDenMBO9GwGKcTLRLu4qUdn59nBNyCTZCWZCgyPcSquSWZBLSFDJaY7D0RTy4CRGuEePI9vGT6ZBzZCnGZBolK4QMpSl6IBwPY4KRZC02YgUWKbHoTG7rsEQd2Evd1igB9bhuM1RlFdaWHsAEA80N9QYB7J0lxjSprtSS7hjUwk3aE86kZANlo5H4qghRZCVoxzFZAF2Nv18O6VXMILLZAGmSyteycoGXw8cZD`,
        ...formData.getHeaders(),
      },
    });

    console.log(res);

    switch (type) {
      case "text":
        msg = await this.prisma.message.create({
          data: { type, text: message.text.body },
        });
        break;
      case "image":
        break;
      case "interactive":
        console.info("Contato");
        break;
      case "document":
        console.info("Documento");
        break;
      case "audio":
        console.info("Áudio");
        break;
      case "sticker":
        console.info("Sticker");
        break;
      case "order":
        console.info("Voz");
        break;
      case "video":
        console.info("Vídeo");
        break;
      case "button":
        console.info("PTT");
        break;
      case "contacts":
        console.info("Arquivo");
        break;
      case "location":
        console.info("Localização");
        break;
      case "unknown":
        console.info("Localização");
        break;
      case "system":
        console.info("Localização");
        break;
      case "reaction":
        console.info("Localização");
        break;
      case "unsupported":
        console.info("Localização");
        break;
      default:
        Log.error("Tipo de mensagem não identificado", "ConsumerWhatsapp");
        return "finish";
    }
  }
}
