import { WhatsappMessagesDto } from "./whatsapp-receive.dto";

export class HandleMessageDto {
  phoneNumberId: string;
  message: WhatsappMessagesDto;
  profileName?: string | null;
}
