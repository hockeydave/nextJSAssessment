import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import VehicleForm from '../components/VehicleForm'
import * as db from '../lib/fileDatabase';

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const {id} = context.params;
  let vehicle = await db.find(id);
  if (!vehicle) {
    vehicle = [];
  }
  return {
    props: {
      vehicle
    }
  }
}

const EditVehicle: NextPage = ({ vehicle }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <main>
      <h3>Change a vehicle here</h3>
      <VehicleForm defaults={vehicle} />
    </main>
  )
}

export default EditVehicle
