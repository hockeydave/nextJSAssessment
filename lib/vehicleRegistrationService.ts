import crypto from 'crypto';

class VehicleRegistrationService {
    registerVehicle(vehicle: any) {
        return new Promise((resolve, reject) => {
            if (!vehicle.id) {
                reject(new Error('Vehicle has no ID!'));
            }

            setTimeout(() => {
                resolve(crypto.randomBytes(15).toString('hex'));
            }, 3000);
        })
    }
}

const service = new VehicleRegistrationService();
export default service;
