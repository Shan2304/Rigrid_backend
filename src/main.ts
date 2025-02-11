import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend to communicate with the backend
  app.enableCors({
    origin: 'https://comfy-tartufo-efe122.netlify.app/', // Frontend URL (adjust if necessary)
    methods: 'GET, POST, PUT, DELETE', // Allow the necessary HTTP methods
    allowedHeaders: 'Content-Type, Authorization', // Allow necessary headers
  });

  // Set the port dynamically or fallback to port 3000 if not specified in the environment
  const port = process.env.PORT || 4000; // Make sure this port matches your frontend API request URL
  await app.listen(port);
  
  // Log the application URL for debugging
  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
