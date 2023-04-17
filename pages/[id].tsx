import type {GetServerSideProps, InferGetServerSidePropsType, NextPage} from 'next'
import VehicleForm from '../components/VehicleForm'


export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const {id} = context.params;
    const FileDatabase = require('../lib/fileDatabase.ts')
    let db = new FileDatabase();
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

const EditVehicle: NextPage = ({vehicle}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <main>
            <h3>Change a vehicle here</h3>
            <VehicleForm defaults={vehicle}/>
        </main>
    )
}

export default EditVehicle
