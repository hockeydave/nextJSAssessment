import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { VEHICLE_TYPE } from "../lib/vehicle";

const { COUPE, SEDAN, MINI_VAN, MOTORCYCLE } = VEHICLE_TYPE;

const VehicleForm = ({ defaults }: { defaults: any }) => {
  const [selectedType, setSelectedType] = useState<VEHICLE_TYPE>(COUPE);
  const [formState, setFormState] = useState(defaults);
  const router = useRouter();

  const btnRef = useRef<HTMLButtonElement>(null);

  const handleChange = (event: any) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  }

  const toggleButtonDisable = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.disabled = !btnRef.current.disabled;
    }
  }

  const handleTypeChange = (e: any) => {
    setSelectedType(e.currentTarget.value);
    setFormState({
      ...formState,
      type: e.currentTarget.value
    });
    // Here is where I could change the value of "wheels" to default to
    // 2 if Motorcycle is selected, but that has the potential to overwrite 
    // data the user may have entered. The best solution is to track if the field is dirty
    // and change to the default if the field isn't dirty. This is trivial with a 
    // form library like react-hook-form https://react-hook-form.com/
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    toggleButtonDisable();

    const body = {
      ...formState,
      type: selectedType
    };

    await fetch('/api/vehicles/new', {
      method: 'POST',
      body: JSON.stringify(body),
    });

    router.push('/');
  }

  return (
    <main>
      <form method="POST" onSubmit={handleSubmit}>
        <input type="hidden" value={defaults.id} name="id" />
        <label>Type</label>
        <select onChange={handleTypeChange} value={formState.type}>
          <option value={COUPE}>{COUPE}</option>
          <option value={SEDAN}>{SEDAN}</option>
          <option value={MINI_VAN}>{MINI_VAN}</option>
          <option value={MOTORCYCLE}>{MOTORCYCLE}</option>
        </select>
        <div>
          <label htmlFor="nickname">Nickname</label>
          <input name="nickname" type="text" id="nickname" onChange={handleChange} value={formState.nickname} />
        </div>
        <div>
          <label htmlFor="mileage">Mileage</label>
          <input name="mileage" type="number" id="mileage" onChange={handleChange} value={formState.mileage} />
        </div>
        <div>
          <label htmlFor="wheels">Wheels</label>
          <input name="wheels" type="number" id="wheels" onChange={handleChange} value={formState.wheels} />
        </div>
        { selectedType !== MOTORCYCLE && 
          <div>
            <label htmlFor="doors">Doors</label>
            <input name="doors" type="number" id="doors" onChange={handleChange} value={formState.doors} />
          </div>
        }
        { selectedType === MINI_VAN  &&
          <div>
            sliding doors go here
          </div>
        }
        <div>
          <label htmlFor="engineStatus">Engine Status</label>
          <select id="engineStatus" name="engineStatus" onChange={handleChange}>
            <option value='Works'>Works</option>
            <option value='Fixable'>Fixable</option>
            <option value='Junk'>Junk</option>
          </select>
        </div>
        { selectedType === MOTORCYCLE && 
          <div>
            <label htmlFor="seatStatus">Seat Status</label>
            <select id="seatStatus" name="seatStatus" onChange={handleChange} value={formState.seatStatus}>
              <option value='Works'>Works</option>
              <option value='Fixable'>Fixable</option>
              <option value='Junk'>Junk</option>
            </select>
          </div>
        }
        <button ref={btnRef} type="submit">Submit</button>
        
      </form>
    </main>
  )
}

export default VehicleForm;