import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as dotenv from 'dotenv';
import axiosRetry from 'axios-retry';

dotenv.config();
axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

@Injectable()
export class RegridService {
  private readonly apiKey: string = process.env.REGRID_API_KEY;

  async getParcels(lat: string, lon: string) {
    const url = `https://app.regrid.com/api/v2/parcels/point?lat=${lat}&lon=${lon}&radius=250&token=${this.apiKey}`;

    try {
      const response = await axios.get(url);
      console.log('Regrid API Response:', response.data);

      // Check if features exist and contain data
      if (
        !response.data || 
        !response.data.parcels || 
        !response.data.parcels.features || 
        response.data.parcels.features.length === 0
      ) {
        console.warn(`No parcel data found at ${lat}, ${lon}`);
        return { message: "No parcels found", parcels: [] }; // Return empty array instead of throwing error
      }

      // Extract relevant parcel information
      const features = response.data.parcels.features.map((feature: any) => ({
        address: feature.properties.headline || "Unknown Address",
        owner: feature.properties.fields?.owner || "Unknown Owner",
        area: feature.properties.fields?.area || "Unknown Area",
        city: feature.properties.context?.city || "Unknown City",
        state: feature.properties.context?.state || "Unknown State",
        zipCode: feature.properties.context?.zip || "Unknown Zip Code",
      }));

      return { message: "Success", parcels: features };
    } catch (error) {
      console.error('Error fetching parcels:', error.message);
      throw new Error(`Failed to fetch parcels: ${error.message}`);
    }
  }
}
