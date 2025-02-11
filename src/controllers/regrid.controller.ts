import { Controller, Get, Query } from '@nestjs/common';
import { RegridService } from '../services/regrid.service';

@Controller('regrid')
  getRoot() {
  return { message: 'Backend is running!' };
export class RegridController {
  constructor(private readonly regridService: RegridService) {}

  @Get('parcels')
  async getParcels(@Query('lat') lat: string, @Query('lon') lon: string) {
    console.log('Received request:', { lat, lon });

    if (!lat || !lon) {
      return { message: 'Latitude and Longitude are required', parcels: [] };
    }

    try {
      const result = await this.regridService.getParcels(lat, lon);
      return result;
    } catch (error) {
      console.error('Controller Error:', error.message);
      return { message: error.message, parcels: [] };
    }
  }
}
