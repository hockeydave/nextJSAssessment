import type { NextPage } from 'next'
import VehicleForm from '../components/VehicleForm'
import { VEHICLE_TYPE } from '../lib/vehicle';

const defaults = {
  type: VEHICLE_TYPE.COUPE,
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
      Create a new vehicle
      <VehicleForm defaults={defaults}/>
    </main>
  )
}

export default NewVehicle