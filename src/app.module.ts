// src/app.module.ts
import { Module } from '@nestjs/common';
import { RegridController } from './controllers/regrid.controller';
import { RegridService } from './services/regrid.service';

@Module({
  imports: [],
  controllers: [RegridController],
  providers: [RegridService],
})
export class AppModule {}
