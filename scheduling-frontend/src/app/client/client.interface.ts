/* src/app/client/client.interface.ts*/

export interface Client {
    id: number;
    first_name: string;
    middle_name: string | null;
    last_name: string;
    birthday: Date;
    gender: string;
    street: string;
    unitApptnumber: string | null; 
    city: string;
    state: string;
    postalCode: string;
    country: any;
    email: string;
    mobile: string;
    role: string;
    companySchool: string | null;
    client_username: string;
    password: string;
    createdAt: string;
    updatedAt: string
  }
  
