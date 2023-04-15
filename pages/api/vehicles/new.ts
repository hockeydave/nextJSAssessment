import { NextApiRequest, NextApiResponse } from "next";
import { create, update } from "../../../lib/vehicle";
/***
 * Notes: I would normally validate the incoming data and make sure
 * it fits the expected model. For example I would make sure that all
 * required fields are present and no extraneous fields are saved. This
 * would be especially important if the persistent storage is document
 * based since there is no schema. So I would ensure that no motorcycle is
 * saved with door data as an example of checks.  TODO
 */

export default async function handler(req: NextApiRequest, res: NextApiResponse<{}>) {
  if (req.method === 'POST') {
    const { body } = req;
    const vehicleData = JSON.parse(body);
    const newVehicle = vehicleData.id
      ? await update(vehicleData)
      : await create(vehicleData);

    res.json(newVehicle);
  }
}
