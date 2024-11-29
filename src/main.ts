// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Dynamic CORS origins
  const allowedOrigins = [
    'http://localhost:3000',           // Local frontend
    'https://book-dashboard-frontend.vercel.app', // Production frontend
    'http://localhost:9000',            // Local backend
    'https://book-dashboard-backend.onrender.com' // Production backend
  ];

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
    credentials: true,
  });

  // Dynamic port selection
  const port = process.env.PORT || 9000;
  await app.listen(port);

  console.log(`Server running at ${await app.getUrl()}`);
}
bootstrap();