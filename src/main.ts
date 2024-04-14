import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'post',
      protoPath: 'proto/hero.proto',
      url: 'localhost:50051'
    },
  });
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
