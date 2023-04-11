import styled from 'styled-components';
import { useRouter } from 'next/router';

const Table = styled.table`
  table-layout: fixed;
  
  border: 1px solid black;
`;

const Th = styled.th`
  width: 150px;
  text-align: left;
`

const Td = styled.td`
  padding: 5px 5px;
  margin: 5px 5px;
  text-align: left;
`;

interface VehicleListProps {
  vehicles: any[];
}

const getMileageRating = (mileage: number) => {
  if (mileage < 10000) return 'low';
  if (mileage >= 10000 && mileage < 100000) return 'medium';
  if (mileage >= 100000) return 'high';
}

const vehicleRow = (vehicle: any, i: number) => {
  return (
    <tr key={`vehicle-${i}`}>
      <Td>{vehicle.vehicleType}</Td>
      <Td>{vehicle.nickname}</Td>
      <Td>{getMileageRating(vehicle.mileage)}</Td>
      <Td>{vehicle.registrationId}</Td>
      <Td><a href={`/${vehicle.id}`} >edit</a></Td>
    </tr>
  );
}

const VehicleList = ({ vehicles }: VehicleListProps) => {
  const router = useRouter();

  const addNew = () => {
    router.push('/new');
  }

  return (
    <main>
      <button onClick={addNew}>New Vehicle</button>
      <Table>
        <thead>
          <tr>
            <Th>Type</Th>
            <Th>Nickname</Th>
            <Th>Mileage Rating</Th>
            <Th>Registration ID</Th>
            <Th></Th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map(vehicleRow)}
        </tbody>
      </Table>
    </main>
  )
}

export default VehicleList;
