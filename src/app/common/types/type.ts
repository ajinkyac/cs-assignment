export interface Process {
    name: string;
    device: string;
    path: string;
    status: string;
}

export enum Status {
    scheduled = 'Scheduled',
    available = 'Available'
}
