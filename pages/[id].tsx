import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import VehicleForm from '../components/VehicleForm'
import * as db from '../lib/fileDatabase';

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { id } = context.params;
  const vehicle = await db.find(id);
  return {
    props: {
      vehicle
    }
  }
}

const EditVehicle: NextPage = ({ vehicle }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <main>
      Change a vehicle here
      <VehicleForm defaults={vehicle} />
    </main>
  )
}

export default EditVehicle