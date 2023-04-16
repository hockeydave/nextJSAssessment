import type { NextPage } from 'next'
import VehicleForm from '../components/VehicleForm'
import { VEHICLE_TYPE } from '../lib/vehicle';

const defaults = {
  vehicleType: VEHICLE_TYPE.COUPE,
  nickname: '',
  mileage: 0,
  wheels: 4,
  doors: 4,
  engineStatus: 'Works',
  seatStatus: 'Works',
}

const NewVehicle: NextPage = () => {
  return (
    <main>
      <h3>Create a new vehicle</h3>
      <VehicleForm defaults={defaults}/>
    </main>
  )
}

export default NewVehicle
