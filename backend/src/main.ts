import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process'; // <-- Esta é a linha mágica que resolve o erro

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Autoriza o frontend (Vercel) a comunicar com esta API
  app.enableCors(); 
  
  // Permite que o Render utilize a porta dinâmica dele
  await app.listen(process.env.PORT || 3001);
}
bootstrap();