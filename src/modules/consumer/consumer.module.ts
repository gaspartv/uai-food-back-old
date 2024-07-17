import { RestModule } from "src/common/decorators/rest/module.decorator";
import { ConsumerUseCase } from "./consumer.use-case";
import { ConsumerController } from "./consumer.controller";
import { ConsumerService } from "./consumer.service";
import { PrismaModule } from "src/providers/prisma/prisma.module";

@RestModule({
  imports: [PrismaModule],
  controllers: [ConsumerController],
  providers: [ConsumerUseCase, ConsumerService],
  exports: [],
})
export class ConsumerModule {}
