import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Autoriza o frontend (Vercel) a comunicar com esta API
  app.enableCors(); 
  
  // Ignora o aviso do TypeScript, pois o Node.js sabe o que é o process
  
  await app.listen(process.env.PORT || 3001);
}
bootstrap();