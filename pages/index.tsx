import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import VehicleList from '../components/VehicleList';
import * as db from '../lib/fileDatabase';

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const vehicles = await db.all();

  return {
    props: {
      vehicles
    }
  }
}

const Home: NextPage = ({ vehicles }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div>
      <VehicleList vehicles={vehicles} />
    </div>
  )
}

export default Home
