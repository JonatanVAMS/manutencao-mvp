import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // 1. Autoriza o frontend (Vercel) a comunicar com esta API
  app.enableCors(); 
  
  // 2. Permite que o Render utilize a porta dinâmica dele, ou a 3001 no seu computador
  await app.listen(process.env.PORT || 3001);
}
bootstrap();