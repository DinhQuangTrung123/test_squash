import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import { writeFileSync, readFileSync } from 'fs';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { FormatResponseInterceptor } from './reponse/format-response.interceptor';
const express = require('express');
const fs = require('fs');
const https = require('https');
const path = require('path');
// import { FormatResponseInterceptor } from './reponse/format-response.interceptor';
async function bootstrap() {
  var path = require('path');
  const httpsOptions = {
    key: fs.readFileSync('./secrets/private-key.pem'),
    cert: fs.readFileSync('./secrets/public-certificate.pem'),
  };
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  // const app = await NestFactory.create(AppModule, {
  //   httpsOptions,
  // });

  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets(join(__dirname, '..', 'static'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');
  // app.useWebSocketAdapter(new SocketAdapter(app));
  app.useGlobalInterceptors(new FormatResponseInterceptor());
  app.enableCors({
    origin: [
      '*',
      'http://localhost:9001',
      'http://0.0.0.0:3000',
      'http://localhost:9002',
    ],
    methods: ['POST', 'PUT', 'DELETE', 'GET'],
    credentials: true,
    allowedHeaders: '*',
    exposedHeaders: ['set-cookie'],
  });

  await app.listen(3000);
}
bootstrap();
