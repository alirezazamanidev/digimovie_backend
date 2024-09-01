import './configs/env.config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import SwaggerConfig from './configs/swagger.config';
import { getGlobalFilters } from './common/exceptions';
import { ValidationPipeErorr } from './common/pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpAdapter = app.get(HttpAdapterHost);
  app.enableCors({origin:['http://localhost:3000',process.env.URL_CLIENT]})
  // exceptions
  app.useGlobalFilters(...getGlobalFilters(httpAdapter));
  app.useGlobalPipes(new ValidationPipeErorr());

  app.setGlobalPrefix('api');
  // swagger config
  SwaggerConfig(app);

  const PORT = process.env.PORT;
  await app.listen(PORT, () => {
    console.log(`run server => ${process.env.URL_SERVER}/api`);
    console.log(`run server => http://localhost:${PORT}/swagger`);
  });
}
bootstrap();
