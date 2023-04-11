import vehicleRegistrationService from './vehicleRegistrationService';
import fs from 'fs';

const fsp = fs.promises;

const FILE_PATH = './data.json';
//let NEXT_ID = 1;

export async function all() {
    return _openFile();
}

export async function create(data: any) {
    const allData = await _openFile();
    data.id = allData.length + 1;
    data.registrationId = await vehicleRegistrationService.registerVehicle(data);
    await _writeFile(allData.concat(data));
    return data;
}

export async function find(id: number) {
    const allData = await _openFile();
    return allData.find((d: { id: number }) => d.id == id);
}

export async function update(data: any) {
    const allData = await _openFile();
    for (let i = 0; i < allData.length; i++) {
        if (allData[i].id === data.id) {
            allData[i] = data;
            break;
        }
    }
    await _writeFile(allData);
    return data;
}

async function _openFile() {
    const rawData = await fsp.readFile(FILE_PATH);
    if (rawData.length > 0) {
        return JSON.parse(rawData.toString());
    } else {
        return "[{}]"
    }
}

function _writeFile(json: any) {
    return fsp.writeFile(FILE_PATH, JSON.stringify(json));
}
