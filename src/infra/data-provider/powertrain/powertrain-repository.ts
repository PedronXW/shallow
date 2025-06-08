import { DataConsult, DataRepository } from "@/consult/repositories/data-repository";

export class PowertrainRepository implements DataRepository{
    
  async createDataRequest(type: string, input: object): Promise<DataConsult> {
    const request = await fetch(process.env.POWERTRAIN_API_URL + '/v1/requests/'+type, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-token': process.env.POWERTRAIN_API_KEY || ''
        },
        body: JSON.stringify({...input, notificationUrl: process.env.POWERTRAIN_NOTIFICATION_URL})
    })

    if (!request.ok) {
      throw new Error(`Failed to create data request: ${request.statusText}`);
    }

    const result = await request.json();

    return result as DataConsult
  }

  async dispatchDataRequest(id: string): Promise<void> {
    const response = await fetch(process.env.POWERTRAIN_API_URL + '/v1/requests/' + id + '/dispatch', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'api-token': process.env.POWERTRAIN_API_KEY || ''
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to dispatch data request: ${response.statusText}`);
    }
  }
}