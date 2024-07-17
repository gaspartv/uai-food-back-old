import { IsArray, IsString } from "class-validator";

export type MessageType =
  | "text"
  | "image"
  | "interactive"
  | "document"
  | "audio"
  | "sticker"
  | "order"
  | "video"
  | "button"
  | "contacts"
  | "location"
  | "unknown"
  | "system"
  | "reaction"
  | "unsupported";

class ErrorData {
  details: string;
}

class ErrorsForMessage {
  code: number;
  title: string;
  message?: string;
  details?: string;
  error_data?: ErrorData;
}

class ProductItems {
  product_retailer_id: string;
  quantity: string;
  item_price: string;
  currency: string;
}

class OrderForMessage {
  catalog_id: string;
  product_items: ProductItems[];
  text?: string;
}

class ReferredProduct {
  catalog_id: string;
  product_retailer_id: string;
}

class ContextForMessage {
  from: string;
  id: string;
  referred_product?: ReferredProduct;
  forwarded?: boolean;
  frequently_forwarded?: boolean;
}

class ButtonForMessage {
  payload: string;
  text: string;
}

class TextForMessage {
  body: string;
}

class ReferralForMessage {
  source_url: string;
  source_id: string;
  source_type: string;
  headline: string;
  body: string;
  media_type: string;
  image_url: string;
  video_url: string;
  thumbnail_url: string;
}

class LocationForMessage {
  latitude: string;
  longitude: string;
  name: string;
  address: string;
}

class AddressesForContact {
  city: string;
  country: string;
  country_code: string;
  state: string;
  street: string;
  type: string;
  zip: string;
}

class EmailForContact {
  email: string;
  type: string;
}

class NameForContact {
  formatted_name: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  suffix: string;
  prefix: string;
}

class OrgForContact {
  company: string;
  department: string;
  title: string;
}

class PhonesForContact {
  phone: string;
  wa_id: string;
  type: string;
}

class UrlsForContact {
  url: string;
  type: string;
}

class ContactForMessage {
  addresses: AddressesForContact[];
  birthday: string;
  emails: EmailForContact[];
  name: NameForContact;
  org: OrgForContact;
  phones: PhonesForContact[];
  urls: UrlsForContact[];
}

class StickerForMessage {
  id: string;
  animated: boolean;
  mime_type: string;
  sha256: string;
}

class MediaForMessage {
  caption: string;
  mime_type: string;
  sha256: string;
  id: string;
  filename?: string;
}

class ReactionForMessage {
  emoji: string;
  messsage_id: string;
}

class IdentityForMessage {
  acknowledged: boolean;
  created_timestamp: number;
  hash: string;
}

class ButtonReply {
  id: string;
  title: string;
}

class ListReply {
  id: string;
  title: string;
  description?: string;
}

class InteractiveForMessage {
  type: "button_reply" | "list_reply";
  button_reply: ButtonReply[];
  list_reply: ListReply[];
}

class SystemForMessage {
  body: string;
  new_wa_id: string;
  identity: string;
  type: "user_changed_number" | "user_identity_changed";
  user: string;
}

export class WhatsappMessagesDto {
  from: string;
  id: string;
  timestamp: string;
  type?: MessageType;

  context: ContextForMessage;
  identity?: IdentityForMessage;
  text?: TextForMessage;
  audio?: MediaForMessage;
  image?: MediaForMessage;
  sticker?: StickerForMessage;
  video?: MediaForMessage;
  interactive?: InteractiveForMessage;
  order?: OrderForMessage;
  document?: MediaForMessage;
  errors?: ErrorsForMessage[];
  system?: SystemForMessage;
  button?: ButtonForMessage;
  referral?: ReferralForMessage;
  location?: LocationForMessage;
  reaction?: ReactionForMessage;
  contacts?: ContactForMessage[];
}

class Origin {
  type: string;
}

class ConversationForStatuses {
  id: string;
  expiration_timestamp?: string;
  origin?: Origin;
  type?: string;
}

class Pricing {
  billable: boolean;
  pricing_model: string;
  category?: string;
}

class Errors {
  code: number;
  title: string;
  details?: string;
}

class PaymentForStatuses {
  reference_id: string;
  id?: string;
  from?: string;
  type?: string;
  status?: "captured" | "pending" | "failed";
  payment?: any;
  timestamp?: string;
}

export class WhatsappStatusesDto {
  id: string;
  recipient_id: string;
  status: "sent" | "delivered" | "read" | "failed" | "deleted";
  timestamp: string;
  type?: string;
  conversation?: ConversationForStatuses;
  pricing?: Pricing;
  errors?: Errors[];

  from?: string;
  payment?: PaymentForStatuses;
}

class Profile {
  name?: string;
}

class Contacts {
  profile: Profile;
  wa_id: string;
}

class Metadata {
  display_phone_number: string;
  phone_number_id: string;
}

class Value {
  messaging_product: "whatsapp";
  metadata: Metadata;
  messages?: WhatsappMessagesDto[];
  statuses?: WhatsappStatusesDto[];
  errors?: any[];

  contacts?: Contacts[];
}

class Changes {
  field: "messages";
  value: Value;
}

class Entry {
  id: string;
  changes: Changes[];
}
export class WhatsappReceiveDto {
  @IsString()
  object: "whatsapp_business_account";

  @IsArray()
  entry: Entry[];
}
