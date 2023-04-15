import * as fileDatabase from './fileDatabase';


export enum VEHICLE_TYPE {
  SEDAN = 'Sedan',
  COUPE = 'Coupe',
  MINI_VAN = 'Mini-Van',
  MOTORCYCLE = 'Motorcycle'
}
export enum SEAT_STATUS {
  FIXABLE = 'Fixable',
  WORKS = 'Works',
  JUNK = 'Junk'
}
export enum ENGINE_STATUS {
  FIXABLE = 'Fixable',
  WORKS = 'Works',
  JUNK = 'Junk'
}

export interface VehicleProps {
  id?: string;
  nickname: string;
  mileage: number;
  wheels: number;
  doors: number,
  engineStatus: string;
  seatStatus: string;
  vehicleType: VEHICLE_TYPE;
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
    if(vehicleData.vehicleType === VEHICLE_TYPE.MOTORCYCLE) {
      vehicleData.wheels = 2;
      vehicleData.doors = 0;
    } else {
      vehicleData.seatStatus = "";
    }
    return fileDatabase.update(vehicleData);
  }
  catch(error) {
    console.error(error);
    throw error;
  }
}
