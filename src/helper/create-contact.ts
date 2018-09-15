export class CreateContact {

    name: string;
    job: string;
}


export interface NewContact {

    id: number;
    name: string;
    job: string;
    createdAt: Date;
}

