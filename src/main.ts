// // main.ts
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   // Validation
//   app.useGlobalPipes(new ValidationPipe());

//   // CORS Configuration
//   app.enableCors({
//     origin: ['http://localhost:3000', 'https://book-dashboard-backend.onrender.com, https://book-dashboard-frontend.vercel.app'],
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
//     credentials: true,
//   });

//   await app.listen(9000);

//   // Print the URL to the console
//   console.log(`Server running at http://localhost:9000`);
// }
// bootstrap();


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

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
      // Allow requests with no origin (like mobile apps or curl requests)
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