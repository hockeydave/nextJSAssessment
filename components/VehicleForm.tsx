import {useRouter} from "next/router";
import {useRef, useState} from "react";
import {VEHICLE_TYPE} from "../lib/vehicle";



const VehicleForm = ({ defaults }: { defaults: any }) => {
  const [selectedType, setSelectedType] = useState<VEHICLE_TYPE>(VEHICLE_TYPE.COUPE);
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
      vehicleType: e.currentTarget.value
    });
    // Here is where I could change the value of "wheels" to default to
    // 2 if Motorcycle is selected, but that has the potential to overwrite
    // data the user may have entered. The best solution is to track if the field is dirty
    // and change to the default if the field isn't dirty. This is trivial with a
    // form library like react-hook-form https://react-hook-form.com/
    // if(e.currentTarget.value === VEHICLE_TYPE.MOTORCYCLE) {
    //   formState.wheels = 2;
    // }
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

    await router.push('/');
  }

  return (
    <main>
      <form method="POST" onSubmit={handleSubmit}>
        <input type="hidden" value={defaults.id} name="id" />
        <label>Vehicle Type</label>
        <select id="vehicleType" name="vehicleType" onChange={handleTypeChange} value={formState.vehicleType}>
          <option value={VEHICLE_TYPE.COUPE}>{VEHICLE_TYPE.COUPE}</option>
          <option value={VEHICLE_TYPE.SEDAN}>{VEHICLE_TYPE.SEDAN}</option>
          <option value={VEHICLE_TYPE.MINI_VAN}>{VEHICLE_TYPE.MINI_VAN}</option>
          <option value={VEHICLE_TYPE.MOTORCYCLE}>{VEHICLE_TYPE.MOTORCYCLE}</option>
        </select>
        <div>
          <label htmlFor="nickname">Nickname</label>
          <input name="nickname" type="text" id="nickname" onChange={handleChange} value={formState.nickname} />
        </div>
        <div>
          <label htmlFor="mileage">Mileage</label>
          <input name="mileage" type="number" id="mileage" onChange={handleChange} value={formState.mileage} />
        </div>
        { formState.vehicleType !== VEHICLE_TYPE.MOTORCYCLE &&
        <div>
          <label htmlFor="wheels">Wheels</label>
          <input name="wheels" type="number" id="wheels" onChange={handleChange} value={formState.wheels} />
        </div>
        }
        { formState.vehicleType === VEHICLE_TYPE.MOTORCYCLE &&
            <div>
              <label htmlFor="wheels">Wheels</label>
              <input name="wheels" type="number" id="wheels" onChange={handleChange} value={2} />
            </div>
        }
        { formState.vehicleType !== VEHICLE_TYPE.MOTORCYCLE &&
          <div>
            <label htmlFor="doors">Doors</label>
            <input name="doors" type="number" id="doors" onChange={handleChange} value={formState.doors} />
          </div>
        }
        { formState.vehicleType === VEHICLE_TYPE.MINI_VAN  &&
          <div>
            sliding doors go here
          </div>
        }
        <div>
          <label htmlFor="engineStatus">Engine Status</label>
          <select id="engineStatus" name="engineStatus" onChange={handleChange} value={formState.engineStatus}>
            <option value='Works'>Works</option>
            <option value='Fixable'>Fixable</option>
            <option value='Junk'>Junk</option>
          </select>
        </div>
        { formState.vehicleType === VEHICLE_TYPE.MOTORCYCLE &&
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
