import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import VehicleList from '../components/VehicleList';


export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const FileDatabase = require('../lib/fileDatabase.ts')
  let db = new FileDatabase();
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
