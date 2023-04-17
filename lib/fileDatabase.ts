import vehicleRegistrationService from './vehicleRegistrationService';
import fs from 'fs';

import "reflect-metadata";


module.exports = class FileDatabase {

    fsp = fs.promises;
    public database_file_path: string = process.env.FILE_DATABASE!;


    public async all() {
        return this._openFile();
    }


    public async create(data: any) {
        let allData = await this._openFile();
        data.id = allData.length + 1;
        data.registrationId = await vehicleRegistrationService.registerVehicle(data);
        await this._writeFile(allData.concat(data));
        return data;
    }


    public async find(id: number) {
        const allData = await this._openFile();
        return allData.find((d: { id: number }) => d.id == id);
    }


    public async update(data: any) {
        const allData = await this._openFile();
        for (let i = 0; i < allData.length; i++) {
            if (allData[i].id === data.id) {
                allData[i] = data;
                break;
            }
        }
        await this._writeFile(allData);
        return data;
    }


    public async _openFile() {
        const rawData = await this.fsp.readFile(this.database_file_path);
        if (rawData.length > 0) {
            return JSON.parse(rawData.toString());
        } else {
            return [];
        }
    }


    public async _writeFile(json: any) {
        return this.fsp.writeFile(this.database_file_path, JSON.stringify(json));
    }
}
