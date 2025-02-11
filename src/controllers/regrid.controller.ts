import { Controller, Get, Query } from '@nestjs/common';
import { RegridService } from '../services/regrid.service';

@Controller('regrid')
export class RegridController {
  constructor(private readonly regridService: RegridService) {}

  
  @Get()
  getRoot() {
    return { message: 'Backend is running!' };
  }

  
  @Get('parcels')
  async getParcels(@Query('lat') lat: string, @Query('lon') lon: string) {
    console.log('Received request:', { lat, lon });

    if (!lat || !lon) {
      console.log("Missing latitude or longitude");
      return { message: 'Latitude and Longitude are required', parcels: [] };
    }

    try {
      const result = await this.regridService.getParcels(lat, lon);
      console.log("Result from Regrid API:", result);
      return result;
    } catch (error) {
      console.error('Controller Error:', error.message);
      return { message: error.message, parcels: [] };
    }
  }
}
