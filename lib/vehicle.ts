import db from './database';
import * as fileDatabase from './fileDatabase';
import vehicleRegistrationService from './vehicleRegistrationService';

export enum VEHICLE_TYPE {
  SEDAN = 'Sedan',
  COUPE = 'Coupe',
  MINI_VAN = 'Mini-Van',
  MOTORCYCLE = 'Motorcyle'
};

export interface VehicleProps {
  id?: string;
  nickname: string;
  mileage: number;
  wheels: number;
  engineStatus: string;
  seatStatus: string;
  type: VEHICLE_TYPE;
  registrationId: string;
}

export async function create(vehicleData: VehicleProps) {
  try {
    return fileDatabase.create(vehicleData);
  }
  catch(error) {
    console.error(error);
    throw error;
  }
}

export async function update(vehicleData: VehicleProps) {
  try {
    return fileDatabase.update(vehicleData);
  }
  catch(error) {
    console.error(error);
    throw error;
  }
}