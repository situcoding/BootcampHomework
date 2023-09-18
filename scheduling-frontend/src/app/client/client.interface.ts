/* src/app/client/client.interface.ts*/

export interface Client {
    id: number;
    first_name: string;
    middle_name: string | null;
    last_name: string;
    birthday: Date | null;
    gender: string;
    street: string;
    unitApptnumber: string; /* New field*/
    city: string;
    state: string;
    postalCode: string;
    country: any;
    email: string;
    mobile: string | null;
    role: string;
    companySchool: string | null;
    client_username: string;
    password: string;
  }
  