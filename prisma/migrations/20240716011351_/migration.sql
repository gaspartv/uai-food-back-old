-- CreateEnum
CREATE TYPE "message_type" AS ENUM ('text', 'image', 'interactive', 'document', 'audio', 'sticker', 'order', 'video', 'button', 'contacts', 'location', 'unknown', 'system', 'reaction', 'unsupported');

-- CreateTable
CREATE TABLE "customers" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "disabled" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "waNumber" TEXT,
    "waId" TEXT,
    "businessId" UUID NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "disabled" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "businessId" UUID NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "disabled" TIMESTAMP(3),
    "corporateName" TEXT NOT NULL,
    "tradingName" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "metaAppId" UUID NOT NULL,
    "openAIAppId" UUID NOT NULL,

    CONSTRAINT "business_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "openai_app" (
    "id" UUID NOT NULL,
    "secretKey" TEXT,

    CONSTRAINT "openai_app_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meta_app" (
    "id" UUID NOT NULL,
    "appId" TEXT,

    CONSTRAINT "meta_app_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meta_whatsapp" (
    "id" UUID NOT NULL,
    "waToken" TEXT NOT NULL,
    "waPhoneNumber" TEXT NOT NULL,
    "waPhoneNumberId" TEXT NOT NULL,
    "waBusinessId" TEXT NOT NULL,
    "waVersion" TEXT NOT NULL,
    "metaAppId" UUID NOT NULL,

    CONSTRAINT "meta_whatsapp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "message_type" NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "business_corporateName_key" ON "business"("corporateName");

-- CreateIndex
CREATE UNIQUE INDEX "business_cnpj_key" ON "business"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "business_metaAppId_key" ON "business"("metaAppId");

-- CreateIndex
CREATE UNIQUE INDEX "business_openAIAppId_key" ON "business"("openAIAppId");

-- CreateIndex
CREATE UNIQUE INDEX "openai_app_secretKey_key" ON "openai_app"("secretKey");

-- CreateIndex
CREATE UNIQUE INDEX "meta_app_appId_key" ON "meta_app"("appId");

-- CreateIndex
CREATE UNIQUE INDEX "meta_whatsapp_waPhoneNumber_key" ON "meta_whatsapp"("waPhoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "meta_whatsapp_waPhoneNumberId_key" ON "meta_whatsapp"("waPhoneNumberId");

-- CreateIndex
CREATE UNIQUE INDEX "meta_whatsapp_waBusinessId_key" ON "meta_whatsapp"("waBusinessId");

-- CreateIndex
CREATE UNIQUE INDEX "meta_whatsapp_waVersion_key" ON "meta_whatsapp"("waVersion");

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business" ADD CONSTRAINT "business_metaAppId_fkey" FOREIGN KEY ("metaAppId") REFERENCES "meta_app"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business" ADD CONSTRAINT "business_openAIAppId_fkey" FOREIGN KEY ("openAIAppId") REFERENCES "openai_app"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meta_whatsapp" ADD CONSTRAINT "meta_whatsapp_metaAppId_fkey" FOREIGN KEY ("metaAppId") REFERENCES "meta_app"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
