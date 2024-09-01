import './configs/env.config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import SwaggerConfig from './configs/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // swagger config
  SwaggerConfig(app);

  const PORT = process.env.PORT;
  await app.listen(PORT, () => {
    console.log(`run server => ${process.env.URL_SERVER}/api`);
    console.log(`run server => http://localhost:${PORT}/swagger`);
  });
}
bootstrap();
