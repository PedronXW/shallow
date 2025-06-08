export interface DataConsult {
    id:         string;
    createdAt:  Date;
    status:     string;
    type:       string;
    consumerId: string;
    input:      object;
    output:     object;
}


export abstract class DataRepository {
    abstract createDataRequest(type: string, input: object): Promise<DataConsult>;
    abstract dispatchDataRequest(id: string): Promise<void>;
}